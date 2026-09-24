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
          <main className="flex min-h-0 flex-1 flex-col overflow-hidden p-4 md:p-6">
            <div className="min-h-0 flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<FractalsPage />} />
              <Route path="/colors" element={<ColorsPage />} />
              <Route path="/shapes" element={<ShapesPage />} />
            </Routes>
            </div>
          </main>
        </div>
      </TooltipProvider>
    </BrowserRouter>
  );
};
