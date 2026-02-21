import "./SidebarElement.css";
import {
  MainIcon,
  FractalIcon,
  ColorsIcon,
  ShapesIcon,
  HelpIcon,
} from "../../../icons/ElementIconConstants";

interface SidebarElementProps {
  icon: number;
  active?: boolean;
  onClick: (icon: number) => void;
  isFirstElement?: boolean;
}

export const SidebarElement = ({
  icon,
  active,
  onClick,
  isFirstElement = false,
}: SidebarElementProps) => {
  const icons = [MainIcon, FractalIcon, ColorsIcon, ShapesIcon, HelpIcon];

  const handleClick = () => {
    if (active) return;
    onClick(icon);
  };

  return (
    <li className="hover:cursor-pointer">
      <a
        className={`flex items-center p-2 rounded-lg group ${
          active && (isFirstElement ? "selected-first-element" : "selected")
        }`}
        onClick={handleClick}
      >
        {icons[icon]()}
      </a>
    </li>
  );
};
