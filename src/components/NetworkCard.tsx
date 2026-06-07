import { useNetworkMetrics } from "../hooks/useMetrics";
import { useSettings } from "../hooks/useSettings";
import { formatSpeed } from "../lib/format";
import { MetricCard } from "./ui/MetricCard";
import { Sparkline } from "./ui/Sparkline";
import { StatRow } from "./ui/StatRow";

export function NetworkCard() {
  const { data: network, history, loading } = useNetworkMetrics();
  const { settings } = useSettings();

  return (
    <MetricCard
      title="Network"
      subtitle="Throughput"
      accent="network"
      delay={320}
      loading={loading && !network}
    >
      {!network ? (
        <div className="metric-skeleton" />
      ) : (
        <>
          <div className="network-grid">
            <div className="network-stat network-stat--down">
              <span className="network-stat__label">Download</span>
              <span className="network-stat__value">
                {formatSpeed(network.download_kbps, settings.speedUnit)}
              </span>
            </div>
            <div className="network-stat network-stat--up">
              <span className="network-stat__label">Upload</span>
              <span className="network-stat__value">
                {formatSpeed(network.upload_kbps, settings.speedUnit)}
              </span>
            </div>
          </div>
          <Sparkline values={history.download} tone="network" label="Download trend" />
          <Sparkline values={history.upload} tone="network-up" label="Upload trend" />

          {network.interfaces.length > 0 ? (
            <div className="interface-list">
              {network.interfaces.slice(0, 4).map((iface) => (
                <div className="interface-list__item" key={iface.name}>
                  <span className="interface-list__name">{iface.name}</span>
                  <span className="interface-list__value">
                    ↓ {formatSpeed(iface.download_kbps, settings.speedUnit)} · ↑{" "}
                    {formatSpeed(iface.upload_kbps, settings.speedUnit)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <StatRow label="Interfaces" value="No active traffic" />
          )}

          <StatRow
            label="Combined"
            value={formatSpeed(
              network.download_kbps + network.upload_kbps,
              settings.speedUnit,
            )}
            emphasis
          />
        </>
      )}
    </MetricCard>
  );
}
