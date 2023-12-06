import { TabHeader } from "../TabHeader/TabHeader";
import { NewtonFractal} from "./NewtonFractal/NewtonFractal";
import { ChooseFractalButton } from "./ChooseFractalButton/ChooseFractalButton";
import { useEffect, useState } from "react";
import { ControlCard } from "../../uiKit/ControlCard/ControlCard";
import ProgressBar from "../../uiKit/ProgressBar";
import ChooseColorControl from "../../uiKit/ChooseColorSetting/ChooseColorSetting";
import { VicsekFractal } from "./VicsekFractal/VicsekFractal";

const colors = ["yellow", "green", "blue", "purple", "red"] as const;

export const FractalTab = () => {
  const [currentFractalIndex, setCurrentFractalIndex] = useState(0); // 1/2
  const [iterations, setIterations] = useState(1); // 1-100
  const [colorIndex, setColorIndex] = useState(0); // 0-4
  const [currentFractalName, setCurrentFractalName] = useState("Фрактал Ньютона");
  const [steps, setSteps] = useState(10);
  const [max, setMax] = useState(10);

  useEffect(() => {
    setCurrentFractalName(currentFractalIndex === 0 ? "Фрактал Ньютона" : "Фрактал Вічека");
    setSteps(currentFractalIndex === 0 ? 20 : 10);
    setMax(currentFractalIndex === 0 ? 100 : 10);
    setIterations(currentFractalIndex === 0 ? 50 : 5);
  }, [currentFractalIndex]);

  return (
    <div className="p-8">
      <TabHeader title="Фрактали 🌀" subtitle={currentFractalName} />
      <div className="flex flex-row py-5 gap-x-34">
        {currentFractalIndex === 0 ? (
          <NewtonFractal iterations={iterations} hueColor={colors[colorIndex]} />
        ) : (
          <VicsekFractal iterations={iterations} color={colors[colorIndex]}/>
        )}
        <div className="flex flex-col p-3 gap-3">
          <ChooseFractalButton currentFractalIndex={currentFractalIndex} setCurrentFractalIndex={setCurrentFractalIndex} />
          <ControlCard>
            <ProgressBar progressState={[iterations, setIterations]} steps={steps} max={max} title="Ітерації" />
          </ControlCard>
          <ChooseColorControl colors={[...colors]} setColorIndex={setColorIndex} colorIndex={colorIndex} />
        </div>
      </div>
    </div>
  );
};
