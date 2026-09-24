import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TopNav } from "@/components/layout/top-nav";
import FractalsPage from "@/pages/Fractals";
import ColorsPage from "@/pages/Colors";
import ShapesPage from "@/pages/Shapes";
import { TooltipProvider } from "@/components/ui/tooltip";

export const App = () => {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <div className="flex h-svh flex-col overflow-hidden bg-background">
          <TopNav />
          <main className="min-h-0 flex-1 overflow-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<FractalsPage />} />
              <Route path="/colors" element={<ColorsPage />} />
              <Route path="/shapes" element={<ShapesPage />} />
            </Routes>
          </main>
        </div>
      </TooltipProvider>
    </BrowserRouter>
  );
};
