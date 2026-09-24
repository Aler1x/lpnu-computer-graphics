import { useEffect, useState, type ChangeEvent, type MouseEvent, type RefObject } from "react";
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

const MAX_IMAGE_SIZE = 400;
const DEFAULT_IMAGE = "/samples/color-template.svg";

function loadImage(imagePath: string, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const image = new Image();
  image.onload = () => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  };
  image.src = imagePath;
}

export function useColorLab(
  originCanvas: RefObject<HTMLCanvasElement | null>,
  editingCanvas: RefObject<HTMLCanvasElement | null>,
) {

  const [lightness, setLightness] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [showHoverSquare, setShowHoverSquare] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [fileName, setFileName] = useState<string | null>("Шаблон");
  const [imageSrc, setImageSrc] = useState<string | null>(DEFAULT_IMAGE);
  const [originImage, setOriginImage] = useState<string | null>(DEFAULT_IMAGE);
  const [editingImage, setEditingImage] = useState<string | null>(DEFAULT_IMAGE);
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

    if (showSelection) {
      adjustForColorSelection(
        originCanvas.current,
        editingCanvas.current,
        lightness - 1,
        saturation - 1,
        selectionStart,
        selectionEnd,
      );
      return;
    }

    adjustForColor(
      originCanvas.current,
      editingCanvas.current,
      lightness - 1,
      saturation - 1,
    );
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
    if (originImage && originCanvas.current) {
      loadImage(originImage, originCanvas.current);
    }
    if (editingImage && editingCanvas.current) {
      loadImage(editingImage, editingCanvas.current);
    }
  }, [originImage, editingImage, originCanvas, editingCanvas]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = String(e.target?.result);
      setImageSrc(result);
      setOriginImage(result);
      setEditingImage(result);
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
    const pixel = getImagePixel(img, offsetX, offsetY);
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
    maxImageSize: MAX_IMAGE_SIZE,
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
