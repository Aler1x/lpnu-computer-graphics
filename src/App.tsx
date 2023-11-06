import { useState } from "react";

import { Sidebar } from "./components/Sidebar/Sidebar";
import { Page } from "./constants/Pages";
import { MainContent } from "./components/MainContent/MainContent";

import "./App.css";

export const App = () => {
  const [selectedElement, setSelectedElement] = useState<Page | null>(null);

  return (
    <>
      <Sidebar onItemSelect={(element: Page) => setSelectedElement(element)} />
      <MainContent page={selectedElement} />
    </>
  );
};
