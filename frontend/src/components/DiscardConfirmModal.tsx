import { Icon } from "./Icon";

export function DiscardConfirmModal({
  count,
  running,
  onCancel,
  onDiscard,
}: {
  count: number;
  running: boolean;
  onCancel: () => void;
  onDiscard: () => void;
}) {
  return (
    <div className="modal-backdrop discard-confirm-backdrop" role="presentation">
      <button
        className="modal-scrim"
        type="button"
        onClick={running ? undefined : onCancel}
        aria-label="Cancel discard"
      />
      <section className="modal discard-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="discard-confirm-title">
        <header className="modal-header">
          <h2 id="discard-confirm-title">Discard selected changes?</h2>
          <button className="icon-button" type="button" onClick={onCancel} disabled={running} aria-label="Cancel discard"><Icon icon="mdi:close" /></button>
        </header>
        <div className="discard-confirm-body">
          <p className="discard-confirm-copy">
            This will discard {count} selected {count === 1 ? "file" : "files"}. Tracked files will be restored and untracked files will be removed.
          </p>
          <div className="discard-confirm-actions">
            <button type="button" className="ghost" disabled={running} onClick={onCancel}>Cancel</button>
            <button type="button" className="danger" disabled={running} onClick={onDiscard}><Icon icon={running ? "mdi:progress-clock" : "mdi:trash-can-outline"} /><span>{running ? "Discarding..." : "Confirm discard"}</span></button>
          </div>
        </div>
      </section>
    </div>
  );
}
