import { Formula } from "../../../../constants/Formulas";
import { LeftButton } from "../../../uiKit/LeftButton/LeftButton";
import { RightButton } from "../../../uiKit/RightButton/RightButton";
import { FunctionIcon } from "../../../uiKit/FunctionIcon";
import "./ChooseFractalButton.css";

type ChooseFractalButtonProps = {
  currentFractalIndex: number;
  setCurrentFractalIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const ChooseFractalButton = ({ currentFractalIndex, setCurrentFractalIndex }: ChooseFractalButtonProps) => {
  const formulas = Object.values(Formula);

  const handleLeftClick = () => {
    setCurrentFractalIndex((prevIndex) =>
      prevIndex === 0 ? formulas.length - 1 : prevIndex - 1
    );
  };

  const handleRightClick = () => {
    setCurrentFractalIndex((prevIndex) =>
      prevIndex === formulas.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentFractal = formulas[currentFractalIndex];

  return (
    <div className="fractal-button-container">
      <FunctionIcon />
      <div className="flex flex-row justify-between items-center gap-4">
        <LeftButton onClick={handleLeftClick} />
        <p className="fractal-button-text">{currentFractal}</p>
        <RightButton onClick={handleRightClick} />
      </div>
    </div>
  );
};
