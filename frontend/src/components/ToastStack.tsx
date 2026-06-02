import { Icon } from "./Icon";
import { useUiStore } from "../stores/uiStore";

export function ToastStack() {
  const toasts = useUiStore((state) => state.toasts);
  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((toast) => (
        <div className={`toast ${toast.tone}${toast.entering ? " entering" : ""}${toast.exiting ? " exiting" : ""}`} key={toast.id}>
          <Icon icon={toast.tone === "error" ? "mdi:alert-circle" : toast.tone === "success" ? "mdi:check-circle" : "mdi:information"} />
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
