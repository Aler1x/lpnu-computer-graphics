import { Page } from "../../constants/Pages";
import { FractalTab } from "../tabs/fractals/FractalTab";
import { ColorsTab } from "../tabs/colors/ColorsTab";

interface MainContentProps {
  page: Page;
}

export const MainContent = ({ page }: MainContentProps) => {
  const getTab = (page: Page) => {
    switch (page) {
      case Page.FRACTALS:
        return <FractalTab />;
      case Page.COLORS:
        return <ColorsTab />;
      default:
        return <div className="flex justify-center">Not implemented yet</div>;
    }
  };

  return <div className="w-full">{getTab(page)}</div>;
};
