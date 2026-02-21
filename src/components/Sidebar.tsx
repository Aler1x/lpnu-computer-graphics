import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HelpModal from "@/components/HelpModal";

import FractalIcon from "@/assets/icons/sidebar/fractal.svg?react";
import ColorsIcon from "@/assets/icons/sidebar/colors.svg?react";
import ShapesIcon from "@/assets/icons/sidebar/shapes.svg?react";
import HelpIcon from "@/assets/icons/help.svg?react";

interface SidebarElementProps {
  icon: number;
  route: string;
  onClick: () => void;
}

const ACTIVE_BG = "bg-[#7f765e]";

export const SidebarElement = ({
  icon,
  route,
  onClick,
}: SidebarElementProps) => {
  const currentPath = useLocation().pathname;
  const isOnRoute = currentPath === route;

  return (
    <li className="hover:cursor-pointer">
      <button
        className={`flex items-center justify-center size-14 rounded-lg group ${isOnRoute ? ACTIVE_BG : ""}`}
        onClick={onClick}
      >
        {icon === 0 && <FractalIcon />}
        {icon === 1 && <ColorsIcon />}
        {icon === 2 && <ShapesIcon />}
        {icon === 3 && <HelpIcon />}
      </button>
    </li>
  );
};

export const Sidebar = () => {
  const navigate = useNavigate();

  const pages = ["Fractals", "Colors", "Shapes"];

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onHelpClick = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="flex h-full">
        <aside className="top-0 left-0 z-40 h-full transition-transform -translate-x-full sm:translate-x-0">
          <div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-[#2c3639] text-[#dcd7c9]">
            <ul className="flex flex-col justify-center items-center font-medium gap-1">
              {pages.map((page, i) => (
                <React.Fragment key={i}>
                  <SidebarElement
                    icon={i}
                    route={i === 0 ? "/" : `/${page.toLowerCase()}`}
                    onClick={() => {
                      navigate(i === 0 ? "/" : `/${page.toLowerCase()}`);
                    }}
                  />
                </React.Fragment>
              ))}
            </ul>
            <ul className="flex flex-col justify-center items-center font-medium gap-1">
              <SidebarElement icon={3} route="" onClick={onHelpClick} />
            </ul>
          </div>
        </aside>
        {modalIsOpen && <HelpModal setIsOpen={closeModal} />}
        {!modalIsOpen && (
          <div className="absolute bottom-0 right-0 w-56 aspect-square animate-slide-out" id="fox">
            <img
              src="https://imgur.com/Zb6szo7.png"
              alt="hi-fox"
              draggable={false}
            />
          </div>
        )}
      </div>
    </>
  );
};

