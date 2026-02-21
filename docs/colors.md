# Colors page and color utilities

The Colors section lets users upload an image, view original and edited versions side by side, adjust lightness and saturation (HSL), apply changes in a selected region or globally, and see RGB/HSL/CMYK under the cursor. An optional “Apply CMYK” flow converts pixels via the CMYK algorithm.

## Page: `/colors`

- **TabHeader:** “Кольори та кольорові схеми 🎨”.
- **Layout:** Two canvases (original, edited), control panel with upload, sliders, and CMYK apply.
- **State:** Image source/URL, lightness (0–2), saturation (0–2), selection rectangle, hover pixel (RGB/HSL/CMYK), file name.
- **Effects:** `adjustForColor` (full image) or `adjustForColorSelection` (selection) with lightness/saturation deltas; `adjustForColorCmykAlgo` for CMYK-based editing.
- **Hover:** Small fixed square showing pixel color; readouts in HSL, RGB, and CMYK.

## Color models (`src/utils/colors.ts`)

### Types

- **RGBPoint:** `{ r, g, b }` (0–255).
- **HSLPoint:** `{ h, s, l }` (h 0–360, s/l 0–100).
- **CMYKPoint:** `{ c, m, y, k }` (0–1).

### Conversions

- `rgbToCmyk`, `cmykToRgb`
- `rgbToHsl`, `hslToRgb`
- `cmykToHsl`, `hslToCmyk`

### Canvas / image helpers

- **getImagePixel(canvas, offsetX, offsetY)** — Returns `ImageData` for one pixel (e.g. for hover readout).
- **adjustForColor(origin, canvas, lightnessChange, saturationChange)** — Copies from origin to canvas and applies HSL change to pixels that pass `isColorCloseToColor` (currently hue near 60°).
- **adjustForColorSelection(origin, canvas, lightnessChange, saturationChange, regionStart, regionEnd)** — Same logic restricted to the rectangle between the two points.
- **adjustForColorCmykAlgo(origin, canvas)** — Converts each pixel to CMYK and back to RGB (demonstration of CMYK conversion).
- **setAllWhite(canvas, regionStart, regionEnd)** — Sets pixel data to white in the given rectangle.
- **getImageData(image)**, **imageDataToDataUrl(imageData, width?, height?)** — Extract ImageData from an image and convert ImageData to a data URL.

### Internal helpers

- **change** — Applies lightness/saturation delta to one pixel (in ImageData) if `isPixelCloseToColor` (HSL) returns true.
- **changeCmyk** — Replaces one pixel with RGB from its CMYK conversion.
- **isColorCloseToColor** — `Math.abs(color.h - 60) < 30` (yellow-ish band).

## UI components used

- **ControlCard** — Wraps upload button, ProgressBar sliders, CMYK apply button, and color readouts.
- **ProgressBar** — “Світота” (lightness), “Насиченість” (saturation); steps 40, max 2.
- **TabHeader** — Page title.

## Files

- `src/pages/Colors.tsx` — Page logic, canvases, upload, selection, effects, hover.
- `src/utils/colors.ts` — Types, conversions, pixel/canvas helpers.
- `src/components/ControlCard.tsx`, `src/components/ProgressBar.tsx` — Shared UI.
