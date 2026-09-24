# Project architecture

## Overview

Single-page React app with three main sections: Fractals, Colors, and Shapes. Routing is handled by React Router; layout is a top bar plus main content. Fractals use WebGL 2; Colors and Shapes use Canvas 2D and React state.

## Tech stack

| Area        | Choice              | Notes                          |
|------------|---------------------|--------------------------------|
| Framework  | React 19            | StrictMode in `main.tsx`       |
| Build      | Vite 7              | ESM, path alias `@` → `src/`    |
| Styling    | Tailwind CSS 4 + shadcn/ui (Base UI) | Tokens in `src/index.css`, primitives in `src/components/ui` |
| Routing    | React Router 6      | `BrowserRouter`, `Routes`      |
| Graphics   | WebGL 2, Canvas 2D  | Shared `webgl.ts` for fractals |
| Icons      | SVGs + vite-plugin-svgr | `?react` imports            |
| Language   | TypeScript 5.9      | `tsconfig.app.json` + node     |

## Directory structure

```
lpnu-computer-graphics/
├── public/                    # Served as-is
│   ├── vertex_shader.vert      # Shared full-screen quad (Newton + Vicsek)
│   ├── fragment_shader.frag   # Newton fractal
│   └── vicsek_fragment_shader.frag
├── src/
│   ├── main.tsx               # createRoot, StrictMode, App, index.css
│   ├── App.tsx                # BrowserRouter, top nav, Routes (/, /colors, /shapes)
│   ├── index.css              # Tailwind directives + custom (e.g. animations)
│   ├── vite-env.d.ts          # Vite client types
│   ├── pages/
│   │   ├── Fractals.tsx       # TabHeader, Newton/Vicsek switch, FractalSettings
│   │   ├── Colors.tsx         # Canvases, upload, sliders, selection, CMYK
│   │   └── Shapes.tsx         # Parallelogram state, ParallelogramContainer, ShapeParametersInput, actions
│   ├── components/
│   │   ├── ui/                # shadcn/ui components (Base UI primitives)
│   │   ├── layout/            # Top navigation, page header, hint popovers
│   │   ├── fractals/          # Newton/Vicsek canvases and settings cards
│   │   └── figures/           # Parallelogram canvas and numeric controls
│   ├── hooks/                 # Color lab and parallelogram session state
│   ├── lib/                   # cn, routes, help copy, fractal presets
│   ├── utils/
│   │   ├── webgl.ts           # createShader, createProgram, setUniform, resizeCanvasToDisplaySize
│   │   ├── newton-fractal.ts  # Load shaders, full-screen quad, render loop, setIterations/setHueShift/setMousePos
│   │   ├── vicsek-fractal-webgl.ts  # Vicsek WebGL program, VAO, setVicsek* (iterations, color, zoom, center)
│   │   ├── colors.ts         # RGB/HSL/CMYK conversions, getImagePixel, adjustForColor*, setAllWhite, etc.
│   │   └── shape.ts          # Shape class (vertices, mirror, translate), Matrix type, matrixMultiply
│   └── assets/icons/         # SVG assets (sidebar, figures, help, upload)
├── docs/                     # Markdown documentation
├── index.html
├── vite.config.ts            # react, tailwindcss, svgr, @ alias
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── package.json
└── eslint.config.ts
```

## Data flow

- **Fractals:** Page state (fractal index, iterations, color) → NewtonFractal / VicsekFractal → utils (newton-fractal, vicsek-fractal-webgl) → WebGL uniforms; mouse/wheel in components.
- **Colors:** Image URL in state → two canvases (origin, editing); sliders/selection → `adjustForColor` / `adjustForColorSelection` from `colors.ts`; pixel readout from `getImagePixel` + RGB/HSL/CMYK.
- **Shapes:** Parallelogram matrix and line `[a, b]` in page state → ParallelogramContainer (draw), ShapeParametersInput (inputs); “Draw” computes D and updates matrix; “Start motion” uses `Shape.mirrorAcrossLineAndTransform`.

## Conventions

- No barrel files; import from concrete module paths.
- Path alias `@` for `src/` (e.g. `@/components/Sidebar`, `@/utils/colors`).
- UI copy is in Ukrainian (e.g. “Фрактали”, “Кольори та кольорові схеми”).
