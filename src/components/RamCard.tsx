import { useRamMetrics } from "../hooks/useMetrics";
import { clampPercent, formatMegabytes } from "../lib/format";
import { MetricCard } from "./ui/MetricCard";
import { ProgressBar } from "./ui/ProgressBar";
import { Sparkline } from "./ui/Sparkline";
import { StatRow } from "./ui/StatRow";

export function RamCard() {
  const { data: ram, history, loading } = useRamMetrics();

  return (
    <MetricCard
      title="Memory"
      subtitle="System RAM"
      accent="ram"
      delay={160}
      loading={loading && !ram}
    >
      {!ram ? (
        <div className="metric-skeleton" />
      ) : (
        <>
          <div className="metric-hero">
            <span className="metric-hero__value">{formatMegabytes(ram.used_mb)}</span>
            <span className="metric-hero__unit">in use</span>
          </div>
          <Sparkline values={history} tone="ram" />
          <ProgressBar
            value={clampPercent((ram.used_mb / ram.total_mb) * 100)}
            label="Utilization"
            tone="ram"
          />
          <StatRow label="Total" value={formatMegabytes(ram.total_mb)} />
          <StatRow label="Available" value={formatMegabytes(ram.available_mb)} />
        </>
      )}
    </MetricCard>
  );
}
