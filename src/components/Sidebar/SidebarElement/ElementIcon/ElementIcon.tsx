import { ElementIcons } from "./ElementIconConstants";
import { Page } from "../../../../constants/Pages";

interface ElementIconProps {
  elementName: Page;
  isFirstElement?: boolean;
}

const ElementIcon = ({ elementName }: ElementIconProps) => {
  const selectedIcon = ElementIcons[elementName];

  if (!selectedIcon) {
    console.log(`unknown element icon selected: ${elementName}`);
    return null;
  }

  return <div>{selectedIcon}</div>;
};

export default ElementIcon;
