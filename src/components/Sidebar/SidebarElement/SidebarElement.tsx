import ElementIcon from "./ElementIcon/ElementIcon";
import { Page } from "../../../constants/Pages";

import "./SidebarElement.css";

interface SidebarElementProps {
  element: Page;
  active?: boolean;
  onClick?: () => void;
  isFirstElement?: boolean;
}

export const SidebarElement = ({
  element,
  active,
  onClick,
  isFirstElement = false,
}: SidebarElementProps) => {
  return (
    <li>
      <a
        href="#"
        className={`flex items-center p-2 rounded-lg group ${
          active && (isFirstElement ? "selected-first-element" : "selected")
        }`}
        onClick={onClick}
      >
        <ElementIcon elementName={element} isFirstElement={isFirstElement} />
      </a>
    </li>
  );
};
