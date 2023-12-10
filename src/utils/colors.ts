export type RGBPoint = {
  r: number
  g: number
  b: number
};

export type CMYKPoint = {
  c: number
  m: number
  y: number
  k: number
};

export type HSLPoint = {
  h: number
  s: number
  l: number
};

type Optional<T> = T | undefined;

// type Selection = { startX: number, startY: number, endX: number, endY: number };

export function rgbToCmyk({ r, g, b }: RGBPoint): CMYKPoint {
  const c = 1 - r / 255;
  const m = 1 - g / 255;
  const y = 1 - b / 255;
  const k = Math.min(c, m, y);
  return {
    c: (c - k) / (1 - k),
    m: (m - k) / (1 - k),
    y: (y - k) / (1 - k),
    k,
  };
}

export function cmykToRgb({ c, m, y, k }: CMYKPoint): RGBPoint {
  return {
    r: 255 * (1 - c) * (1 - k),
    g: 255 * (1 - m) * (1 - k),
    b: 255 * (1 - y) * (1 - k),
  };
}

export function rgbToHsl({ r, g, b }: RGBPoint): HSLPoint {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let l = (max + min) / 2;
  let h, s;

  if(max === min) {
      h = s = 0; // achromatic
  } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      if (h == undefined) {
        throw new Error("h is undefined");
      }
      h /= 6;
  }

  const h360 = Math.round(h * 360);
  const hModifier = 0;
  h = h360 + hModifier > 360 ? (h360 + hModifier) % 360 : h360 + hModifier;

  const s100 = Math.round(s * 100);
  const sModifier = 0;
  s = s100 + sModifier > 100 ? 100 : s100 + sModifier;

  const l100 = Math.round(l * 100);
  const lModifier = 0;
  l = l100 + lModifier > 100 ? 100 : l100 + lModifier;

  return { h: h, s: s, l: l };
}

export function hslToRgb({ h, s, l }: HSLPoint): RGBPoint {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1/3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1/3);
  }

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255)};
}

function hueToRgb(p: number, q: number, t: number) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1/6) return p + (q - p) * 6 * t;
  if (t < 1/2) return q;
  if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
  return p;
}


export function cmykToHsl({c, m, y, k}: CMYKPoint): HSLPoint {
  return rgbToHsl(cmykToRgb({c, m, y, k}));
}

export function hslToCmyk({h, s, l}: HSLPoint): CMYKPoint {
  return rgbToCmyk(hslToRgb({h, s, l}));
}

export const getImagePixel = (image: HTMLImageElement, offsetX = 0, offsetY = 0) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);

  return ctx.getImageData(offsetX, offsetY, 1, 1);
}

export const getImageData = (
  image: HTMLImageElement
): Optional<ImageData> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

  try {
    return ctx.getImageData(0, 0, image.naturalWidth, image.naturalHeight);
  } catch (e) {
    console.error("Error extracting image fragment:", e);
  }
}

export function imageDataToDataUrl(imageData: ImageData, width = imageData.width, height = imageData.height): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  canvas.width = width;
  canvas.height = height;
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}
