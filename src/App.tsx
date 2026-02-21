import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FractalsPage from "@/pages/Fractals";
import ColorsPage from "@/pages/Colors";
import ShapesPage from "@/pages/Shapes";
import { Sidebar } from "@/components/Sidebar";

export const App = () => {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 min-h-0 overflow-auto p-4">
          <Routes>
            <Route path="/" element={<FractalsPage />} />
            <Route path="/colors" element={<ColorsPage />} />
            <Route path="/shapes" element={<ShapesPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
