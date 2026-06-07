import { HISTORY_LENGTH } from "../types/metrics";

export function appendHistory(values: number[], next: number, max = HISTORY_LENGTH): number[] {
  return [...values.slice(-(max - 1)), next];
}

export function historyMax(values: number[]): number {
  if (values.length === 0) {
    return 1;
  }
  return Math.max(...values, 1);
}
