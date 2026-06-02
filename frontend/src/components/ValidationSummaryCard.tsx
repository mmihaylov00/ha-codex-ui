import type { ValidationResult } from "../types/ha";
import { validationActionLabel, validationCommandText, validationReloadDomains, validationSummaryTone } from "../features/validation/validationUtils";
import { formatRunTime, formatTimestampTitle, stripAnsi } from "../utils/format";
import { Icon } from "./Icon";

interface ValidationSummaryCardProps {
  validation: ValidationResult | null;
  compact?: boolean;
  onReloadDomains?: (domains: string[]) => void;
}

export function ValidationSummaryCard({ validation, compact = false, onReloadDomains }: ValidationSummaryCardProps) {
  if (!validation) return null;
  const summary = validation.summary || {};
  const tone = validationSummaryTone(validation);
  const label = validationActionLabel(validation);
  const command = validationCommandText(validation);
  const domains = summary.affected_domains || [];
  const files = summary.changed_files || [];
  const reloadDomains = validationReloadDomains(validation);
  const output = stripAnsi([validation.stdout, validation.stderr].filter(Boolean).join("\n")).trim();
  const sessionText = [summary.session_title, summary.session_id && !summary.session_title ? summary.session_id : ""].filter(Boolean).join(" · ");
  return (
    <section className={`validation-card ${tone} ${compact ? "compact" : ""}`}>
      <header>
        <Icon icon={tone === "error" ? "mdi:alert-circle-outline" : tone === "restart" ? "mdi:restart-alert" : tone === "warning" ? "mdi:reload-alert" : "mdi:check-circle-outline"} />
        <div>
          <strong>{label}</strong>
          <span>
            {validation.status || "unknown"}
            {validation.returncode !== undefined && validation.returncode !== null ? ` · exit ${validation.returncode}` : ""}
            {validation.created_at ? ` · ${formatRunTime(validation.created_at)}` : ""}
          </span>
        </div>
      </header>
      <div className="validation-meta">
        {command ? <span title={command}><b>Command</b>{command}</span> : null}
        {sessionText ? <span title={sessionText}><b>Chat</b>{sessionText}</span> : null}
        {validation.created_at ? <span title={formatTimestampTitle(validation.created_at)}><b>Timestamp</b>{formatTimestampTitle(validation.created_at)}</span> : null}
      </div>
      {domains.length ? (
        <div className="validation-domains" aria-label="Affected Home Assistant domains">
          {domains.map((domain) => (
            <span key={domain.id} title={(domain.paths || []).join(", ")}>
              {domain.label || domain.id}
            </span>
          ))}
        </div>
      ) : null}
      {files.length && !compact ? (
        <ul className="validation-files" aria-label="Changed Home Assistant files">
          {files.slice(0, 8).map((file) => <li key={`${file.status}:${file.path}`}><b>{file.status || "changed"}</b>{file.path}</li>)}
          {files.length > 8 ? <li><b>more</b>{files.length - 8} additional files</li> : null}
        </ul>
      ) : null}
      {reloadDomains.length && onReloadDomains ? (
        <div className="validation-actions">
          {reloadDomains.map((domain) => (
            <button type="button" className="ghost" key={domain} onClick={() => onReloadDomains([domain])}>
              <Icon icon="mdi:reload" />
              <span>Reload {reloadLabel(domain)}</span>
            </button>
          ))}
        </div>
      ) : null}
      {output ? (
        <details className="validation-output" open={!compact && tone === "error"}>
          <summary>Validation output</summary>
          <pre>{output}</pre>
        </details>
      ) : null}
    </section>
  );
}

function reloadLabel(domain: string): string {
  return {
    automations: "automations",
    scripts: "scripts",
    scenes: "scenes",
    themes: "themes",
  }[domain] || domain;
}
