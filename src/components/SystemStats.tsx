import { useMetrics } from "../hooks/useMetrics";
import { formatMegabytes, formatUptime } from "../lib/format";

export function SystemStats() {
  const { metrics, loading } = useMetrics();
  const system = metrics?.system;

  if (loading && !system) {
    return (
      <div className="system-stats">
        <span className="system-stats__pill system-stats__pill--loading">Loading system stats</span>
      </div>
    );
  }

  if (!system) {
    return null;
  }

  const swapLabel =
    system.swap_total_mb > 0
      ? `${formatMegabytes(system.swap_used_mb)} / ${formatMegabytes(system.swap_total_mb)} swap`
      : "No swap configured";

  return (
    <div className="system-stats">
      <span className="system-stats__pill">
        <span className="system-stats__label">Uptime</span>
        <span className="system-stats__value">{formatUptime(system.uptime_secs)}</span>
      </span>
      <span className="system-stats__pill">
        <span className="system-stats__label">Swap</span>
        <span className="system-stats__value">{swapLabel}</span>
      </span>
    </div>
  );
}
