import { useEffect, useRef, useState, type ChangeEvent, type MouseEvent, type RefObject } from "react";
import {
  adjustForColor,
  adjustForColorCmykAlgo,
  adjustForColorSelection,
  getImagePixel,
  rgbToCmyk,
  rgbToHsl,
  type CMYKPoint,
  type HSLPoint,
  type RGBPoint,
} from "@/utils/colors";

const DEFAULT_IMAGE = "/samples/color-template.png";
const MAX_FRAME = { width: 640, height: 360 };

export type ImageFrame = { width: number; height: number };

function frameFor(width: number, height: number): ImageFrame {
  const scale = Math.min(MAX_FRAME.width / width, MAX_FRAME.height / height);
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

function bufferPoint(canvas: HTMLCanvasElement, x: number, y: number) {
  const scaleX = canvas.clientWidth > 0 ? canvas.width / canvas.clientWidth : 1;
  const scaleY = canvas.clientHeight > 0 ? canvas.height / canvas.clientHeight : 1;
  return { x: Math.round(x * scaleX), y: Math.round(y * scaleY) };
}

export function useColorLab(
  originCanvas: RefObject<HTMLCanvasElement | null>,
  editingCanvas: RefObject<HTMLCanvasElement | null>,
) {

  const [lightness, setLightness] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [showHoverSquare, setShowHoverSquare] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [frame, setFrame] = useState<ImageFrame>({ width: 640, height: 360 });
  const [fileName, setFileName] = useState<string | null>("Шаблон");
  const [imageSrc, setImageSrc] = useState<string | null>(DEFAULT_IMAGE);
  const [originImage, setOriginImage] = useState<string | null>(DEFAULT_IMAGE);
  const [rgbValues, setRgbValues] = useState<RGBPoint>({ r: 0, g: 0, b: 0 });
  const [hslValues, setHslValues] = useState<HSLPoint>({ h: 0, s: 0, l: 0 });
  const [cmykValues, setCmykValues] = useState<CMYKPoint>({
    c: 0,
    m: 0,
    y: 0,
    k: 0,
  });
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 });
  const [isSelecting, setIsSelecting] = useState(false);
  const [showSelection, setShowSelection] = useState(false);
  const adjustmentRef = useRef({
    lightness,
    saturation,
    showSelection,
    selectionStart,
    selectionEnd,
  });
  useEffect(() => {
    adjustmentRef.current = {
      lightness,
      saturation,
      showSelection,
      selectionStart,
      selectionEnd,
    };
  }, [lightness, saturation, showSelection, selectionStart, selectionEnd]);

  useEffect(() => {
    if (
      localStorage.getItem("colors") === "false" ||
      (localStorage.getItem("colors") === null && cmykValues.k === 1)
    ) {
      localStorage.setItem("colors", "true");
    }
  }, [cmykValues.k]);

  useEffect(() => {
    if (!editingCanvas.current || !originCanvas.current) return;

    const origin = originCanvas.current;
    const editing = editingCanvas.current;
    const start = bufferPoint(origin, selectionStart.x, selectionStart.y);
    const end = bufferPoint(origin, selectionEnd.x, selectionEnd.y);

    if (showSelection) {
      adjustForColorSelection(
        origin,
        editing,
        lightness - 1,
        saturation - 1,
        start,
        end,
      );
      return;
    }

    adjustForColor(origin, editing, lightness - 1, saturation - 1);
  }, [
    lightness,
    saturation,
    selectionEnd,
    selectionStart,
    showSelection,
    originCanvas,
    editingCanvas,
  ]);

  useEffect(() => {
    const origin = originCanvas.current;
    const editing = editingCanvas.current;
    if (!originImage || !origin || !editing) return;

    const image = new Image();
    let cancelled = false;
    image.onload = () => {
      if (cancelled) return;
      const next = frameFor(image.naturalWidth, image.naturalHeight);
      origin.width = next.width;
      origin.height = next.height;
      editing.width = next.width;
      editing.height = next.height;
      origin.getContext("2d")?.drawImage(image, 0, 0, next.width, next.height);
      setFrame((current) =>
        current.width === next.width && current.height === next.height ? current : next,
      );

      const view = adjustmentRef.current;
      const start = bufferPoint(origin, view.selectionStart.x, view.selectionStart.y);
      const end = bufferPoint(origin, view.selectionEnd.x, view.selectionEnd.y);
      if (view.showSelection) {
        adjustForColorSelection(origin, editing, view.lightness - 1, view.saturation - 1, start, end);
        return;
      }
      adjustForColor(origin, editing, view.lightness - 1, view.saturation - 1);
    };
    image.src = originImage;
    return () => {
      cancelled = true;
    };
  }, [originImage, originCanvas, editingCanvas]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = String(e.target?.result);
      setImageSrc(result);
      setOriginImage(result);
      setShowSelection(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCmykChange = () => {
    const origin = originCanvas.current;
    const change = editingCanvas.current;
    if (!origin || !change) return;
    adjustForColorCmykAlgo(origin, change);
  };

  const readPixel = (event: MouseEvent<HTMLCanvasElement>) => {
    const img = event.target as HTMLCanvasElement;
    const { offsetX, offsetY } = event.nativeEvent;
    const point = bufferPoint(img, offsetX, offsetY);
    const pixel = getImagePixel(img, point.x, point.y);
    if (!pixel) return;

    const [r, g, b] = pixel.data;
    setRgbValues({ r, g, b });
    setHslValues(rgbToHsl({ r, g, b }));
    setCmykValues(rgbToCmyk({ r, g, b }));
    setCursorPos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    if (isSelecting) {
      const { offsetX, offsetY } = event.nativeEvent;
      setSelectionEnd({ x: offsetX, y: offsetY });
    }
    readPixel(event);
  };

  const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    setShowSelection(true);
    setSelectionStart({ x: offsetX, y: offsetY });
    setSelectionEnd({ x: offsetX, y: offsetY });
    setIsSelecting(true);
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  const setHoverVisible = (visible: boolean) => {
    setShowHoverSquare(visible && Boolean(originImage));
  };

  return {
    frame,
    lightness,
    setLightness,
    saturation,
    setSaturation,
    showHoverSquare,
    cursorPos,
    fileName,
    imageSrc,
    rgbValues,
    hslValues,
    cmykValues,
    selectionStart,
    selectionEnd,
    showSelection,
    handleImageUpload,
    handleCmykChange,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    setHoverVisible,
  };
}
