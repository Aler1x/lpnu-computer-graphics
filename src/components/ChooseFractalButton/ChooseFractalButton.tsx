
import { FunctionIcon } from "../../icons/FunctionIcon";
import { LeftButton } from "../../icons/LeftButton";
import { RightButton } from "../../icons/RightButton";
import "./ChooseFractalButton.css";

type ChooseFractalButtonProps = {
  currentFractalIndex: number;
  setCurrentFractalIndex: React.Dispatch<React.SetStateAction<number>>;
};

const ChooseFractalButton = ({ currentFractalIndex, setCurrentFractalIndex }: ChooseFractalButtonProps) => {

  const handleLeftClick = () => {
    setCurrentFractalIndex((prevIndex) =>
      prevIndex === 0 ? 1 : prevIndex - 1
    );
  };

  const handleRightClick = () => {
    setCurrentFractalIndex((prevIndex) =>
      prevIndex === 1 ? 0 : prevIndex + 1
    );
  };

  const currentFractal = currentFractalIndex === 0 ? "Фрактал Ньютона" : "Фрактал Вічека";

  return (
    <div className="fractal-button-container">
      <FunctionIcon />
      <div className="flex flex-row justify-between items-center gap-4">
        <LeftButton onClick={handleLeftClick} style="hover:cursor-pointer" />
        <p className="fractal-button-text">{currentFractal}</p>
        <RightButton onClick={handleRightClick} style="hover:cursor-pointer" />
      </div>
    </div>
  );
};

export default ChooseFractalButton;
