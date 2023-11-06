import button_mockup from "../../../../assets/buttons_mockup.png";
import { ChooseFractalButton } from "../ChooseFractalButton/ChooseFractalButton";

import "./SideControls.css";

export const SideControls = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <ChooseFractalButton />
      <img src={button_mockup} className="mockup-buttons"></img>
    </div>
  );
};
