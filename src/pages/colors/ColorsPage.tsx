import { useEffect, useState } from "react";
import TabHeader from "../../components/TabHeader/TabHeader";
import {
  RGBPoint,
  HSLPoint,
  CMYKPoint,
  // hslToCmyk,
  // hslToRgb,
  rgbToCmyk,
  rgbToHsl,
  // cmykToRgb,
  // cmykToHsl,
  getImagePixel,
  // imageDataToDataUrl
} from "../../utils/colors";
import ControlCard from "../../components/ControlCard/ControlCard";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { UploadImage } from "../../icons/UploadImage";
import "./ColorsPage.css";

// TODO - fix selection on image
// TODO - slider for saturation must make changes to image
// TODO - slider for lightness must make changes to image
// TODO - fix css for buttons

const ColorsPage = () => {
  const [lightness, setLightness] = useState(1); // [0.1] - [2.0]
  const [saturation, setSaturation] = useState(0); // 0 - 255
  const [showHoverSquare, setShowHoverSquare] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const [fileName, setFileName] = useState<string | null>();
  const [imageSrc, setImageSrc] = useState<string | null>();
  const [cmykImageSrc, setCmykImageSrc] = useState<string | null>();
  const [hslImageSrc, setHslImageSrc] = useState<string | null>();

  const [rgbValues, setRgbValues] = useState<RGBPoint>({ r: 0, g: 0, b: 0 });
  const [hslValues, setHslValues] = useState<HSLPoint>({ h: 0, s: 0, l: 0 });
  const [cmykValues, setCmykValues] = useState<CMYKPoint>({ c: 0, m: 0, y: 0, k: 0 });

  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 });
  const [isSelecting, setIsSelecting] = useState(false);
  const [showSelection, setShowSelection] = useState(false);

  const hoveredColorRGB = `rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`;
  const hoveredColorHSL = `hsl(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%)`;
  const hoveredColorCMYK = `cmyk(
                            ${cmykValues.c.toFixed(2)}, 
                            ${cmykValues.m.toFixed(2)}, 
                            ${cmykValues.y.toFixed(2)}, 
                            ${cmykValues.k.toFixed(2)})`;

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
        setCmykImageSrc(result);
        setHslImageSrc(result);
        setShowSelection(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
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
    setHslValues(rgbToHsl({ r, g, b }));
    setCmykValues(rgbToCmyk({ r, g, b }));

    setCursorPos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
    if (showSelection) {
      setShowSelection(false);
      return;
    }
    const { offsetX, offsetY } = event.nativeEvent;
    setShowSelection(true);
    setSelectionStart({ x: offsetX, y: offsetY });
    setSelectionEnd({ x: offsetX, y: offsetY });
    setIsSelecting(true);
  }; 

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  const getCMYKSelectionStyle = () => {
    const width = Math.abs(selectionEnd.x - selectionStart.x);
    const height = Math.abs(selectionEnd.y - selectionStart.y);
    const left = Math.min(selectionEnd.x, selectionStart.x);
    const top = Math.min(selectionEnd.y, selectionStart.y);

    return {
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
      border: showSelection ? '5px dashed red' : 'none',
      position: 'absolute',
      pointerEvents: 'none'
    } as const;
  };

  const getHSLSelectionStyle = () => {
    const width = Math.abs(selectionEnd.x - selectionStart.x);
    const height = Math.abs(selectionEnd.y - selectionStart.y);
    const left = Math.min(selectionEnd.x, selectionStart.x);
    const top = Math.min(selectionEnd.y, selectionStart.y);

    return {
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
      border: showSelection ? '5px dashed red' : 'none',
      position: 'absolute',
      pointerEvents: 'none'
    } as const;
  };

  if(!imageSrc) {
    console.log("No image selected");
  } 

  return (
    <div className="p-8">
      <TabHeader title="Кольори та кольорові схеми 🎨" />
      <div className="flex flex-row py-5 gap-x-34">
        <div className="flex flex-col p-1 gap-3">
          <div className="flex flex-row gap-10">
            <div className="flex flex-row gap-28">
              <div>
                <div className="flex flex-col align-center">
                {fileName ? "CMYK image" : "No image selected"}
                  <img 
                    src={cmykImageSrc ?? ""}
                    alt="cmyk image"
                    width={500} 
                    height={500}
                    onMouseDown={handleMouseDown} 
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setShowHoverSquare(true)}
                    onMouseLeave={() => setShowHoverSquare(false)}
                    onMouseUp={handleMouseUp}  
                    draggable={false}
                  />
                </div>
                <div style={getCMYKSelectionStyle()}></div>
              </div>
              <div>
                <div className="flex flex-col align-center">
                {fileName ? "HSL image" : "No image selected"}
                  <img
                    src={hslImageSrc ?? ""}
                    alt="hsl image"
                    width={500}
                    height={500}
                    onMouseDown={handleMouseDown} 
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setShowHoverSquare(true)}
                    onMouseLeave={() => setShowHoverSquare(false)}
                    onMouseUp={handleMouseUp} 
                    draggable={false}
                  />
                  <div style={getHSLSelectionStyle()}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-5 text-2xl items-center">
            <ControlCard>
              <div className="p-4">
                {hoveredColorHSL}
              </div>
            </ControlCard>
            <ControlCard>
              <div className="p-4">
                {hoveredColorRGB}
              </div>  
            </ControlCard>
            <ControlCard>
              <div className="px-4 py-2">
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
