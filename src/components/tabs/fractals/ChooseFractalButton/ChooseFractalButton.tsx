import { useState } from "react";
import { Formula } from "../../../../constants/Formulas";
import "./ChooseFractalButton.css";
import { LeftButton } from "./LeftButton/LeftButton";
import { RightButton } from "./RightButton/RightButton";
import { FunctionIcon } from "../../../uiKit/FunctionIcon";

export const ChooseFractalButton = () => {
  const formulas = Object.values(Formula);
  const [currentFractalIndex, setCurrentFractalIndex] = useState(0);

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
