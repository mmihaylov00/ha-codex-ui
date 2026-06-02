import { useCallback, useEffect, useMemo, useRef, useState, type TouchEvent, type WheelEvent } from "react";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";
import { Icon } from "./Icon";
import { Message } from "./Message";
import { ContextChips, ContextPicker } from "./ContextPicker";
import { AutomationBuilder } from "./AutomationBuilder";
import { useChatStore } from "../stores/chatStore";
import { useUiStore } from "../stores/uiStore";
import type { CodexSession, HaCodexSettings, HomeAssistant, RunSettings } from "../types/ha";
import type { HaCodexApi } from "../services/api";
import type { ContextSendPayload, HaContextItem } from "../features/context/contextUtils";
import { currentQuestionFromMessages, isSessionBusy, messageKey, pendingApprovals, visibleMessages } from "../features/chat/chatUtils";
import { isGitSetupReady, reviewableGitFileCount } from "../features/git/gitUtils";
import { isRunPlanGenerating, pendingRunPlan } from "../features/runPlan/runPlanUtils";
import { contextBudgetState, runSettingsForSession } from "../features/settings/runtimeSettingsUtils";

const EMPTY_MESSAGES = Object.freeze([]);
const EMPTY_QUEUES = Object.freeze([]);
const EMPTY_CONTEXT: HaContextItem[] = [];
type BottomScrollBehavior = "auto" | "smooth";

interface ChatPanelProps {
  api: HaCodexApi;
  hass: HomeAssistant | null;
  onNew: () => void;
  onGitToggle: () => void;
  onRenameStart: (id: string) => void;
  onRenameSave: (id: string) => void;
  onArchive: (id: string, archived: boolean) => void;
  onCancel: (id: string) => void;
  onRetry: (id: string) => void;
  onSend: (id: string, prompt: string | ContextSendPayload) => void;
  onAnswer: (id: string, answer: string) => void;
  onApprove: (id: string, approvalId: string, approved: boolean) => void;
  onRunPlan: (id: string, planId: string, action: "approve" | "cancel" | "revise") => void;
  onRollback: (id: string, checkpointId: string) => void;
  onCopy: (value: string) => void;
  onQueueEdit: (id: string, queueId: string) => void;
  onQueueSteer: (id: string, queueId: string) => void;
  onQueueClear: (id: string, queueId: string) => void;
  onValidationReload: (domains: string[]) => void;
  onRunSettingsChange: (id: string, runSettings: Partial<RunSettings>) => void;
}

export function ChatPanel(props: ChatPanelProps) {
  const activeId = useChatStore((state) => state.activeId);
  if (!activeId) return <EmptyChat onNew={props.onNew} onGitToggle={props.onGitToggle} />;
  return <ActiveChat activeId={activeId} {...props} />;
}

function ActiveChat({ activeId, ...props }: ChatPanelProps & { activeId: string }) {
  const session = useChatStore((state) => state.chatsById[activeId]);
  const messages = useChatStore((state) => state.messagesByChatId[activeId] || EMPTY_MESSAGES);
  const draft = useChatStore((state) => state.drafts[activeId] || "");
  const setDraft = useChatStore((state) => state.setDraft);
  const clearDraft = useChatStore((state) => state.clearDraft);
  const contextItems = useChatStore((state) => state.contextByChatId[activeId] || EMPTY_CONTEXT);
  const addContextItem = useChatStore((state) => state.addContextItem);
  const removeContextItem = useChatStore((state) => state.removeContextItem);
  const clearContext = useChatStore((state) => state.clearContext);
  const questionDraft = useChatStore((state) => state.questionDrafts[activeId] || "");
  const setQuestionDraft = useChatStore((state) => state.setQuestionDraft);
  const queues = useChatStore((state) => state.queuesByChatId[activeId] || EMPTY_QUEUES);
  const settings = useUiStore((state) => state.settings);
  const renamingId = useUiStore((state) => state.renamingId);
  const renameTitle = useUiStore((state) => state.renameTitle);
  const setRenaming = useUiStore((state) => state.setRenaming);
  const virtuoso = useRef<VirtuosoHandle>(null);
  const scroller = useRef<HTMLElement | Window | null>(null);
  const stickToBottom = useRef(true);
  const lastScrollState = useRef({ activeId, messageCount: 0, thinkingVisible: false });
  const lastTouchY = useRef<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [contextPickerOpen, setContextPickerOpen] = useState(false);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [atBottom, setAtBottom] = useState(true);
  const [openScrollChatId, setOpenScrollChatId] = useState<string | null>(activeId);
  const [sendScrollRequest, setSendScrollRequest] = useState(0);
  const renderedMessages = useMemo(() => visibleMessages(messages), [messages]);
  const question = useMemo(() => (session ? currentQuestionFromMessages(session, messages) : null), [session, messages]);
  const archived = Boolean(session?.archived);
  const running = isSessionBusy(session);
  const runPlan = pendingRunPlan(session);
  const runSettings = useMemo(() => runSettingsForSession(session, settings), [session, settings]);
  const budget = useMemo(() => contextBudgetState(contextItems, settings.context_budget_chars), [contextItems, settings.context_budget_chars]);
  const planGenerating = isRunPlanGenerating(session);
  const canRetryMessages = session?.status === "error" && !archived;
  const thinkingVisible = running && !question;
  const virtuosoComponents = useMemo(() => ({ Footer: () => thinkingVisible ? <ThinkingMessage /> : null }), [thinkingVisible]);
  const requestSendScroll = useCallback(() => {
    stickToBottom.current = true;
    setAtBottom(true);
    setSendScrollRequest((current) => current + 1);
  }, []);
  const handleAtBottomStateChange = useCallback((isAtBottom: boolean) => {
    if (isAtBottom) stickToBottom.current = true;
    setAtBottom(isAtBottom);
  }, []);
  const handleTranscriptWheel = useCallback((event: WheelEvent<HTMLDivElement>) => {
    if (event.deltaY < 0) stickToBottom.current = false;
  }, []);
  const handleTranscriptTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    lastTouchY.current = event.touches[0]?.clientY ?? null;
  }, []);
  const handleTranscriptTouchMove = useCallback((event: TouchEvent<HTMLDivElement>) => {
    const currentY = event.touches[0]?.clientY ?? null;
    if (lastTouchY.current !== null && currentY !== null && currentY > lastTouchY.current) {
      stickToBottom.current = false;
    }
    lastTouchY.current = currentY;
  }, []);
  const handleTranscriptTouchEnd = useCallback(() => {
    lastTouchY.current = null;
  }, []);
  const setScrollerRef = useCallback((ref: HTMLElement | Window | null) => {
    scroller.current = ref;
  }, []);
  const scrollViewportToBottom = useCallback((behavior: BottomScrollBehavior) => {
    if (renderedMessages.length) {
      virtuoso.current?.scrollToIndex({ index: renderedMessages.length - 1, align: "end", behavior });
    }
    virtuoso.current?.scrollTo({ top: Number.MAX_SAFE_INTEGER, behavior });
    const node = scroller.current;
    if (!node) return;
    if (node instanceof HTMLElement) {
      node.scrollTo({ top: node.scrollHeight, behavior });
    } else {
      node.scrollTo({ top: node.document.documentElement.scrollHeight, behavior });
    }
  }, [renderedMessages.length]);
  const scrollToBottom = useCallback(() => {
    if (!renderedMessages.length) return;
    stickToBottom.current = true;
    setAtBottom(true);
    scrollViewportToBottom("smooth");
  }, [renderedMessages.length, scrollViewportToBottom]);

  useEffect(() => {
    stickToBottom.current = true;
    setAtBottom(true);
    setOpenScrollChatId(activeId);
  }, [activeId]);

  useEffect(() => {
    const shouldScrollToBottom = stickToBottom.current || openScrollChatId === activeId;
    const previous = lastScrollState.current;
    const chatChanged = previous.activeId !== activeId;
    const messageAdded = !chatChanged && renderedMessages.length > previous.messageCount;
    const thinkingAdded = !chatChanged && thinkingVisible && !previous.thinkingVisible;
    lastScrollState.current = { activeId, messageCount: renderedMessages.length, thinkingVisible };
    if ((!shouldScrollToBottom && !sendScrollRequest) || (!renderedMessages.length && !thinkingVisible)) return;
    const behavior: BottomScrollBehavior = openScrollChatId === activeId && !sendScrollRequest
      ? "auto"
      : sendScrollRequest || messageAdded || thinkingAdded
        ? "smooth"
        : "auto";
    let settledFrame = 0;
    let settledTimer = 0;
    const frame = requestAnimationFrame(() => {
      scrollViewportToBottom(behavior);
      settledFrame = requestAnimationFrame(() => scrollViewportToBottom(behavior));
      settledTimer = window.setTimeout(() => scrollViewportToBottom(behavior), 120);
      if (openScrollChatId === activeId) setOpenScrollChatId(null);
      if (sendScrollRequest) setSendScrollRequest(0);
    });
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(settledFrame);
      window.clearTimeout(settledTimer);
    };
  }, [activeId, openScrollChatId, renderedMessages, scrollViewportToBottom, sendScrollRequest, thinkingVisible]);

  useEffect(() => {
    const shouldScrollToBottom = stickToBottom.current || openScrollChatId === activeId;
    if (!thinkingVisible || !shouldScrollToBottom) return;
    let settledFrame = 0;
    const frame = requestAnimationFrame(() => {
      scrollViewportToBottom("smooth");
      settledFrame = requestAnimationFrame(() => {
        scrollViewportToBottom("smooth");
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(settledFrame);
    };
  }, [activeId, openScrollChatId, scrollViewportToBottom, thinkingVisible]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "52px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  }, [draft]);

  useEffect(() => {
    if (!session || archived || question) return;
    const frame = requestAnimationFrame(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      textarea.focus({ preventScroll: true });
      const position = textarea.value.length;
      textarea.setSelectionRange(position, position);
    });
    return () => cancelAnimationFrame(frame);
  }, [session?.id, archived, question]);

  if (!session) return <EmptyChat onNew={props.onNew} onGitToggle={props.onGitToggle} />;
  const renaming = renamingId === session.id;

  return (
    <>
      <header className="chat-header">
        <div className="title-area">
          <div className="title-row">
            {renaming ? (
              <input className="title-input" name="session-title" value={renameTitle} aria-label="Chat title" onChange={(event) => setRenaming(session.id, event.target.value)} onKeyDown={(event) => {
                if (event.key === "Enter") props.onRenameSave(session.id);
                if (event.key === "Escape") setRenaming(null);
              }} autoFocus />
            ) : <h1>{session.title}</h1>}
            <button className="icon-button" onClick={() => renaming ? props.onRenameSave(session.id) : props.onRenameStart(session.id)} title={renaming ? "Save title" : "Rename chat"} aria-label={renaming ? "Save title" : "Rename chat"}>
              <Icon icon={renaming ? "mdi:content-save" : "mdi:pencil"} />
            </button>
          </div>
        </div>
        <div className="header-actions">
          {archived ? <button onClick={() => props.onArchive(session.id, false)}>Restore</button> : null}
          {running ? <button className="icon-button stop-button danger" onClick={() => props.onCancel(session.id)} title="Stop" aria-label="Stop chat"><Icon icon="mdi:stop" /></button> : null}
          <GitToggleButton onClick={props.onGitToggle} />
        </div>
      </header>
      <div
        className="transcript"
        onWheelCapture={handleTranscriptWheel}
        onTouchStartCapture={handleTranscriptTouchStart}
        onTouchMoveCapture={handleTranscriptTouchMove}
        onTouchEndCapture={handleTranscriptTouchEnd}
        onTouchCancelCapture={handleTranscriptTouchEnd}
      >
        <Virtuoso
          ref={virtuoso}
          style={{ height: "100%" }}
          data={renderedMessages}
          scrollerRef={setScrollerRef}
          followOutput={(isAtBottom) => isAtBottom || stickToBottom.current ? "smooth" : false}
          atBottomStateChange={handleAtBottomStateChange}
          itemContent={(index, message) => <Message api={props.api} message={message} sessionId={session.id} canRetry={canRetryMessages} onCopy={props.onCopy} onRetry={props.onRetry} onRollback={props.onRollback} onValidationReload={props.onValidationReload} key={messageKey(message, index)} />}
          components={virtuosoComponents}
        />
        {!atBottom && renderedMessages.length ? (
          <button className="scroll-to-bottom" type="button" onClick={scrollToBottom} title="Scroll to bottom" aria-label="Scroll to bottom">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path fill="none" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
            </svg>
          </button>
        ) : null}
      </div>
      {archived ? <div className="archived-note">Archived chat</div> : question ? (
        <QuestionComposer
          session={session}
          question={question}
          value={questionDraft}
          onChange={(value) => setQuestionDraft(session.id, value)}
          onAnswer={(id, answer) => {
            requestSendScroll();
            props.onAnswer(id, answer);
          }}
        />
      ) : (
        <>
          <form className="composer" onSubmit={(event) => {
            event.preventDefault();
            if (runPlan || planGenerating) return;
            const prompt = draft.trim();
            if (!prompt) return;
            clearDraft(session.id);
            requestSendScroll();
            props.onSend(session.id, prompt);
          }}>
            <RunPlanReview session={session} onRunPlan={props.onRunPlan} />
            <Approvals session={session} onApprove={props.onApprove} />
            {!runPlan && !planGenerating ? (
              <>
                <RunControls
                  settings={settings}
                  runSettings={runSettings}
                  onChange={(patch) => props.onRunSettingsChange(session.id, { ...runSettings, ...patch })}
                />
                <PlanModeToggle
                  value={runSettings.plan_mode}
                  onChange={(value) => props.onRunSettingsChange(session.id, { ...runSettings, plan_mode: value })}
                />
                <MessageQueue sessionId={session.id} queues={queues} onEdit={props.onQueueEdit} onSteer={props.onQueueSteer} onClear={props.onQueueClear} />
                <div className="context-chip-row">
                  <ContextChips items={contextItems} onRemove={(key) => removeContextItem(session.id, key)} onClear={() => clearContext(session.id)} />
                  {contextItems.length ? <span className={`context-budget ${budget.level}`}>{budget.label}</span> : null}
                </div>
                <div className="composer-input-row">
                  <textarea ref={textareaRef} name="prompt" placeholder="Ask Codex to change Home Assistant..." rows={1} value={draft} onChange={(event) => setDraft(session.id, event.target.value)} onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey && !event.nativeEvent.isComposing) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }} />
                  <button className="context-button" type="button" onClick={() => setContextPickerOpen(true)} title="Add context" aria-label="Add context">
                    <Icon icon="mdi:paperclip" />
                    {contextItems.length ? <b>{contextItems.length}</b> : null}
                  </button>
                  <button className="builder-button" type="button" onClick={() => setBuilderOpen(true)} title="Automation builder" aria-label="Automation builder">
                    <Icon icon="mdi:robot-industrial-outline" />
                  </button>
                  <button className="send-button" type="submit" title="Send" aria-label="Send"><Icon icon="mdi:send" /></button>
                </div>
              </>
            ) : null}
          </form>
          <AutomationBuilder
            open={builderOpen}
            hass={props.hass}
            contextItems={contextItems}
            onClose={() => setBuilderOpen(false)}
            onSubmit={(request) => {
              setBuilderOpen(false);
              requestSendScroll();
              props.onSend(session.id, request);
            }}
          />
          <ContextPicker
            api={props.api}
            hass={props.hass}
            open={contextPickerOpen}
            selected={contextItems}
            onAdd={(item) => addContextItem(session.id, item)}
            onRemove={(key) => removeContextItem(session.id, key)}
            onClear={() => clearContext(session.id)}
            onClose={() => setContextPickerOpen(false)}
          />
        </>
      )}
    </>
  );
}

function GitToggleButton({ onClick }: { onClick: () => void }) {
  const gitOpen = useUiStore((state) => state.gitPanelOpen);
  const gitReady = useUiStore((state) => isGitSetupReady(state.gitSetupStatus));
  const count = useUiStore((state) => state.gitChanges?.files ? reviewableGitFileCount(state.gitChanges.files) : state.gitChangedCount);
  if (gitOpen || !gitReady) return null;
  return <button className="git-toggle" onClick={onClick} title="Open Git panel" aria-label="Open Git panel"><Icon icon="mdi:source-branch" /><span>Git</span>{count ? <b>{count}</b> : null}</button>;
}

function RunControls({
  settings,
  runSettings,
  onChange,
}: {
  settings: HaCodexSettings;
  runSettings: RunSettings;
  onChange: (patch: Partial<RunSettings>) => void;
}) {
  const manual = runSettings.mode === "manual";
  return (
    <div className={`run-controls ${manual ? "manual" : "auto"}`}>
      <RunDropdown
        ariaLabel="Model preset"
        value={runSettings.model_preset_id}
        options={settings.model_presets.map((preset) => [preset.id, preset.label])}
        onChange={(value) => onChange({ model_preset_id: value })}
      />
      <button type="button" className={manual ? "" : "active"} onClick={() => onChange({ mode: manual ? "auto" : "manual" })}>
        <Icon icon={manual ? "mdi:tune" : "mdi:auto-mode"} />
        <span>{manual ? "Manual" : "Auto"}</span>
      </button>
      {manual ? (
        <div className="run-controls-extra">
          <RunSelect label="Reasoning" value={runSettings.reasoning_effort} options={["auto", "minimal", "low", "medium", "high", "xhigh"]} onChange={(value) => onChange({ reasoning_effort: value as RunSettings["reasoning_effort"] })} />
          <RunSelect label="Verbosity" value={runSettings.verbosity} options={["auto", "low", "medium", "high"]} onChange={(value) => onChange({ verbosity: value as RunSettings["verbosity"] })} />
          <RunSelect label="Validation" value={runSettings.validation_depth} options={["auto", "none", "full"]} onChange={(value) => onChange({ validation_depth: value as RunSettings["validation_depth"] })} />
          <RunSelect label="Tools" value={runSettings.tool_visibility} options={["compact", "normal", "verbose"]} onChange={(value) => onChange({ tool_visibility: value as RunSettings["tool_visibility"] })} />
          <RunSelect label="Approvals" value={runSettings.approval_mode} options={["ask", "auto_readonly"]} onChange={(value) => onChange({ approval_mode: value as RunSettings["approval_mode"] })} />
        </div>
      ) : null}
    </div>
  );
}

function PlanModeToggle({ value, onChange }: { value: RunSettings["plan_mode"]; onChange: (value: RunSettings["plan_mode"]) => void }) {
  const options: Array<{ value: RunSettings["plan_mode"]; label: string; icon: string; title: string }> = [
    { value: "auto", label: "Auto", icon: "mdi:auto-mode", title: "Plan automatically when Codex expects to edit files" },
    { value: "always", label: "On", icon: "mdi:clipboard-check-outline", title: "Always request a plan before running" },
    { value: "off", label: "Off", icon: "mdi:clipboard-off-outline", title: "Run without requesting a plan first" },
  ];
  return (
    <div className="plan-mode-toggle" aria-label="Plan mode">
      <span>Plan</span>
      <div className="plan-mode-options" role="group" aria-label="Plan mode">
        {options.map((option) => (
          <button
            type="button"
            className={value === option.value ? "active" : ""}
            title={option.title}
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            key={option.value}
          >
            <Icon icon={option.icon} />
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function RunDropdown({ ariaLabel, value, options, onChange }: { ariaLabel: string; value: string; options: Array<[string, string]>; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find(([option]) => option === value)?.[1] || value;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const node = ref.current;
      if (!node) return;
      const path = event.composedPath();
      if (!path.includes(node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div className="run-select" ref={ref}>
      <button type="button" className="run-select-button" aria-label={ariaLabel} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((current) => !current)}>
        <span>{selected}</span>
        <Icon icon="mdi:chevron-up" />
      </button>
      {open ? (
        <div className="run-select-menu" role="listbox" aria-label={ariaLabel}>
          {options.map(([optionValue, label]) => (
            <button type="button" role="option" aria-selected={optionValue === value} className={optionValue === value ? "selected" : ""} onClick={() => {
              onChange(optionValue);
              setOpen(false);
            }} key={optionValue}>
              {label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function RunSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label>
      <span>{label}</span>
      <RunDropdown ariaLabel={label} value={value} options={options.map((option) => [option, option.replace("_", " ")])} onChange={onChange} />
    </label>
  );
}

function RunPlanReview({ session, onRunPlan }: { session: CodexSession; onRunPlan: (id: string, planId: string, action: "approve" | "cancel" | "revise") => void }) {
  const plan = pendingRunPlan(session);
  const generating = isRunPlanGenerating(session);
  if (!plan && !generating) return null;
  const planId = plan?.id || String((session.metadata?.pending_plan as { id?: string } | undefined)?.id || "");
  return (
    <section className="run-plan-review" aria-label="Run plan review">
      <label>{generating ? "Preparing run plan" : "Review run plan"}</label>
      <div className="run-plan-copy">{generating ? "Codex is preparing a plan before edits begin." : "Approve the plan to create a rollback checkpoint and start execution."}</div>
      {!generating && planId ? (
        <div className="row">
          <button type="button" onClick={() => onRunPlan(session.id, planId, "approve")}><Icon icon="mdi:check" /><span>Approve</span></button>
          <button type="button" onClick={() => onRunPlan(session.id, planId, "revise")}><Icon icon="mdi:pencil" /><span>Revise</span></button>
          <button type="button" className="danger" onClick={() => onRunPlan(session.id, planId, "cancel")}><Icon icon="mdi:close" /><span>Cancel</span></button>
        </div>
      ) : null}
    </section>
  );
}

function Approvals({ session, onApprove }: { session: CodexSession; onApprove: (id: string, approvalId: string, approved: boolean) => void }) {
  const approvals = pendingApprovals(session);
  if (!approvals.length) return null;
  return (
    <div className="approvals" aria-label="Pending approvals">
      {approvals.map((approval) => (
        <section className="approval" key={approval.id}>
          <label>Approval needed</label>
          <pre>{approval.command}</pre>
          {approval.reason ? <p className="approval-reason">{approval.reason.replace(/^restart_required:\s*/, "")}</p> : null}
          {approval.cwd ? <p className="muted">{approval.cwd}</p> : null}
          <div className="row">
            <button type="button" onClick={() => onApprove(session.id, approval.id, true)}>Approve</button>
            <button type="button" className="danger" onClick={() => onApprove(session.id, approval.id, false)}>Reject</button>
          </div>
        </section>
      ))}
    </div>
  );
}

function MessageQueue({ sessionId, queues, onEdit, onSteer, onClear }: { sessionId: string; queues: Array<{ id: string; content: string }>; onEdit: (id: string, queueId: string) => void; onSteer: (id: string, queueId: string) => void; onClear: (id: string, queueId: string) => void }) {
  if (!queues.length) return null;
  return (
    <div className="message-queue" aria-label="Queued messages">
      {queues.map((item) => (
        <div className="queued-message" key={item.id}>
          <span>{item.content}</span>
          <div className="queued-actions">
            <button className="icon-button queue-edit" type="button" onClick={() => onEdit(sessionId, item.id)} data-tooltip="Edit" aria-label="Edit queued message"><Icon icon="mdi:pencil" /></button>
            <button className="icon-button queue-steer" type="button" onClick={() => onSteer(sessionId, item.id)} data-tooltip="Steer" aria-label="Steer current conversation"><Icon icon="mdi:send" /></button>
            <button className="icon-button queue-clear" type="button" onClick={() => onClear(sessionId, item.id)} data-tooltip="Clear" aria-label="Clear queued message"><Icon icon="mdi:close" /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

function QuestionComposer({ session, question, value, onChange, onAnswer }: { session: CodexSession; question: NonNullable<ReturnType<typeof currentQuestionFromMessages>>; value: string; onChange: (value: string) => void; onAnswer: (id: string, answer: string) => void }) {
  const customInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const input = customInputRef.current;
      if (!input) return;
      input.focus({ preventScroll: true });
      const position = input.value.length;
      input.setSelectionRange(position, position);
    });
    return () => cancelAnimationFrame(frame);
  }, [session.id, question]);
  return (
    <form className="composer question-composer" onSubmit={(event) => {
      event.preventDefault();
      onAnswer(session.id, value);
    }}>
      <label>Codex needs direction</label>
      <div className="question-text">{question.question}</div>
      <div className="question-choices">
        {question.choices.map((choice) => (
          <button className="question-choice" type="button" onClick={() => onAnswer(session.id, choice.label)} key={choice.label}>
            <span className="question-info-wrap">
              <Icon className="question-info" icon="mdi:information-outline" />
              <span className="question-choice-tooltip" role="tooltip">{choice.description || "Use this answer."}</span>
            </span>
            <span>{choice.label}</span>
          </button>
        ))}
      </div>
      <div className="question-custom-row">
        <input ref={customInputRef} name="question-custom" value={value} placeholder={question.customPlaceholder} aria-label="Custom answer" onChange={(event) => onChange(event.target.value)} />
        <button className="send-button question-send" type="submit" title="Send custom answer" aria-label="Send custom answer"><Icon icon="mdi:send" /></button>
      </div>
    </form>
  );
}

function ThinkingMessage() {
  return (
    <div className="message-row message-row-codex">
      <article className="message assistant message-style-codex message-style-thinking" aria-live="polite" aria-label="Codex is thinking">
        <div className="role"><Icon icon="mdi:robot" /><span>assistant</span></div>
        <div className="thinking-content"><span>Thinking</span><span className="thinking-dots" aria-hidden="true"><i /><i /><i /></span></div>
      </article>
    </div>
  );
}

function EmptyChat({ onNew, onGitToggle }: { onNew: () => void; onGitToggle: () => void }) {
  return (
    <div className="empty">
      <h1>Start a Codex chat</h1>
      <p>Create a session to edit Home Assistant config from this console.</p>
      <div className="empty-actions">
        <button onClick={onNew}>New chat</button>
        <GitToggleButton onClick={onGitToggle} />
      </div>
    </div>
  );
}
