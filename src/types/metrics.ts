export interface CpuMetrics{
    overall: number;
    cores: number[];
}

export interface RamMetrics{
    total_mb: number;
    used_mb: number;
    available_mb: number;
}
