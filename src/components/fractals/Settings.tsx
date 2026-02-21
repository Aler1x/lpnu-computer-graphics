import { type MouseEvent, useState } from "react";
import FunctionIcon from "@/assets/icons/function.svg?react";
import LeftButton from "@/assets/icons/left-chevron.svg?react";
import RightButton from "@/assets/icons/right-chevron.svg?react";
import ControlCard from "@/components/ControlCard";
import ProgressBar from "@/components/ProgressBar";

const COLORS_PER_ROW = 5;

const ColorTile = ({
  color,
  selected,
  ...props
}: {
  color: string;
  selected: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  let backgroundColor = color;
  if (color === "colorful") {
    backgroundColor =
      "linear-gradient(45deg, firebrick, goldenrod, seagreen, darkblue)";
  }
  return (
    <button
      {...props}
      className={`w-8 h-8 rounded-[.5rem] border-none m-1 ${selected ? "border-4 border-[#dcd7c9] border-solid" : ""
        }`}
      style={{ background: backgroundColor, borderStyle: "solid" }}
    />
  );
};

type FractalSettingsProps = {
  currentFractalIndex: number;
  setCurrentFractalIndex: React.Dispatch<React.SetStateAction<number>>;
  iterations: number;
  setIterations: (value: number | ((prev: number) => number)) => void;
  steps: number;
  max: number;
  colorIndex: number;
  setColorIndex: React.Dispatch<React.SetStateAction<number>>;
  colors: readonly string[];
};

const FractalSettings = ({
  currentFractalIndex,
  setCurrentFractalIndex,
  iterations,
  setIterations,
  steps,
  max,
  colorIndex,
  setColorIndex,
  colors,
}: FractalSettingsProps) => {
  const [colorPosition, setColorPosition] = useState(0);

  const handleFractalLeft = () => {
    setCurrentFractalIndex((prev) => (prev === 0 ? 1 : prev - 1));
  };
  const handleFractalRight = () => {
    setCurrentFractalIndex((prev) => (prev === 1 ? 0 : prev + 1));
  };
  const currentFractalName =
    currentFractalIndex === 0 ? "Фрактал Ньютона" : "Фрактал Вічека";

  const handleColorClick = (e: MouseEvent, index: number) => {
    e.stopPropagation();
    if (index === -1) {
      setColorPosition(0);
    } else {
      setColorIndex(index);
      setColorPosition(0);
    }
  };

  const colorSlice = colors.slice(
    colorPosition * COLORS_PER_ROW,
    colorPosition * COLORS_PER_ROW + COLORS_PER_ROW
  );

  return (
    <div className="flex flex-col gap-4">
      <ControlCard className="flex flex-row justify-center items-center gap-2.5">
        <FunctionIcon className="w-8 h-8" />
        <div className="flex flex-row justify-between items-center gap-2">
          <LeftButton
            className="hover:cursor-pointer size-4"
            onClick={handleFractalLeft}
          />
          <p className="text-sm">{currentFractalName}</p>
          <RightButton
            className="hover:cursor-pointer size-4"
            onClick={handleFractalRight}
          />
        </div>
      </ControlCard>
      <ControlCard>
        <ProgressBar
          progressState={[iterations, setIterations]}
          steps={steps}
          max={max}
          toFixed={0}
          title="Ітерації"
        />
      </ControlCard>
      <ControlCard>
        <div className="h-full flex items-center justify-center gap-2">
          {colorSlice.map((color, i) => (
            <ColorTile
              key={colorPosition * COLORS_PER_ROW + i}
              color={color}
              selected={colorPosition * COLORS_PER_ROW + i === colorIndex}
              onClick={(e) =>
                handleColorClick(e, colorPosition * COLORS_PER_ROW + i)
              }
            />
          ))}
        </div>
      </ControlCard>
    </div>
  );
};

export default FractalSettings;
