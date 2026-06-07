import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/plugin-notification";
import type { AllMetrics } from "../types/metrics";

type AlertState = {
  cpuHigh: boolean;
  ramHigh: boolean;
};

const alertState: AlertState = {
  cpuHigh: false,
  ramHigh: false,
};

async function notify(title: string, body: string) {
  let granted = await isPermissionGranted();
  if (!granted) {
    const permission = await requestPermission();
    granted = permission === "granted";
  }

  if (granted) {
    sendNotification({ title, body });
  }
}

export async function checkMetricAlerts(
  metrics: AllMetrics,
  options: {
    enabled: boolean;
    cpuThreshold: number;
    ramThreshold: number;
  },
) {
  if (!options.enabled) {
    return;
  }

  const ramUsage =
    metrics.ram.total_mb > 0
      ? (metrics.ram.used_mb / metrics.ram.total_mb) * 100
      : 0;

  if (metrics.cpu.overall >= options.cpuThreshold && !alertState.cpuHigh) {
    alertState.cpuHigh = true;
    await notify(
      "High CPU usage",
      `Processor load reached ${metrics.cpu.overall.toFixed(0)}%.`,
    );
  } else if (metrics.cpu.overall < options.cpuThreshold - 5) {
    alertState.cpuHigh = false;
  }

  if (ramUsage >= options.ramThreshold && !alertState.ramHigh) {
    alertState.ramHigh = true;
    await notify(
      "High memory usage",
      `RAM utilization reached ${ramUsage.toFixed(0)}%.`,
    );
  } else if (ramUsage < options.ramThreshold - 5) {
    alertState.ramHigh = false;
  }
}
