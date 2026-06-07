<div align="center">

# Vanta

### Lightweight system monitor for Windows

[![CI](https://github.com/KetusDev/Vanta/actions/workflows/ci.yml/badge.svg)](https://github.com/KetusDev/Vanta/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Tauri](https://img.shields.io/badge/Tauri-2-24C8D8?style=flat-square&logo=tauri&logoColor=white)](https://tauri.app)
[![Rust](https://img.shields.io/badge/Rust-stable-orange?style=flat-square&logo=rust&logoColor=white)](https://www.rust-lang.org)

Real-time CPU, memory, disk, network, and hardware telemetry in a native desktop app — Rust backend, React UI, no Electron.

[Download latest release](https://github.com/KetusDev/Vanta/releases/latest) · [Report an issue](https://github.com/KetusDev/Vanta/issues)

</div>

---

## Features

| Area | Details |
|------|---------|
| **CPU** | Overall load, per-core average, 60s sparkline |
| **RAM** | Used / total / available, swap usage |
| **Disk** | Per-drive usage with progress bars |
| **Network** | Combined and per-interface throughput (KB/s or Mbps) |
| **Hardware** | Temperature sensors (when available), laptop battery status |
| **System** | Uptime, swap summary in header |
| **History** | Rolling 60-second charts for key metrics |
| **Tray** | Minimize to tray on close, live tooltip, Show / Quit menu |
| **Settings** | Poll interval, speed units, always on top, transparent window, autostart |
| **Alerts** | Desktop notifications for high CPU, RAM, or disk usage |
| **Export** | Download metric history as CSV or JSON |

Closing the window hides Vanta to the system tray instead of quitting the app.

---

## Download

Pre-built Windows installers are published on **[GitHub Releases](https://github.com/KetusDev/Vanta/releases)**:

- `.msi` — Windows Installer
- `.exe` — NSIS setup

Releases are **not** created on every commit. See [CI & releases](#ci--releases) below.

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Desktop shell | [Tauri 2](https://tauri.app) |
| Backend | Rust · [`sysinfo`](https://docs.rs/sysinfo) · [`battery`](https://docs.rs/battery) |
| Frontend | React 19 · TypeScript · Vite |
| Styling | Tailwind CSS 4 · custom glassmorphism UI |
| Charts | SVG sparklines (no chart library) |

---

## Getting started

### Prerequisites

- [Rust](https://rustup.rs/) (stable)
- [Node.js](https://nodejs.org/) 22+
- [pnpm](https://pnpm.io/) (version from `packageManager` in `package.json`)
- [Tauri prerequisites for Windows](https://v2.tauri.app/start/prerequisites/)

### Development

```bash
git clone https://github.com/KetusDev/Vanta.git
cd Vanta
pnpm install
pnpm tauri dev
```

### Local production build

```bash
pnpm tauri build
```

Installers are written to `src-tauri/target/release/bundle/`.

---

## CI & releases

Two separate GitHub Actions workflows:

### CI (`ci.yml`) — runs on every push / PR to `main`

| Trigger | Action |
|---------|--------|
| Push to `main` | ✅ Runs |
| Pull request to `main` | ✅ Runs |
| Push tag `v*` | ❌ Does not run (Release workflow handles tags) |
| Other branches | ❌ Does not run |

**What it does:** `pnpm build` + `cargo check` on Windows (~5 min).  
**What it does not do:** build installers or publish a GitHub Release.

### Release (`release.yml`) — runs only on version tags

| Trigger | Action |
|---------|--------|
| `git push origin v1.0.0` | ✅ Runs |
| Regular commit on `main` | ❌ Does not run |

**What it does:** full Tauri build and uploads `.msi` / `.exe` to a new GitHub Release.

The tag must match the app version in `src-tauri/tauri.conf.json` (e.g. version `1.0.0` → tag `v1.0.0`):

```bash
git tag v1.0.0
git push origin v1.0.0
```

Monitor progress under **Actions → Release**, then check **Releases** for download links.

---

## Project structure

```
vanta/
├── src/                      # React frontend
│   ├── components/           # Metric cards, settings, UI primitives
│   ├── hooks/                # useMetrics, useSettings
│   ├── lib/                  # formatting, alerts, export
│   └── types/                # Shared TypeScript types
├── src-tauri/                # Rust backend
│   ├── src/
│   │   ├── lib.rs            # Tauri commands, tray, metrics polling
│   │   └── metrics.rs        # Serializable metric structs
│   └── tauri.conf.json
├── .github/workflows/
│   ├── ci.yml                # Validate on push / PR
│   └── release.yml           # Build & publish on tag
└── docs/PLAN.md              # Original implementation notes
```

---

## License

MIT © [KetusDev](https://github.com/KetusDev). See [LICENSE](LICENSE).
