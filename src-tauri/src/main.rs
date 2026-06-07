// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use sysinfo::System;

fn main() {
    let mut sys = System::new_all();
    sys.refresh_all();
    println!("CPU: {}%", sys.global_cpu_usage());
    println!("CPU: {:?}", sys.cpus().iter().map(|cpu| cpu.cpu_usage()).collect::<Vec<f32>>());
    println!("RAM: {} MB used", sys.used_memory() / 1024 / 1024);
    println!("RAM: {} MB available", sys.available_memory() / 1024 / 1024);
    vanta_lib::run();
}
