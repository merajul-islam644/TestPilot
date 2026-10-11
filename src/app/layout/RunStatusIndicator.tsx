type RunState = "idle";

export function RunStatusIndicator() {
  return (
    <span className="run-status" data-state="idle" title="No runs in this workspace yet">
      <span className="run-dot" aria-hidden />
      <span className="run-status-label">Idle</span>
    </span>
  );
}