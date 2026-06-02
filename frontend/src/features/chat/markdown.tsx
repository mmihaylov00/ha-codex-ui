import React from "react";

function safeMarkdownUrl(value: unknown): string {
  const url = String(value ?? "").trim();
  if (!url) return "";
  if (/^(https?:|mailto:)/i.test(url)) return url;
  if (url.startsWith("/") || url.startsWith("#")) return url;
  return "";
}

function renderInline(value: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern = /(`([^`]+)`|\[([^\]\n]+)\]\(([^)\s]+)\)|(\*\*|__)(.+?)\5|(\*|_)([^*_]+?)\7)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(value)) !== null) {
    if (match.index > lastIndex) nodes.push(value.slice(lastIndex, match.index));
    if (match[2] !== undefined) nodes.push(<code key={nodes.length}>{match[2]}</code>);
    else if (match[3] !== undefined) {
      const url = safeMarkdownUrl(match[4]);
      nodes.push(url ? <a key={nodes.length} href={url} target="_blank" rel="noreferrer">{match[3]}</a> : `${match[3]} (${match[4]})`);
    } else if (match[6] !== undefined) nodes.push(<strong key={nodes.length}>{match[6]}</strong>);
    else if (match[8] !== undefined) nodes.push(<em key={nodes.length}>{match[8]}</em>);
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < value.length) nodes.push(value.slice(lastIndex));
  return nodes;
}

function MarkdownText({ value }: { value: string }) {
  const lines = value.split("\n");
  const blocks: React.ReactNode[] = [];
  let paragraph: string[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;
  let quote: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(<p key={blocks.length}>{paragraph.map((line, index) => <React.Fragment key={index}>{index > 0 ? <br /> : null}{renderInline(line)}</React.Fragment>)}</p>);
    paragraph = [];
  };
  const flushList = () => {
    if (!list) return;
    const items = list.items.map((item, index) => <li key={index}>{renderInline(item)}</li>);
    blocks.push(list.type === "ul" ? <ul key={blocks.length}>{items}</ul> : <ol key={blocks.length}>{items}</ol>);
    list = null;
  };
  const flushQuote = () => {
    if (!quote.length) return;
    blocks.push(<blockquote key={blocks.length}>{quote.map((line, index) => <React.Fragment key={index}>{index > 0 ? <br /> : null}{renderInline(line)}</React.Fragment>)}</blockquote>);
    quote = [];
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushAll();
      return;
    }
    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushAll();
      const tag = `h${heading[1].length}`;
      blocks.push(React.createElement(tag, { key: blocks.length }, renderInline(heading[2])));
      return;
    }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      flushAll();
      blocks.push(<hr key={blocks.length} />);
      return;
    }
    const quoteMatch = trimmed.match(/^>\s?(.*)$/);
    if (quoteMatch) {
      flushParagraph();
      flushList();
      quote.push(quoteMatch[1]);
      return;
    }
    const unordered = trimmed.match(/^[-*+]\s+(.+)$/);
    const ordered = trimmed.match(/^\d+[.)]\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      flushQuote();
      const type = unordered ? "ul" : "ol";
      if (!list || list.type !== type) flushList();
      if (!list) list = { type, items: [] };
      list.items.push((unordered || ordered)?.[1] || "");
      return;
    }
    flushList();
    flushQuote();
    paragraph.push(line);
  });
  flushAll();
  return <>{blocks}</>;
}

export const Markdown = React.memo(function Markdown({ value }: { value: string }) {
  const source = String(value ?? "").replaceAll("\r\n", "\n").replaceAll("\r", "\n");
  if (!source.trim()) return null;
  const blocks: React.ReactNode[] = [];
  const fencePattern = /```([^\n`]*)\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = fencePattern.exec(source)) !== null) {
    if (match.index > lastIndex) {
      blocks.push(<MarkdownText key={blocks.length} value={source.slice(lastIndex, match.index)} />);
    }
    const language = match[1]?.trim();
    blocks.push(<pre key={blocks.length}><code className={language ? `language-${language}` : undefined}>{match[2] || ""}</code></pre>);
    lastIndex = fencePattern.lastIndex;
  }
  if (lastIndex < source.length) blocks.push(<MarkdownText key={blocks.length} value={source.slice(lastIndex)} />);
  return <>{blocks}</>;
});
