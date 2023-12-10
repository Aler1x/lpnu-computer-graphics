import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./pages/main/MainPage";
import FractalPage from "./pages/fractals/FractalPage";
import ColorsPage from "./pages/colors/ColorsPage";
import ShapePage from './pages/shape/ShapePage';
import { Sidebar } from './components/Sidebar/Sidebar';
import { useState } from 'react';
import "./App.css";


export const App = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
    <Router>
      <Sidebar showHelp={showHelp} setShowHelp={setShowHelp} />
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/fractals" element={<FractalPage/>} />
        <Route path="/colors" element={<ColorsPage/>} />
        <Route path="/shapes" element={<ShapePage/>} />
      </Routes>
    </Router>
  </>
  );
};
