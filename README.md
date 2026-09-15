# BrowserCut — Free Automatic In-Browser Video & Audio Editor

<p align="center">
  <img src="https://res.cloudinary.com/dpx6w78bt/image/upload/f_auto/q_auto/v1786342039/Online_Tool_rc1ybr.png" alt="BrowserCut Banner" width="100%" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);" />
</p>

<p align="center">
  <a href="https://browsercut.github.io"><img src="https://img.shields.io/badge/Live_App-browsercut.github.io-1B2CC1?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Site"></a>
  <a href="https://buymeacoffee.com/kisharadilz"><img src="https://img.shields.io/badge/Support-Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=091540" alt="Buy Me A Coffee"></a>
  <img src="https://img.shields.io/badge/Astro-5.0-BC52EE?style=for-the-badge&logo=astro&logoColor=white" alt="Astro 5">
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/FFmpeg-WASM_0.12-007808?style=for-the-badge&logo=ffmpeg&logoColor=white" alt="FFmpeg.wasm">
  <img src="https://img.shields.io/badge/Privacy-100%25_Client--Side-green?style=for-the-badge&logo=shield&logoColor=white" alt="100% Client Side">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="MIT License">
</p>

---

## 🌟 Overview

**[BrowserCut](https://browsercut.github.io)** is an ultra-fast, high-performance, 100% client-side video and audio editor powered by **FFmpeg.wasm** and **WebAssembly**. 

Unlike conventional online video tools, BrowserCut performs all transcoding, trimming, layering, and exporting directly in the user's web browser thread. **Zero files are ever uploaded to any server or cloud database.**

---

## ✨ Key Features

- 🔒 **100% Client-Side & Absolute Privacy**: Media processing runs entirely in WebAssembly memory via `SharedArrayBuffer`. Your video clips and audio recordings never leave your local machine.
- 🎬 **Multi-Video Sequencing**: Upload multiple video clips (MP4, WebM, MOV, AVI), reorder them effortlessly along the timeline strip, and adjust individual start and end trim boundaries.
- 🎵 **Multi-Audio Track Layering & Cutting**:
  - Upload multiple secondary audio tracks (MP3, WAV, AAC, OGG, M4A).
  - Live audio preview player to audition tracks before trimming.
  - Dual cut sliders (Cut Start & Cut End) with millisecond precision.
  - Configurable timeline start delay (offset in seconds) and individual volume control (0%–150%).
  - 3 audio mixing modes: **Mix** (combine source and tracks), **Replace** (mute original video), or **Keep** (original video audio only).
- 📐 **Full HD 1080p Export Engine**:
  - Export resolution options: **1080p Full HD** (1920×1080), **720p HD** (1280×720), or **Source Native**.
  - Uniform aspect-ratio preserving scaling with black letterboxing so horizontal and vertical clips merge seamlessly without distortion.
- 🌓 **Cinematic Fade Transitions**: Smooth intro fade-in and outro fade-out for both video and audio.
- 📱 **Fluid Responsive & Touch-Optimized**: Native swipeable tabs and touch scrubbing across iPhone, Android, iPad, and desktop viewports, with an icon-only minimal navbar on mobile and tablet.
- 🌍 **Internationalization (i18n)**: Subpath routing supporting 6 languages:
  - 🇺🇸 English (`/`)
  - 🇪🇸 Spanish (`/es/`)
  - 🇧🇷 Portuguese (`/pt/`)
  - 🇩🇪 German (`/de/`)
  - 🇫🇷 French (`/fr/`)
  - 🇯🇵 Japanese (`/ja/`)
- 🚀 **100% Technical SEO Architecture**:
  - JSON-LD Schema graph (`WebApplication`, `HowTo`, `FAQPage`, `BreadcrumbList`).
  - Automated XML sitemap generation via `@astrojs/sitemap`.
  - 7 bidirectional `hreflang` tags (including `x-default`).
  - Open Graph and Twitter Cards with custom CDN social preview assets.
- 🎨 **Dark & Light Mode**: Seamless dark/light theme switching with an inline anti-FOUC script.

---

## 🛠️ Technical Stack

| Layer | Technology |
|---|---|
| **Framework** | [Astro 5](https://astro.build/) (Static Site Generation mode) |
| **Interactive Island** | [React 19](https://react.dev/) (`client:load`) |
| **Video & Audio Engine** | [@ffmpeg/ffmpeg](https://github.com/ffmpegwasm/ffmpeg.wasm) (v0.12) & `@ffmpeg/util` |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) (Custom `#091540`, `#1B2CC1`, `#7692FF`, `#ABD2FA` palette) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Cross-Origin Isolation** | `coi-serviceworker` (COOP / COEP injection for GitHub Pages) |
| **Sitemap & SEO** | `@astrojs/sitemap` |
| **Analytics** | Google tag (`gtag.js` `G-521QYX3Z29`) |
| **Deployment** | [GitHub Pages](https://pages.github.com/) via GitHub Actions |

---

## 📁 Repository Structure

```
browsercut.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment to GitHub Pages
├── public/
│   ├── coi-serviceworker.js    # COOP/COEP Service Worker for GitHub Pages
│   ├── favicon.svg             # Vector site icon
│   └── robots.txt              # Search engine crawl directives & sitemap reference
├── src/
│   ├── components/
│   │   ├── Faq.astro           # Native accessible accordion FAQ section
│   │   ├── Features.astro      # Feature highlight cards
│   │   ├── Footer.astro        # Multilingual footer with external links
│   │   ├── Header.astro        # Responsive navigation bar (icon-only on mobile/tablet)
│   │   ├── HowItWorks.astro    # Step-by-step HowTo guide
│   │   ├── LanguagePicker.astro# Dropdown language switcher
│   │   ├── ThemeToggle.astro   # Light/dark mode toggle button
│   │   └── VideoEditorWorkspace.jsx # Core React island for FFmpeg.wasm processing
│   ├── i18n/
│   │   ├── ui.ts               # Translation dictionaries for all 6 locales
│   │   └── utils.ts            # Hreflang generator & localization helpers
│   ├── layouts/
│   │   └── Layout.astro        # Master HTML layout (SEO, Schema.org, Open Graph, Google Tag)
│   ├── pages/
│   │   ├── [lang]/
│   │   │   └── index.astro     # Static localized routes (/es/, /pt/, /de/, /fr/, /ja/)
│   │   └── index.astro         # Default English homepage (/)
│   └── styles/
│       └── global.css          # Tailwind base, components, and utilities
├── astro.config.mjs            # Astro configuration with i18n, React, Tailwind, and Sitemap
├── package.json
├── tailwind.config.mjs         # Theme tokens and custom color definitions
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or later (Node 20+ or 22+ recommended)
- **npm**: v9.0.0 or later

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/browsercut/browsercut.github.io.git
   cd browsercut.github.io
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:4321` in your browser.

> **Note on Local Development**: `astro.config.mjs` is preconfigured with `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` HTTP headers under Vite's server settings to allow `SharedArrayBuffer` execution locally.

### Production Build

To compile static HTML, CSS, JavaScript chunks, and XML sitemaps:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Cross-Origin Isolation on GitHub Pages

FFmpeg.wasm relies on Web Workers and `SharedArrayBuffer` for hardware acceleration and multithreaded video rendering. Browsers require **Cross-Origin Opener Policy (COOP)** and **Cross-Origin Embedder Policy (COEP)** headers to enable `SharedArrayBuffer`.

Because GitHub Pages does not support custom HTTP response headers out of the box, BrowserCut includes [`public/coi-serviceworker.js`](public/coi-serviceworker.js). This lightweight Service Worker intercepts fetch requests client-side to inject:
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: require-corp`

This enables 100% client-side WebAssembly video processing on GitHub Pages without any backend server.

---

## ☕ Support & Community

BrowserCut is completely free, open-source, and has zero advertising or watermarks. If you find this project helpful, consider supporting the developer:

<p align="left">
  <a href="https://buymeacoffee.com/kisharadilz" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" width="210">
  </a>
</p>

---

## 📄 License

This project is open-source software licensed under the [MIT License](LICENSE).
