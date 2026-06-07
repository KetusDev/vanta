use serde::Serialize;

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

#[derive(Serialize)]
pub struct DiskEntry {
    pub name: String,
    pub total_gb: u64,
    pub used_gb: u64,
}

#[derive(Serialize)]
pub struct DiskMetrics {
    pub disks: Vec<DiskEntry>,
    pub total_gb: u64,
    pub used_gb: u64,
}

#[derive(Serialize)]
pub struct NetworkInterface {
    pub name: String,
    pub download_kbps: u64,
    pub upload_kbps: u64,
}

#[derive(Serialize)]
pub struct NetworkMetrics {
    pub download_kbps: u64,
    pub upload_kbps: u64,
    pub interfaces: Vec<NetworkInterface>,
}

#[derive(Serialize)]
pub struct SystemMetrics {
    pub uptime_secs: u64,
    pub swap_total_mb: u64,
    pub swap_used_mb: u64,
}

#[derive(Serialize)]
pub struct AllMetrics {
    pub cpu: CpuMetrics,
    pub ram: RamMetrics,
    pub disk: DiskMetrics,
    pub network: NetworkMetrics,
    pub system: SystemMetrics,
}
