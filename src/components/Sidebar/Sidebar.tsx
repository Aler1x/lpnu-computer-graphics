import { ElementName } from "./SidebarElement/ElementIcon/ElementIconConstants";
import { SidebarElement } from "./SidebarElement/SidebarElement";
import { SidebarSeparator } from "./SidebarSeparator/SidebarSeparator";

import "./Sidebar.css";
import React, { useState } from "react";

export const Sidebar = () => {
  const [activeElement, setActiveElement] = useState<ElementName | null>(null);

  const handleElementClick = (element: ElementName) => {
    setActiveElement(element);
  };

  return (
    <aside className="fixed top-0 left-0 z-40 w-28 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto sidebar">
        <ul className="flex flex-col justify-center items-center space-y-2 font-medium gap-5">
          {Object.values(ElementName)
            .slice(0, -1)
            .map((element, idx) => (
              <React.Fragment key={element}>
                <SidebarElement
                  element={element}
                  active={activeElement === element}
                  onClick={() => handleElementClick(element)}
                  isFirstElement={idx === 0}
                />
                {idx === 0 && <SidebarSeparator />}
              </React.Fragment>
            ))}
        </ul>
        <ul className="flex flex-col justify-center items-center space-y-2 font-medium gap-5">
          <SidebarElement element={ElementName.HELP} />
        </ul>
      </div>
    </aside>
  );
};
