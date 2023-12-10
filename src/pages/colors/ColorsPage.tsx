import { useCallback, useEffect, useRef, useState } from "react";
import TabHeader from "../../components/TabHeader/TabHeader";
import {
  RGBPoint,
  HSLPoint,
  CMYKPoint,
  hslToCmyk,
  hslToRgb,
  rgbToCmyk,
  rgbToHsl,
  cmykToRgb,
  cmykToHsl,
  getImagePixel
} from "../../utils/colors";
import ControlCard from "../../components/ControlCard/ControlCard";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { UploadImage } from "../../icons/UploadImage";
import "./ColorsPage.css";

const ColorsPage = () => {
  const [lightness, setLightness] = useState(1); // [0.1] - [2.0]
  const [saturation, setSaturation] = useState(0); // 0 - 255
  const [showHoverSquare, setShowHoverSquare] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const [fileName, setFileName] = useState<string | null>();
  const [imageSrc, setImageSrc] = useState<string | null>();
  // const [transformedImageSrc, setTransformedImageSrc] = useState<string | null>(null);


  const [rgbValues, setRgbValues] = useState<RGBPoint>({ r: 0, g: 0, b: 0 });
  const [hslValues, setHslValues] = useState<HSLPoint>({ h: 0, s: 0, l: 0 });
  const [cmykValues, setCmykValues] = useState<CMYKPoint>({ c: 0, m: 0, y: 0, k: 0 });

  // const [tolerance, setTolerance] = useState(100); // [0, 255]

  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 });
  const [isSelecting, setIsSelecting] = useState(false);
  const [showSelection, setShowSelection] = useState(false);

  const hoveredColorRGB = `rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`;
  const hoveredColorHSL = `hsl(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%)`;
  const hoveredColorCMYK = `cmyk(${cmykValues.c}, ${cmykValues.m}, ${cmykValues.y}, ${cmykValues.k})`;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // const processImage = useCallback(() => {
  //   console.log('processImage');
  //   if (!imageSrc) return;
  //   const img = originalImage.current!;
  //   const imgData = getImageData(img);
  //   if (!imgData) return;
  //   const newData = adjustLightnessForColor(imgData, rgbColors[color], lightness - 1, tolerance);
  //   const transformedSrc = imageDataToDataUrl(newData, img.naturalWidth, img.naturalHeight);
  //   setTransformedImageSrc(transformedSrc);
  // }, [color, imageSrc, lightness, tolerance]);

  // const processImageFragment = useCallback(() => {
  //   if (isSelecting) return;
  //   if (!originalImage.current || !imageSrc) return;

  //   const img = originalImage.current;
  //   const imgData = getImageData(img);
  //   if (!imgData) return;

  //   const scaleRatio = img.naturalWidth / img.offsetWidth;

  //   const selection = {
  //     startX: Math.round(Math.min(selectionStart.x, selectionEnd.x) * scaleRatio),
  //     startY: Math.round(Math.min(selectionStart.y, selectionEnd.y) * scaleRatio),
  //     endX: Math.round(Math.max(selectionStart.x, selectionEnd.x) * scaleRatio),
  //     endY: Math.round(Math.max(selectionStart.y, selectionEnd.y) * scaleRatio),
  //   };

  //   const newData = adjustFragmentLightnessForColor(
  //     imgData, 
  //     rgbColors[color], 
  //     lightness - 1, 
  //     selection, 
  //     img.naturalWidth, 
  //     tolerance
  //   );
  //   const transformedSrc = imageDataToDataUrl(newData);
  //   setTransformedImageSrc(transformedSrc);
  // }, [
  //   clearImageProcessing, 
  //   color, imageSrc, isSelecting, lightness, tolerance,
  //   selectionEnd.x, selectionEnd.y, selectionStart.x, selectionStart.y
  // ]);

  // useEffect(() => {
  //   if (showSelection) {
  //     processImageFragment();
  //     return;
  //   }
  //   processImage();
  // }, [showSelection, processImage, processImageFragment]);

  useEffect(() => {
    setShowHoverSquare(!showSelection);
  }, [showSelection]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = function (e) {
        const result = String(e.target?.result);
        setImageSrc(result);
        //setTransformedImageSrc(result);
        setShowSelection(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isSelecting) {
      const { offsetX, offsetY } = event.nativeEvent;
      setSelectionEnd({ x: offsetX, y: offsetY });
      return;
    }

    const img = event.target as HTMLImageElement;
    const { offsetX, offsetY } = event.nativeEvent;

    const { data } = getImagePixel(img, offsetX, offsetY)!;

    const [r, g, b] = data;
    setRgbValues({ r, g, b });

    const hsl = rgbToHsl({ r, g, b });
    setHslValues(hsl);
    setCursorPos({ x: event.clientX, y: event.clientY });
  };

  // const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
  //   if (showSelection) {
  //     setShowSelection(false);
  //     return;
  //   }
  //   const { offsetX, offsetY } = event.nativeEvent;
  //   setShowSelection(true);
  //   setSelectionStart({ x: offsetX, y: offsetY });
  //   setSelectionEnd({ x: offsetX, y: offsetY });
  //   setIsSelecting(true);
  // }; 

  // const handleMouseUp = () => {
  //   setIsSelecting(false);
  //   processImageFragment();
  //   // Add logic to process the selected area if needed
  // };

  const getSelectionStyle = () => {
    const width = Math.abs(selectionEnd.x - selectionStart.x);
    const height = Math.abs(selectionEnd.y - selectionStart.y);
    const left = Math.min(selectionEnd.x, selectionStart.x);
    const top = Math.min(selectionEnd.y, selectionStart.y);

    return {
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
      border: showSelection ? '2px dashed red' : 'none',
      position: 'absolute',
      pointerEvents: 'none'
    } as const;
  };

  return (
    <div className="p-8">
      <TabHeader title="Кольори та кольорові схеми 🎨" />
      <div className="flex flex-row py-5 gap-x-34">
        <div className="flex flex-col p-1 gap-3">
          <div className="flex flex-row gap-10">
            <div className="flex flex-row align-center gap-28">
              <div>
                <div className="flex flex-col align-center">
                  <canvas ref={canvasRef} width={500} height={500} />
                  <div style={getSelectionStyle()}></div>
                </div>
              </div>
              <div>
                <div className="flex flex-col align-center">
                  <canvas
                    ref={canvasRef}
                    width={500}
                    height={500}
                    //onMouseDown={handleMouseDown} 
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setShowHoverSquare(true)}
                    onMouseLeave={() => setShowHoverSquare(false)}
                    //onMouseUp={handleMouseUp} 
                  />
                  <div style={getSelectionStyle()}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-5 text-2xl items-center">
            <ControlCard>
              <div className="p-6">
                {hoveredColorHSL}
              </div>
            </ControlCard>
            <ControlCard>
              <div className="p-6">
                {hoveredColorRGB}
              </div>
            </ControlCard>
            <ControlCard>
              <div className="p-6">
                {hoveredColorCMYK}
              </div>
            </ControlCard>
          </div>
        </div>
        <div className="flex flex-col p-1 gap-3">
          <ControlCard>
            <input type="file" accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none', color: "#2c3639" }}
              id="image-upload"
            />
            <label htmlFor="image-upload" className="flex flex-row gap-2 text-2xl">
              <UploadImage />
              Додати картинку
            </label>
          </ControlCard>
          <ControlCard>
            <ProgressBar progressState={[lightness, setLightness]} steps={20} max={2.0} toFixed={1} title="Світота" />
          </ControlCard>
          <ControlCard>
            <ProgressBar progressState={[saturation, setSaturation]} steps={255} max={255} title="Насиченість" />
          </ControlCard>
        </div>
      </div>
      {
        showHoverSquare && (
          <div className="hover-square" style={{
            backgroundColor: hoveredColorRGB,
            left: `${cursorPos.x + 10}px`,
            top: `${cursorPos.y + 10}px`
          }}></div>
        )
      }
    </div>
  );
};

export default ColorsPage;
