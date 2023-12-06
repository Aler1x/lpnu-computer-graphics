import { useState } from "react";
import { ControlCard } from "../../uiKit/ControlCard/ControlCard";
import ProgressBar from "../../uiKit/ProgressBar";
import { TabHeader } from "../TabHeader/TabHeader";

export const ColorsTab = () => {
  const [lightness, setLightness] = useState(1); // [0.1] - [2.0]
  const [saturation, setSaturation] = useState(0); // 0 - 255
  const [showHoverSquare, setShowHoverSquare] = useState(false);

  const hoveredColor = `hsl(0, ${saturation}%, ${lightness * 100}%)`;

  return (
    <div className="p-8">
      <TabHeader title="Кольори та кольорові схеми 🎨" />
      <div className="flex flex-row py-5 gap-x-34">
        <div className="flex flex-row gap-10">
        <div>HERE IS YOUR FUCKING CMYK IMAGE</div>
        <div>HERE IS YOUR FUCKING HSL IMAGE</div>
        </div>
        <div className="flex flex-col p-3 gap-3">
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