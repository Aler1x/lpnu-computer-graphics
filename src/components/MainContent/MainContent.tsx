import { useState } from "react";
import { Page } from "../../constants/Pages";

interface MainContentProps {
  page: Page | null;
}

export const MainContent = ({ page }: MainContentProps) => {
  return <div>Content: {page}</div>;
};
