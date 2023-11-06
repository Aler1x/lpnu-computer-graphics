import { TabHeader } from "../TabHeader/TabHeader";
import { FractalView } from "./FractalView/FractalView";
import { SideControls } from "./SideControls/SideControls";

export const FractalTab = () => {
  return (
    <div className="p-8">
      <TabHeader title="Фрактали 🌀" subtitle="Фрактал Ньютона" />
      <div className="flex flex-row py-5 gap-x-34">
        <FractalView />
        <SideControls />
      </div>
    </div>
  );
};
