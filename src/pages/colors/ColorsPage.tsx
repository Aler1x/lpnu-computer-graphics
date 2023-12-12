import { useEffect, useRef, useState } from "react";
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
  setImagePixel,
  // imageDataToDataUrl
} from "../../utils/colors";
import ControlCard from "../../components/ControlCard/ControlCard";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { UploadImage } from "../../icons/UploadImage";
import "./ColorsPage.css";

// TODO - slider for saturation must make changes to image
// TODO - slider for lightness must make changes to image

const ColorsPage = () => {
  const cmykSelectionParent = useRef<HTMLDivElement>(null);
  const hslSelectionParent = useRef<HTMLDivElement>(null);

  const cmykImage = useRef<HTMLImageElement>(null);
  const hslImage = useRef<HTMLImageElement>(null);

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
  const [cmykValues, setCmykValues] = useState<CMYKPoint>({
    c: 0,
    m: 0,
    y: 0,
    k: 0,
  });

  const [cmykSelectionStart, setCmykSelectionStart] = useState({ x: 0, y: 0 });
  const [cmykSelectionEnd, setCmykSelectionEnd] = useState({ x: 0, y: 0 });
  const [cmykIsSelecting, setCmykIsSelecting] = useState(false);
  const [cmykShowSelection, setCmykShowSelection] = useState(false);

  const [hslSelectionStart, setHslSelectionStart] = useState({ x: 0, y: 0 });
  const [hslSelectionEnd, setHslSelectionEnd] = useState({ x: 0, y: 0 });
  const [hslIsSelecting, setHslIsSelecting] = useState(false);
  const [hslShowSelection, setHslShowSelection] = useState(false);

  const hoveredColorRGB = `rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`;
  const hoveredColorHSL = `hsl(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%)`;
  const hoveredColorCMYK = `cmyk(
                            ${cmykValues.c.toFixed(2)}, 
                            ${cmykValues.m.toFixed(2)}, 
                            ${cmykValues.y.toFixed(2)}, 
                            ${cmykValues.k.toFixed(2)})`;

  useEffect(() => {
    setShowHoverSquare(!cmykShowSelection);
  }, [cmykShowSelection]);

  useEffect(() => {
    setShowHoverSquare(!hslShowSelection);
  }, [hslShowSelection]);

  useEffect(() => {
    console.log("saturation changed");
  }, [saturation]);

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
        setCmykShowSelection(false);
        setHslShowSelection(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLImageElement>,
    isCmykImage: boolean
  ) => {
    if (isCmykImage) {
      // CMYK image selection
      if (cmykIsSelecting) {
        const { offsetX, offsetY } = event.nativeEvent;
        setCmykSelectionEnd({ x: offsetX, y: offsetY });
      }
    } else {
      // HSL image selection
      if (hslIsSelecting) {
        const { offsetX, offsetY } = event.nativeEvent;
        setHslSelectionEnd({ x: offsetX, y: offsetY });
      }
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

  const handleMouseDown = (
    event: React.MouseEvent<HTMLImageElement>,
    isCmykImage: boolean
  ) => {
    const { offsetX, offsetY } = event.nativeEvent;
    if (!isCmykImage && hslShowSelection) {
      setHslShowSelection(false);
      return;
    }
    if (isCmykImage && cmykShowSelection) {
      setCmykShowSelection(false);
      return;
    }
    if (isCmykImage) {
      setCmykShowSelection(true);
      setCmykSelectionStart({ x: offsetX, y: offsetY });
      setCmykSelectionEnd({ x: offsetX, y: offsetY });
      setCmykIsSelecting(true);
    } else {
      setHslShowSelection(true);
      setHslSelectionStart({ x: offsetX, y: offsetY });
      setHslSelectionEnd({ x: offsetX, y: offsetY });
      setHslIsSelecting(true);
    }
  };

  const handleMouseUp = (isCmykImage: boolean) => {
    if (isCmykImage) {
      setCmykIsSelecting(false);
    } else {
      setHslIsSelecting(false);
    }
  };

  const getCMYKSelectionStyle = () => {
    const width = Math.abs(cmykSelectionEnd.x - cmykSelectionStart.x);
    const height = Math.abs(cmykSelectionEnd.y - cmykSelectionStart.y);
    const left = Math.min(cmykSelectionEnd.x, cmykSelectionStart.x);
    const top = Math.min(cmykSelectionEnd.y, cmykSelectionStart.y);
    const parent = cmykSelectionParent?.current?.getBoundingClientRect();
    return {
      left: `${left + (parent ? parent.left : 0)}px`,
      top: `${top + (parent ? parent.top : 0)}px`,
      width: `${width}px`,
      height: `${height}px`,
      border: cmykShowSelection ? "5px dashed red" : "none",
      position: "absolute",
      pointerEvents: "none",
    } as const;
  };

  const getHSLSelectionStyle = () => {
    const width = Math.abs(hslSelectionEnd.x - hslSelectionStart.x);
    const height = Math.abs(hslSelectionEnd.y - hslSelectionStart.y);
    const left = Math.min(hslSelectionEnd.x, hslSelectionStart.x);
    const top = Math.min(hslSelectionEnd.y, hslSelectionStart.y);
    const parent = hslSelectionParent?.current?.getBoundingClientRect();
    return {
      left: `${left + (parent ? parent.left : 0)}px`,
      top: `${top + (parent ? parent.top : 0)}px`,
      width: `${width}px`,
      height: `${height}px`,
      border: hslShowSelection ? "5px dashed red" : "none",
      position: "absolute",
      pointerEvents: "none",
    } as const;
  };

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
                  <div ref={cmykSelectionParent}>
                    <img
                      ref={cmykImage}
                      src={cmykImageSrc ?? ""}
                      alt="cmyk image"
                      width={500}
                      height={500}
                      onMouseDown={(e) => handleMouseDown(e, true)}
                      onMouseMove={(e) => handleMouseMove(e, true)}
                      onMouseEnter={() => setShowHoverSquare(true)}
                      onMouseLeave={() => setShowHoverSquare(false)}
                      onMouseUp={() => handleMouseUp(true)}
                      draggable={false}
                    />
                  </div>
                </div>
                <div id="cmykselection" style={getCMYKSelectionStyle()}></div>
              </div>
              <div>
                <div className="flex flex-col align-center">
                  {fileName ? "HSL image" : "No image selected"}
                  <div ref={hslSelectionParent}>
                    <img
                      ref={hslImage}
                      src={hslImageSrc ?? ""}
                      alt="hsl image"
                      width={500}
                      height={500}
                      onMouseDown={(e) => handleMouseDown(e, false)}
                      onMouseMove={(e) => handleMouseMove(e, false)}
                      onMouseEnter={() => setShowHoverSquare(true)}
                      onMouseLeave={() => setShowHoverSquare(false)}
                      onMouseUp={() => handleMouseUp(false)}
                      draggable={false}
                    />
                  </div>
                </div>
                <div id="hslselection" style={getHSLSelectionStyle()}></div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-5 text-2xl items-center">
            {imageSrc ? (
              <>
                <ControlCard>
                  <div className="p-4">{hoveredColorHSL}</div>
                </ControlCard>
                <ControlCard>
                  <div className="p-4">{hoveredColorRGB}</div>
                </ControlCard>
                <ControlCard>
                  <div className="px-4 py-2">{hoveredColorCMYK}</div>
                </ControlCard>
              </>
            ) : (
              <div className="flex w-full justify-center items-center">
                <p className="text-center">Select image to manipulate colors</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col p-1 gap-3">
          <ControlCard>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none", color: "#2c3639" }}
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex flex-row gap-2 text-2xl"
            >
              <UploadImage />
              Додати картинку
            </label>
          </ControlCard>
          <ControlCard>
            <ProgressBar
              progressState={[lightness, setLightness]}
              steps={20}
              max={2.0}
              toFixed={1}
              title="Світота"
            />
          </ControlCard>
          <ControlCard>
            <ProgressBar
              progressState={[saturation, setSaturation]}
              steps={255}
              max={255}
              title="Насиченість"
            />
          </ControlCard>
        </div>
      </div>
      {showHoverSquare && (
        <div
          className="hover-square"
          style={{
            backgroundColor: hoveredColorRGB,
            left: `${cursorPos.x + 10}px`,
            top: `${cursorPos.y + 10}px`,
          }}
        ></div>
      )}
    </div>
  );
};

export default ColorsPage;
