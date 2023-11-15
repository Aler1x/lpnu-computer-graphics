import { TabHeader } from "../TabHeader/TabHeader";
import { NewtonFractal} from "./NewtonFractal/NewtonFractal";
import { ChooseFractalButton } from "./ChooseFractalButton/ChooseFractalButton";
import { useState } from "react";
import { ControlCard } from "../../uiKit/ControlCard/ControlCard";
import ProgressBar from "../../uiKit/ProgressBar";
import ChooseColorControl from "../../uiKit/ChooseColorSetting/ChooseColorSetting";
import { VicsekFractal } from "./VicsekFractal/VicsekFractal";

const colors = ["yellow", "green", "blue", "purple", "red", "colorful"] as const;

export const FractalTab = () => {
  const [currentFractalIndex, setCurrentFractalIndex] = useState(0); // 1/2
  const [iterations, setIterations] = useState(1); // 1-100
  const [colorIndex, setColorIndex] = useState(0); // 0-4

  return (
    <div className="p-8">
      <TabHeader title="Фрактали 🌀" subtitle="Фрактал Ньютона" />
      <div className="flex flex-row py-5 gap-x-34">
        {currentFractalIndex === 0 ? (
          <NewtonFractal hueColor={colors[colorIndex]} />
        ) : (
          <VicsekFractal iterations={iterations} />
        )}
        <div className="flex flex-col p-3 gap-3">
          <ChooseFractalButton currentFractalIndex={currentFractalIndex} setCurrentFractalIndex={setCurrentFractalIndex} />
          <ControlCard>
            <ProgressBar progressState={[iterations, setIterations]} title="Ітерації" />
          </ControlCard>
          <ChooseColorControl colors={[...colors]} setColorIndex={setColorIndex} colorIndex={colorIndex} />
        </div>
      </div>
    </div>
  );
};
