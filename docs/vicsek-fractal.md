# Vicsek Fractal (Фрактал Вічека)

The Vicsek fractal is a recursive figure built by subdividing the unit square into a 3×3 grid and keeping only the center and the four corners (cross pattern). Each kept cell is recursively subdivided the same way. The app renders it with WebGL 2: the fragment shader implements the subdivision in a loop; no Canvas 2D recursion.

## Algorithm

- **Domain**: Unit square \([0,1]^2\). Each “level” multiplies coordinates by 3 and takes the cell \((i,j)\) where \(i, j \in \{0,1,2\}\) and \((i+j) \bmod 2 = 0\) (center (1,1) and corners (0,0), (0,2), (2,0), (2,2)).
- **Iteration**: For a point in \([0,1]^2\), repeatedly: scale by 3, take fractional part to get position in current cell; if \((i+j) \bmod 2 \neq 0\) for the cell indices, discard (black); otherwise continue up to `iterations` steps. If the point survives, it is colored with `fractalColor`.
- **Parameters**: `iterations` (max subdivision depth, 0–10), `fractalColor` (RGB), `zoom` and `center` for view transform.

## Implementation

- **Rendering**: WebGL 2; shared full-screen quad vertex shader (`public/fractals/vertex_shader.vert`); Vicsek-specific fragment shader (`public/fractals/vicsek_fragment_shader.frag`).
- **Fragment shader**: Transforms `gl_FragCoord` to world UV with `zoom` and `center`; loops up to 10 steps; at each step computes cell indices with `floor(p*3)`, discards if `(i+j)%2 != 0`, then `p = fract(p*3)`. Survivors get `fractalColor`.
- **Module**: `src/utils/vicsek-fractal-webgl.ts` — loads shaders, creates program and VAO, sets uniforms (`width`, `height`, `iterations`, `fractalColor`, `zoom`, `center`), continuous render loop with resize handling. Exports: `initVicsekWebGL`, `setVicsekIterations`, `setVicsekColor`, `setVicsekZoom`, `setVicsekCenter`.

## Zoom and pan

- Mouse wheel on the canvas: zoom in/out (factor 1–12), center shift so the point under the cursor stays fixed. Throttled (50 ms) to avoid overload. Uniforms `zoom` and `center` are updated from refs in `VicsekFractal.tsx`.

## UI (Fractals page)

- **Iterations**: Slider, step 10, max 10; default 5. Passed to component and clamped 0–10 in `setVicsekIterations`.
- **Color**: One of yellow, green, blue, purple, red; mapped to RGB and set via `setVicsekColor`.

## Files

- `src/utils/vicsek-fractal-webgl.ts` — WebGL init, program, VAO, render loop, uniform setters.
- `src/components/fractals/VicsekFractal.tsx` — Canvas, WebGL init, sync of iterations/color, wheel zoom/pan.
- `public/fractals/vertex_shader.vert` — Full-screen quad (shared with Newton).
- `public/fractals/vicsek_fragment_shader.frag` — Vicsek subdivision and coloring.
