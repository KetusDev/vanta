mod metrics;
use metrics::{CpuMetrics, RamMetrics};
use sysinfo::System;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_cpu, get_ram])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_cpu() -> CpuMetrics {
    let mut sys = System::new_all();
    sys.refresh_all();
    CpuMetrics {
        overall: sys.global_cpu_usage(),
        cores: sys.cpus().iter().map(|cpu| cpu.cpu_usage()).collect(),
    }
}

#[tauri::command]
fn get_ram() -> RamMetrics {
    let mut sys = System::new_all();
    sys.refresh_all();
    RamMetrics {
        total_mb: sys.total_memory() / 1024 / 1024,
        used_mb: sys.used_memory() / 1024 / 1024,
        available_mb: sys.available_memory() / 1024 / 1024,
    }
}