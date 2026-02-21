# Shapes page and parallelogram

The Shapes section demonstrates affine transformations: a parallelogram defined by three vertices (with the fourth computed), a line \(y = ax + b\) as mirror axis, and an action that mirrors the parallelogram across that line and then translates it.

## Page: `/shapes`

- **TabHeader:** “Взаємодія з паралелограмом 🔷”.
- **State:**
  - **parallelogram** — 4×3 matrix (homogeneous coordinates): rows for vertices A, B, C, D; columns x, y, 1.
  - **line** — `[a, b]` for \(y = ax + b\).
- **Actions:**
  - **“Намалювати паралелограм”** — Computes D from A, B, C so that ABCD is a parallelogram (\(D = A + C - B\)); updates state. Skips update if the three points are collinear.
  - **“Почати рух”** — Uses `Shape.mirrorAcrossLineAndTransform(line, 10)`: mirror across the line then translate by \((10, ax + b)\); updates parallelogram state from `myShape.verticesMatrix`.

## Shape class (`src/utils/shape.ts`)

- **Matrix** — `[number, number, number][]` (homogeneous 2D).
- **Shape(vertices)** — Holds `verticesMatrix`.
- **getVertex(vertex)** — Returns `[x, y]` for index or `"center"`.
- **getCenter()** — Centroid of vertices.
- **getTranslateMatrix(dx, dy)**, **getScaleMatrix(sx, sy)**, **getRotateMatrix(angleDegree)** — Standard 3×3 matrices.
- **getMirrorMatrix(a, b)** — Reflection matrix for line \(y = ax + b\) (translate to origin, rotate to x-axis, scale y by -1, rotate/translate back).
- **applyTransformation(transformationMatrix)** — Replaces `verticesMatrix` with matrix product (vertices × transformation).
- **mirrorAcrossLineAndTransform([a, b], x)** — Applies mirror matrix then translation by \((x, ax + b)\).

Matrix multiplication is in a private `matrixMultiply(a, b)`.

## ParallelogramContainer

- **Inputs:** `parallelogram` (4×3), `line` ([a, b]), `canvasRef`.
- **Canvas:** 500×500; grid (step 10), coordinate axes (origin at center), blue line \(y = ax + b\), red parallelogram. Y-axis is flipped for math coordinates (y up).
- **Drawing:** Grid, axes, line, then parallelogram; all in one `useEffect` when parallelogram, line, or ref change.

## ShapeParametersInput

- **Inputs:** `parallelogram`, `line`, `onParallelogramChange(row, col, value)`, `onLineChange(index, value)`.
- **UI:** Inputs for A, B, C (x, y each) and for line (a, b); Help icon opens HelpModal with parallelogram instructions.
- **Help content:** Enter A, B, C; D is computed. Then set A and B for \(y = A x + B\) for the mirror line.

## Collinearity check

Before updating the parallelogram with the computed D, the page checks `isOnTheSameLine(points)`: compares slopes of (p0, p1) and (p0, p2); if any differ, points are not collinear. Used to avoid drawing a degenerate parallelogram when A, B, C are on one line.

## Files

- `src/pages/Shapes.tsx` — State, handlers, “Draw parallelogram”, “Start motion”, collinearity, layout.
- `src/utils/shape.ts` — Shape, Matrix, affine helpers.
- `src/components/figures/ParallelogramContainer.tsx` — Canvas drawing.
- `src/components/figures/ShapeParametersInput.tsx` — Parameter inputs and help.
