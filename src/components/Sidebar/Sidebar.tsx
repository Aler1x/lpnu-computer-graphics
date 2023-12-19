import React, { useState } from "react";
import { SidebarElement } from "./SidebarElement/SidebarElement";
import { SidebarSeparator } from "../../icons/SidebarSeparator";
import { useLocation, useNavigate } from 'react-router-dom';
import "./Sidebar.css";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const pages = ["Main", "Fractals", "Colors", "Shapes"];
  const [currentPage, setCurrentPage] = useState(location.pathname);

  const drawSidebar = () => {
    return pages.map((page, i) => (
      <React.Fragment key={i}>
        <SidebarElement
          icon={i}
          onClick={() => {
            const pageRoute = i === 0 ? '/' : `/${page.toLowerCase()}`;
            navigate(pageRoute);
            setCurrentPage(pageRoute);
          }}
          active={
            currentPage === '/' && i === 0 ||
            currentPage === `/${page.toLowerCase()}`
          }
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
      </div>
    </aside>
  );
};
