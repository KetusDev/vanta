use serde::Serialize;
use sysinfo::System;

#[derive(Serialize)]
pub struct CpuMetrics {
    pub overall: f32,
    pub cores: Vec<f32>,
}

#[derive(Serialize)]
pub struct RamMetrics {
    pub total_mb: u64,
    pub used_mb: u64,
    pub available_mb: u64,
}
