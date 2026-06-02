import assert from "node:assert/strict";
import test from "node:test";

import {
  canContainQuestion,
  currentQuestion,
  currentQuestionFromMessages,
  filterSessionIdsBySearch,
  cleanupArchivedSessionIds,
  currentRestartApprovals,
  extractQuestion,
  hasPendingQuestion,
  hasPendingRestart,
  isEmptySession,
  isRestartApproval,
  isSessionBusy,
  messageKey,
  pendingApprovals,
  sortedSessions,
  stripDuplicateFileChangesBlock,
  stripQuestionBlock,
  visibleMessages,
} from "../../frontend/src/features/chat/chatUtils.ts";

const changes = [
  { status: "modified", path: "custom_components/ha_codex/frontend/panel.js" },
  { status: "modified", path: "frontend/src/components/ChatPanel.tsx" },
];

test("duplicate generated file changes block is hidden when metadata renders the same files", () => {
  const content = [
    "File changes:",
    "- modified `custom_components/ha_codex/frontend/panel.js`",
    "- modified `frontend/src/components/ChatPanel.tsx`",
  ].join("\n");

  assert.equal(stripDuplicateFileChangesBlock(content, changes), "");
});

test("duplicate plain file changes block is hidden and surrounding content remains", () => {
  const content = [
    "Done.",
    "",
    "File changes:",
    "",
    "modified custom_components/ha_codex/frontend/panel.js",
    "modified frontend/src/components/ChatPanel.tsx",
    "",
    "Validation passed.",
  ].join("\n");

  assert.equal(stripDuplicateFileChangesBlock(content, changes), "Done.\n\nValidation passed.");
});

test("file changes block remains visible when it does not match metadata files", () => {
  const content = [
    "File changes:",
    "- modified `configuration.yaml`",
  ].join("\n");

  assert.equal(stripDuplicateFileChangesBlock(content, changes), content);
});

test("restart approvals are separated from normal pending approvals", () => {
  const restart = { id: 1, status: "pending", command: "ha core restart", reason: "restart_required: config changed" };
  const command = { id: 2, status: "pending", command: "cat configuration.yaml", reason: "inspect" };
  const session = { approvals: [restart, command, { ...command, id: 3, status: "approved" }] };

  assert.equal(isRestartApproval(restart), true);
  assert.equal(isRestartApproval(command), false);
  assert.deepEqual(pendingApprovals(session), [command]);
  assert.equal(hasPendingRestart(session), true);
  assert.deepEqual(currentRestartApprovals([{ id: "s1", approvals: [restart] }, { id: "s2", approvals: [command] }]), [
    { session: { id: "s1", approvals: [restart] }, approval: restart },
  ]);
});

test("question helpers parse valid assistant questions and reject malformed blocks", () => {
  const block = [
    "Choose an option.",
    "<ha_codex_question>",
    JSON.stringify({
      question: "How should this be handled?",
      choices: [
        { label: "Apply", description: "Apply the patch." },
        { label: "Revise", description: "Revise the patch." },
        { label: "Skip", description: "Skip this change." },
      ],
      custom_placeholder: "Describe another path...",
    }),
    "</ha_codex_question>",
  ].join("\n");

  const assistant = { role: "assistant", content: block };
  const event = { role: "event", metadata: { kind: "run_finished" }, content: block };
  assert.equal(canContainQuestion(assistant), true);
  assert.equal(canContainQuestion(event), true);
  assert.equal(canContainQuestion({ role: "user", content: block }), false);
  assert.deepEqual(extractQuestion(assistant), {
    question: "How should this be handled?",
    choices: [
      { label: "Apply", description: "Apply the patch." },
      { label: "Revise", description: "Revise the patch." },
      { label: "Skip", description: "Skip this change." },
    ],
    customPlaceholder: "Describe another path...",
  });
  assert.equal(extractQuestion({ role: "assistant", content: "<ha_codex_question>{}</ha_codex_question>" }), null);
  assert.equal(extractQuestion({ role: "assistant", content: "<ha_codex_question>not-json</ha_codex_question>" }), null);
  assert.equal(stripQuestionBlock(`Before\n${block}`), "Before\nChoose an option.");
});

test("current question scans backward until a user message or busy state", () => {
  const questionMessage = {
    role: "assistant",
    content: `<ha_codex_question>${JSON.stringify({
      question: "Proceed?",
      choices: [{ label: "Yes" }, { label: "No" }, { label: "Other" }],
    })}</ha_codex_question>`,
  };
  const messages = [
    { role: "user", content: "Start" },
    { role: "assistant", content: "Working" },
    questionMessage,
  ];

  assert.deepEqual(currentQuestionFromMessages({ status: "waiting_input" }, messages), {
    question: "Proceed?",
    choices: [
      { label: "Yes", description: "" },
      { label: "No", description: "" },
      { label: "Other", description: "" },
    ],
    customPlaceholder: "Type a custom answer...",
    messageIndex: 2,
  });
  assert.equal(currentQuestion({ status: "running", messages }), null);
  assert.equal(currentQuestion({ has_pending_question: true }), null);
  assert.equal(hasPendingQuestion({ has_pending_question: true }), true);
});

test("message visibility and keys remove restart noise and adjacent duplicates", () => {
  const messages = [
    { role: "event", metadata: { kind: "restart_required" }, content: "restart" },
    { role: "assistant", content: "same" },
    { role: "assistant", content: "same" },
    { id: 10, role: "assistant", content: "id wins" },
    { role: "event", metadata: { kind: "restart_deferred" }, content: "deferred" },
  ];

  assert.deepEqual(visibleMessages(messages).map((message) => message.content), ["same", "id wins"]);
  assert.equal(messageKey(messages[3], 3), "id:10");
  assert.equal(messageKey({ role: "assistant", created_at: 99, metadata: { kind: "run" } }, 4), "created:99:assistant:run");
  assert.match(messageKey({ role: "assistant", content: "hello" }, 5), /^content:5:/);
});

test("session helpers rank busy, empty, archived, and active chats", () => {
  const approval = { status: "pending", command: "cat configuration.yaml" };
  assert.equal(isSessionBusy(null), false);
  assert.equal(isSessionBusy({ status: "running" }), true);
  assert.equal(isSessionBusy({ status: "waiting_approval", approvals: [approval] }), true);
  assert.equal(isEmptySession({ messages: [], approvals: [], last_message_id: 0 }), true);
  assert.equal(isEmptySession({ last_message_id: 0, approvals: [], codex_session_id: "" }), true);
  assert.equal(isEmptySession({ messages: [{ role: "assistant", content: "Hi" }], approvals: [] }), false);

  const sessions = [
    { id: "old", title: "Old", status: "done", updated_at: 10, messages: [{ role: "user", created_at: 10, content: "old" }] },
    { id: "approval", title: "Approval", status: "waiting_approval", updated_at: 20, approvals: [approval] },
    { id: "empty", title: "Empty", status: "done", updated_at: 30, messages: [] },
    { id: "new", title: "New", status: "done", updated_at: 40, messages: [{ role: "user", created_at: 40, content: "new" }] },
  ];

  assert.deepEqual(sortedSessions(sessions).map((session) => session.id), ["approval", "new", "old", "empty"]);
  assert.deepEqual(sortedSessions(sessions, true).map((session) => session.id), ["new", "empty", "approval", "old"]);
});

test("session search filters ids by chat title without changing order", () => {
  const chatsById = {
    first: { id: "first", title: "Kitchen light tune-up" },
    second: { id: "second", title: "Garage door fix" },
    third: { id: "third", title: "Kitchen dashboard" },
  };
  const ids = ["first", "second", "third"];

  assert.deepEqual(filterSessionIdsBySearch(ids, chatsById, ""), ids);
  assert.deepEqual(filterSessionIdsBySearch(ids, chatsById, " kitchen "), ["first", "third"]);
  assert.deepEqual(filterSessionIdsBySearch(ids, chatsById, "garage"), ["second"]);
});

test("archive cleanup ids include only sessions that are still archived", () => {
  const chatsById = {
    archived: { id: "archived", title: "Archived", archived: true },
    restored: { id: "restored", title: "Restored", archived: false },
    missing: undefined,
  };

  assert.deepEqual(cleanupArchivedSessionIds(["archived", "restored", "missing"], chatsById), ["archived"]);
});
