import { useEffect, useRef, useState } from "react";
import TabHeader from "../../components/TabHeader/TabHeader";
import {
  RGBPoint,
  HSLPoint,
  CMYKPoint,
  rgbToCmyk,
  rgbToHsl,
  getImagePixel,
  adjustForColor,
  adjustForColorSelection
} from "../../utils/colors";
import ControlCard from "../../components/ControlCard/ControlCard";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { UploadImage } from "../../icons/UploadImage";
import "./ColorsPage.css";

const ColorsPage = () => {
  const originSelectionParent = useRef<HTMLDivElement>(null);

  const originCanvas = useRef<HTMLCanvasElement>(null);
  const editingCanvas = useRef<HTMLCanvasElement>(null);

  const [lightness, setLightness] = useState(1.0); // [0.0] - [2.0]
  const [saturation, setSaturation] = useState(1.0); // [0.0] - [2.0]
  const [showHoverSquare, setShowHoverSquare] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const [fileName, setFileName] = useState<string | null>();
  const [imageSrc, setImageSrc] = useState<string | null>();
  const [originImage, setOriginImage] = useState<string | null>();
  const [editingImage, setEditingImage] = useState<string | null>();

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

  const hoveredColorRGB = `rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`;
  const hoveredColorHSL = `hsl(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%)`;
  const hoveredColorCMYK = `cmyk(
                            ${cmykValues.c.toFixed(2)}, 
                            ${cmykValues.m.toFixed(2)}, 
                            ${cmykValues.y.toFixed(2)}, 
                            ${cmykValues.k.toFixed(2)})`;

  const loadImage = (imagePath: string, canvas: HTMLCanvasElement) => {
    const ctx = canvas?.getContext("2d");

    if (!ctx) {
      console.error("Unable to get 2D context from canvas.");
      return;
    }

    const image = new Image();

    image.onload = () => {
      if (canvas) {
        // not make canvas size of image because it broke site
        // canvas.width = image.width;
        // canvas.height = image.height;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
    };
    image.src = imagePath;
  };

  useEffect(() => {
    if (showSelection && editingCanvas.current && originCanvas.current) {
      adjustForColorSelection(originCanvas.current, editingCanvas.current, lightness-1, saturation-1, selectionStart, selectionEnd);
    } else if (editingCanvas.current && originCanvas.current) {
      adjustForColor(originCanvas.current, editingCanvas.current, lightness-1, saturation-1);
    }
  }, [lightness, saturation, selectionEnd, selectionStart, showSelection]);

  useEffect(() => {
    if (showSelection && editingCanvas.current && originCanvas.current) {
      adjustForColorSelection(originCanvas.current, editingCanvas.current, lightness-1, saturation-1, selectionStart, selectionEnd);
    } else if (editingCanvas.current && originCanvas.current) {
      adjustForColor(originCanvas.current, editingCanvas.current, lightness-1, saturation-1);
    }
  }, [lightness, saturation, selectionEnd, selectionStart, showSelection]);

  useEffect(() => {
    // load images
    originImage &&
      originCanvas.current &&
      loadImage(originImage, originCanvas.current);
    editingImage &&
      editingCanvas.current &&
      loadImage(editingImage, editingCanvas.current);
  }, [originImage, editingImage]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = function (e) {
        const result = String(e.target?.result);
        setImageSrc(result);
        setOriginImage(result);
        setEditingImage(result);
        setShowSelection(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) => {
    if (isSelecting) {
      const { offsetX, offsetY } = event.nativeEvent;
      setSelectionEnd({ x: offsetX, y: offsetY });
    }

    const img = event.target as HTMLCanvasElement;
    const { offsetX, offsetY } = event.nativeEvent;
    const { data } = getImagePixel(img, offsetX, offsetY)!;
    const [r, g, b] = data;

    setRgbValues({ r, g, b });
    setHslValues(rgbToHsl({ r, g, b }));
    setCmykValues(rgbToCmyk({ r, g, b }));

    setCursorPos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) => {
    const { offsetX, offsetY } = event.nativeEvent;

    if(showSelection) {
      setShowSelection(false);
    }
      setShowSelection(true);
      setSelectionStart({ x: offsetX, y: offsetY });
      setSelectionEnd({ x: offsetX, y: offsetY });
      setIsSelecting(true);
      return;
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  const getSelectionStyle = () => {
    const width = Math.abs(selectionEnd.x - selectionStart.x);
    const height = Math.abs(selectionEnd.y - selectionStart.y);
    const left = Math.min(selectionEnd.x, selectionStart.x);
    const top = Math.min(selectionEnd.y, selectionStart.y);
    const parent = originSelectionParent?.current?.getBoundingClientRect();
    return {
      left: `${left + (parent ? parent.left : 0)}px`,
      top: `${top + (parent ? parent.top : 0)}px`,
      width: `${width}px`,
      height: `${height}px`,
      border: showSelection ? "5px dashed red" : "none",
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
                  {fileName ? "Origin image" : "No image selected"}
                  <div ref={originSelectionParent}>
                    <canvas
                      ref={originCanvas}
                      width={500}
                      height={500}
                      onMouseDown={(e) => handleMouseDown(e)}
                      onMouseMove={(e) => handleMouseMove(e)}
                      onMouseEnter={() => setShowHoverSquare(originImage ? true : false)}
                      onMouseLeave={() => setShowHoverSquare(false)}
                      onMouseUp={() => handleMouseUp()}
                      draggable={false}
                    />
                  </div>
                </div>
                <div id="cmykselection" style={getSelectionStyle()}></div>
              </div>
              <div>
                <div className="flex flex-col align-center">
                  {fileName ? "Edited image" : "No image selected"}
                  <div>
                    <canvas
                      ref={editingCanvas}
                      width={500}
                      height={500}
                      onMouseMove={(e) => handleMouseMove(e)}
                      onMouseEnter={() => setShowHoverSquare(originImage ? true : false)}
                      onMouseLeave={() => setShowHoverSquare(false)}
                      draggable={false}
                    />
                  </div>
                </div>
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
              steps={40}
              max={2}
              toFixed={2}
              title="Світота"
            />
          </ControlCard>
          <ControlCard>
            <ProgressBar
              progressState={[saturation, setSaturation]}
              steps={40}
              max={2}
              toFixed={2}
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
