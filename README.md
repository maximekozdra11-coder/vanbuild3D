# VanBuild3D

A lightweight MVP web app for designing 3D van interior layouts.

## Features

- 🚐 Select van presets (L1H1, L2H2, L3H2, L3H3)
- 🧱 Add furniture objects: Bed, Bench, Kitchen, Shower, Cabinet, Water Tank
- 🖱️ Drag & drop objects with 5cm grid snap
- 🔄 Rotate objects 90°, resize via inputs
- 📐 Orbit controls: rotate, pan, zoom (no drei)
- ��️ View presets: 3D, Top, Side, Rear
- 📏 Floor area calculation
- ⚠️ Collision detection (AABB)
- 💾 Auto-save to localStorage
- 📤 Export / Import JSON
- 📱 Mobile-first dark UI

## Stack

- Vite + React
- Three.js + @react-three/fiber (no drei)
- Zustand (state management)
- TailwindCSS (styling)

## Install & Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```
