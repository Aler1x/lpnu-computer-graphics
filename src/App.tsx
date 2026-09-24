import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { HelpDialog } from "@/components/layout/help-dialog";
import FractalsPage from "@/pages/Fractals";
import ColorsPage from "@/pages/Colors";
import ShapesPage from "@/pages/Shapes";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export const App = () => {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="h-svh overflow-hidden">
            <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-4" />
              <p className="text-sm font-medium">Лабораторні з комп&apos;ютерної графіки</p>
              <div className="ml-auto">
                <HelpDialog />
              </div>
            </header>
            <div className="min-h-0 flex-1 overflow-auto p-4 md:p-6">
              <Routes>
                <Route path="/" element={<FractalsPage />} />
                <Route path="/colors" element={<ColorsPage />} />
                <Route path="/shapes" element={<ShapesPage />} />
              </Routes>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </BrowserRouter>
  );
};
