import React, { useEffect, useState } from "react";

import { Page } from "../../constants/Pages";
import { SidebarElement } from "./SidebarElement/SidebarElement";
import { SidebarSeparator } from "./SidebarSeparator/SidebarSeparator";

import "./Sidebar.css";

interface SidebarProps {
  onItemSelect: (element: Page) => void;
}

export const Sidebar = ({ onItemSelect }: SidebarProps) => {
  const [activeElement, setActiveElement] = useState<Page>(Page.HOME);

  useEffect(() => {
    onItemSelect(activeElement);
  }, [activeElement]);

  const getSidebarElements = () => {
    return Object.values(Page)
      .slice(0, -1)
      .map((element, idx) => (
        <React.Fragment key={element}>
          <SidebarElement
            element={element}
            active={activeElement === element}
            onClick={() => setActiveElement(element)}
            isFirstElement={idx === 0}
          />
          {idx === 0 && <SidebarSeparator />}
        </React.Fragment>
      ));
  };

  return (
    <aside className="top-0 left-0 z-40 w-28 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto sidebar">
        <ul className="flex flex-col justify-center items-center space-y-2 font-medium gap-5">
          {getSidebarElements()}
        </ul>
        <ul className="flex flex-col justify-center items-center space-y-2 font-medium gap-5">
          <SidebarElement element={Page.HELP} />
        </ul>
      </div>
    </aside>
  );
};
