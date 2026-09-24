# Computer Graphics (LPNU)

Interactive web app for computer graphics: Newton and Vicsek fractals, color schemes (RGB/HSL/CMYK), and affine transformations with a parallelogram.

## Tech stack

- **React 19** + **TypeScript**
- **Vite 7** — build and dev server
- **Tailwind CSS 4** — styling
- **shadcn/ui on Base UI** — layout, controls, and dialogs
- **React Router 6** — routing
- **WebGL 2** — Newton and Vicsek fractal rendering
- **Canvas 2D** — Colors page and Shapes (parallelogram) drawing

## Setup

```bash
pnpm install
pnpm dev
```

- **Lint:** `pnpm lint`
- **Build:** `pnpm build`
- **Preview:** `pnpm preview`

## Routes

| Path     | Page   | Description                                      |
|----------|--------|--------------------------------------------------|
| `/`      | Fractals | Newton and Vicsek fractals with iterations/color |
| `/colors`| Colors | Image upload, HSL/CMYK, lightness/saturation     |
| `/shapes`| Shapes | Parallelogram and mirror-line transformation    |

## Features

- **Fractals**
  - **Newton fractal** — WebGL; Newton’s method in the complex plane; mouse-driven parameter; iterations and hue.
  - **Vicsek fractal** — WebGL; 3×3 cross pattern; iterations, color, wheel zoom and pan.
- **Colors**
  - Upload image, view original and edited side by side.
  - Lightness and saturation sliders (HSL).
  - Region selection for local adjustments.
  - CMYK conversion and “Apply CMYK” option.
  - Hover pixel: RGB, HSL, CMYK readout.
- **Shapes**
  - Parallelogram from points A, B, C (D computed).
  - Line `y = ax + b` for mirror axis.
  - “Draw parallelogram” and “Start motion” (mirror + translate).

## Project layout

```
src/
  App.tsx              — Router, layout, Sidebar
  main.tsx             — React root
  index.css            — Tailwind + globals
  pages/               — Fractals, Colors, Shapes
  components/          — UI (Sidebar, ControlCard, TabHeader, ProgressBar, HelpModal)
  components/fractals/ — NewtonFractal, VicsekFractal, Settings
  components/figures/  — ParallelogramContainer, ShapeParametersInput
  utils/               — newton-fractal, vicsek-fractal-webgl, webgl, colors, shape
  assets/icons/        — SVGs (sidebar, figures, help)
public/                — vertex/fragment shaders (Newton, Vicsek)
docs/                  — newton-fractal, vicsek-fractal, architecture, colors, shapes
```

## Documentation

- [Architecture](docs/architecture.md) — structure, tech stack, file map
- [Newton fractal](docs/newton-fractal.md) — algorithm, shaders, uniforms
- [Vicsek fractal](docs/vicsek-fractal.md) — algorithm, WebGL, zoom
- [Colors](docs/colors.md) — color models, image adjustments, UI
- [Shapes](docs/shapes.md) — parallelogram, mirror line, affine transforms

## License

Private / educational (LPNU).
