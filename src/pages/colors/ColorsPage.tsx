import { useRef, useState } from "react";
import TabHeader from "../../components/TabHeader/TabHeader"; 
// import {
//   RGBPoint,
//   HSLPoint,
//   CMYKPoint,
//   hslToCmyk,
//   hslToRgb,
//   rgbToCmyk,
//   rgbToHsl,
//   cmykToRgb,
//   cmykToHsl
// } from "./utils/color";
import ControlCard from "../../components/ControlCard/ControlCard";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const ColorsPage = () => {
  const [lightness, setLightness] = useState(1); // [0.1] - [2.0]
  const [saturation, setSaturation] = useState(0); // 0 - 255
  const [showHoverSquare, setShowHoverSquare] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const hoveredColor = `hsl(0, ${saturation}%, ${lightness * 100}%)`;

  return (
    <div className="p-8">
      <TabHeader title="Кольори та кольорові схеми 🎨" />
      <div className="flex flex-row py-5 gap-x-34">
        <div className="flex flex-row gap-10">
          <div className="flex flex-row align-center gap-28">
            <div>
              <div className="flex flex-col align-center">
                <canvas ref={canvasRef} width={500} height={500} />
              </div>
            </div>
            <div>
              <div className="flex flex-col align-center">
                <canvas ref={canvasRef} width={500} height={500} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-3 gap-3">
          <ControlCard>
            <input type="file" accept="image/*"
              // onChange={handleImageUpload}
              style={{ display: 'none', color: "#2c3639" }}
              id="image-upload"
            />
            <label htmlFor="image-upload" className="upload">
              {/* <UploadIcon /> */}
              Upload Image
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
            backgroundColor: hoveredColor,
            left: `${cursorPos.x + 10}px`,
            top: `${cursorPos.y + 10}px`
          }}></div>
        )
      }
    </div>
  );
};

export default ColorsPage;
