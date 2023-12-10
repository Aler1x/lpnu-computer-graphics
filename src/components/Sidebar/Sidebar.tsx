import React, { useState } from "react";
import { SidebarElement } from "./SidebarElement/SidebarElement";
import { SidebarSeparator } from "../../icons/SidebarSeparator";
import { useNavigate } from 'react-router-dom';
import "./Sidebar.css";

interface SidebarProps {
  showHelp: boolean;
  setShowHelp: (showHelp: boolean) => void;
}

export const Sidebar = ({ showHelp, setShowHelp }: SidebarProps) => {
  const pages = ["Main", "Fractals", "Colors", "Shapes"];
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const drawSidebar = () => {
    return pages.map((page, i) => (
      <React.Fragment key={i}>
        <SidebarElement
          icon={i}
          onClick={(icon: number) => {
            if (icon === 0)
              navigate(`/`)
            else
              navigate(`/${page.toLowerCase()}`)
            setActive(icon)
          }
          }
          active={active === i}
          isFirstElement={i === 0}
        />
        {i === 0 && <SidebarSeparator />}
      </React.Fragment>
    ));
  };


  return (
    <aside className="top-0 left-0 z-40 w-28 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto sidebar">
        <ul className="flex flex-col justify-center items-center space-y-2 font-medium gap-5">
          {drawSidebar()}
        </ul>
        <ul className="flex flex-col justify-center items-center space-y-2 font-medium gap-5">
          <SidebarElement icon={4} onClick={() => { setShowHelp(!showHelp) }} />
        </ul>
      </div>
    </aside>
  );
};
