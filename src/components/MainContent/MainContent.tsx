import { Page } from "../../constants/Pages";
import { FractalTab } from "../tabs/fractals/FractalTab";

interface MainContentProps {
  page: Page;
}

export const MainContent = ({ page }: MainContentProps) => {
  const getTab = (page: Page) => {
    switch (page) {
      case Page.FRACTALS:
        return <FractalTab />;
      default:
        return <div>{page}</div>;
    }
  };

  return <div className="w-full">{getTab(page)}</div>;
};
