export type RGBPoint = {
  r: number;
  g: number;
  b: number;
};

export type CMYKPoint = {
  c: number;
  m: number;
  y: number;
  k: number;
};

export type HSLPoint = {
  h: number;
  s: number;
  l: number;
};

type Optional<T> = T | undefined;

// Функція конвертації з RGB до CMYK
export function rgbToCmyk({ r, g, b }: RGBPoint): CMYKPoint {
  const c = 1 - r / 255;
  const m = 1 - g / 255;
  const y = 1 - b / 255;
  const k = Math.min(c, m, y);
  // Якщо колір чорний, повертаємо чорний
  if (k === 1) return { c: 0, m: 0, y: 0, k: 1 }; // black
  return {
    c: (c - k) / (1 - k),
    m: (m - k) / (1 - k),
    y: (y - k) / (1 - k),
    k,
  };
}

// Функція конвертації з CMYK до RGB
export function cmykToRgb({ c, m, y, k }: CMYKPoint): RGBPoint {
  return {
    r: 255 * (1 - c) * (1 - k),
    g: 255 * (1 - m) * (1 - k),
    b: 255 * (1 - y) * (1 - k),
  };
}


/**
 * Function to convert from RGB to HSL.
 * @param r - The red component of the RGB color.
 * @param g - The green component of the RGB color.
 * @param b - The blue component of the RGB color.
 * @returns The HSL color.
 */
export function rgbToHsl({ r, g, b }: RGBPoint): HSLPoint {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h, s;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    if (h == undefined) {
      throw new Error("h is undefined");
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Function to convert from HSL to RGB.
 * @param hsl - The HSL color.
 * @returns The RGB color.
 */
export function hslToRgb(hsl: HSLPoint): RGBPoint {
  const h = hsl.h;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}

export function cmykToHsl({ c, m, y, k }: CMYKPoint): HSLPoint {
  return rgbToHsl(cmykToRgb({ c, m, y, k }));
}

export function hslToCmyk({ h, s, l }: HSLPoint): CMYKPoint {
  return rgbToCmyk(hslToRgb({ h, s, l }));
}

/**
 * Function to get a pixel from a canvas.
 * @param canvas - The canvas to get the pixel from.
 * @param offsetX - The x offset of the pixel.
 * @param offsetY - The y offset of the pixel.
 * @returns The pixel data.
 */
export const getImagePixel = (
  canvas: HTMLCanvasElement,
  offsetX = 0,
  offsetY = 0
) => {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("couldn't get 2d context in getImagePixel");
    return;
  }

  return ctx.getImageData(offsetX, offsetY, 1, 1);
};

/**
 * Function to adjust the color of an image on a canvas.
 * @param origin - The original canvas.
 * @param canvas - The canvas to adjust the color of.
 * @param lightnessChange - The lightness change.
 * @param saturationChange - The saturation change.
 */
export const adjustForColor = (
  origin: HTMLCanvasElement,
  canvas: HTMLCanvasElement,
  lightnessChange: number,
  saturationChange: number
) => {
  if (canvas === null) {
    console.error("Canvas is null");
    return;
  }
  const originCtx: CanvasRenderingContext2D | null = origin.getContext("2d");
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  if (!ctx || !originCtx) {
    console.error("Unable to get 2D context from canvas.");
    return;
  }

  const imageData: ImageData = originCtx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );
  const data: Uint8ClampedArray = imageData.data;

  const isPixelCloseToColor = (pixel: HSLPoint) => isColorCloseToColor(pixel);

  for (let i = 0; i < data.length; i += 4) {
    change(data, i, lightnessChange, saturationChange, isPixelCloseToColor);
  }
  ctx.putImageData(imageData, 0, 0);
};

/**
 * Function to adjust the color of an image on a canvas through CMYK.
 * @param origin - The original canvas.
 * @param canvas - The canvas to adjust the color of.
 */
export const adjustForColorCmykAlgo = (
  origin: HTMLCanvasElement,
  canvas: HTMLCanvasElement
) => {
  if (canvas === null) {
    console.error("Canvas is null");
    return;
  }
  const originCtx: CanvasRenderingContext2D | null = origin.getContext("2d");
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  if (!ctx || !originCtx) {
    console.error("Unable to get 2D context from canvas.");
    return;
  }

  const imageData: ImageData = originCtx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );
  const data: Uint8ClampedArray = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    changeCmyk(data, i);
  }
  ctx.putImageData(imageData, 0, 0);
};

/**
 * Function to adjust the color of an image on a canvas in a selected region.
 * @param origin - The original canvas.
 * @param canvas - The canvas to adjust the color of.
 * @param lightnessChange - The lightness change.
 * @param saturationChange - The saturation change.
 * @param regionStart - The start of the region.
 * @param regionEnd - The end of the region.
 */
export const adjustForColorSelection = (
  origin: HTMLCanvasElement,
  canvas: HTMLCanvasElement,
  lightnessChange: number,
  saturationChange: number,
  regionStart: { x: number; y: number },
  regionEnd: { x: number; y: number }
) => {
  if (canvas === null || origin === null) {
    console.error("Canvas is null");
    return;
  }

  const originCtx: CanvasRenderingContext2D | null = origin.getContext("2d");
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  if (!ctx || !originCtx) {
    console.error("Unable to get 2D context from canvas.");
    return;
  }

  const imageData: ImageData = originCtx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );
  const data: Uint8ClampedArray = imageData.data;

  const isPixelCloseToColor = (pixel: HSLPoint) => isColorCloseToColor(pixel);

  // Ensure that the region coordinates are within the canvas boundaries
  const startX = Math.min(regionStart.x, regionEnd.x);
  const startY = Math.min(regionStart.y, regionEnd.y);
  const endX = Math.max(regionStart.x, regionEnd.x);
  const endY = Math.max(regionStart.y, regionEnd.y);

  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      const index = (y * canvas.width + x) * 4;
      change(
        data,
        index,
        lightnessChange,
        saturationChange,
        isPixelCloseToColor
      );
    }
  }

  ctx.putImageData(imageData, 0, 0);
};

/**
 * Function to change a pixel on an image.
 * @param data - The data of the image.
 * @param index - The index of the pixel.
 * @param lightnessChange - The lightness change.
 * @param saturationChange - The saturation change.
 * @param isPixelCloseToColor - A function to check if a pixel is close to a color.
 */
function change(
  data: Uint8ClampedArray,
  index: number,
  lightnessChange: number,
  saturationChange: number,
  isPixelCloseToColor: (pixel: HSLPoint) => boolean
) {
  const pixel = { r: data[index], g: data[index + 1], b: data[index + 2] };
  let hsl = rgbToHsl(pixel);

  if (!isPixelCloseToColor(hsl)) {
    return;
  }

  hsl = {
    h: hsl.h,
    s: Math.min(100, hsl.s + saturationChange * 100),
    l: Math.min(100, hsl.l + lightnessChange * 100),
  };

  const rgb = hslToRgb(hsl);

  data[index] = rgb.r;
  data[index + 1] = rgb.g;
  data[index + 2] = rgb.b;
}

/**
 * Function to change a pixel on an image through CMYK.
 * @param data - The data of the image.
 * @param index - The index of the pixel.
 */
function changeCmyk(
  data: Uint8ClampedArray,
  index: number
) {
  const pixel = { r: data[index], g: data[index + 1], b: data[index + 2] };
  let cmyk = rgbToCmyk(pixel);

  cmyk = {
    c: cmyk.c,
    m: cmyk.m,
    y: cmyk.y,
    k: cmyk.k,
  };

  const rgb = cmykToRgb(cmyk);
  data[index] = rgb.r;
  data[index + 1] = rgb.g;
  data[index + 2] = rgb.b;
  console.log("changed to cmyk");
}

/**
 * Function to check if a color is close to a color.
 * @param color - The color to check.
 * @returns True if the color is close to a color, false otherwise.
 */
function isColorCloseToColor(color: HSLPoint) {
  return Math.abs(color.h - 60) < 30;
}

/**
 * Function to set all pixels on a canvas to white.
 * @param canvas - The canvas to set the pixels on.
 * @param regionStart - The start of the region.
 * @param regionEnd - The end of the region.
 */
export const setAllWhite = (
  canvas: HTMLCanvasElement,
  regionStart: { x: number; y: number },
  regionEnd: { x: number; y: number }
) => {
  if (canvas === null) {
    console.error("Canvas is null");
    return;
  }
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  if (!ctx) {
    console.error("Unable to get 2D context from canvas.");
    return;
  }

  const imageData: ImageData = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );
  const data: Uint8ClampedArray = imageData.data;

  // Ensure that the region coordinates are within the canvas boundaries
  const startX = Math.min(regionStart.x, regionEnd.x);
  const startY = Math.min(regionStart.y, regionEnd.y);
  const endX = Math.max(regionStart.x, regionEnd.x);
  const endY = Math.max(regionStart.y, regionEnd.y);

  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      const index = (y * canvas.width + x) * 4;
      // Set each pixel to white (255, 255, 255, 255)
      data[index] = 255; // Red
      data[index + 1] = 255; // Green
      data[index + 2] = 255; // Blue
      data[index + 3] = 255; // Alpha
    }
  }

  // Update the canvas with the modified image data
  ctx.putImageData(imageData, 0, 0);
};

/**
 * Function to get the image data from an image.
 * @param image - The image to get the data from.
 * @returns The image data.
 */
export const getImageData = (image: HTMLImageElement): Optional<ImageData> => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

  try {
    return ctx.getImageData(0, 0, image.naturalWidth, image.naturalHeight);
  } catch (e) {
    console.error("Error extracting image fragment:", e);
  }
};

/**
 * Function to convert image data to a data URL.
 * @param imageData - The image data to convert.
 * @param width - The width of the image.
 * @param height - The height of the image.
 * @returns The data URL.
 */
export function imageDataToDataUrl(
  imageData: ImageData,
  width = imageData.width,
  height = imageData.height
): string {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  canvas.width = width;
  canvas.height = height;
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}
