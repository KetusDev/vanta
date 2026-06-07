import { useCpuMetrics } from "../hooks/useMetrics";
import { clampPercent, formatPercent } from "../lib/format";
import { MetricCard } from "./ui/MetricCard";
import { ProgressBar } from "./ui/ProgressBar";
import { Sparkline } from "./ui/Sparkline";
import { StatRow } from "./ui/StatRow";

export function CpuCard() {
  const { data: cpu, history, loading } = useCpuMetrics();

  return (
    <MetricCard
      title="Processor"
      subtitle="CPU load"
      accent="cpu"
      delay={80}
      loading={loading && !cpu}
    >
      {!cpu ? (
        <div className="metric-skeleton" />
      ) : (
        <>
          <div className="metric-hero">
            <span className="metric-hero__value">{formatPercent(cpu.overall, 0)}</span>
            <span className="metric-hero__unit">overall usage</span>
          </div>
          <Sparkline values={history} tone="cpu" />
          <ProgressBar value={clampPercent(cpu.overall)} tone="cpu" />
          <StatRow label="Logical cores" value={String(cpu.cores.length)} />
          <StatRow
            label="Per-core avg"
            value={formatPercent(
              cpu.cores.reduce((sum, core) => sum + core, 0) / cpu.cores.length,
            )}
          />
        </>
      )}
    </MetricCard>
  );
}
