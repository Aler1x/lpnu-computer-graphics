import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./pages/main/MainPage";
import FractalPage from "./pages/fractals/FractalPage";
import ColorsPage from "./pages/colors/ColorsPage";
import ShapePage from './pages/shape/ShapePage';
import { Sidebar } from './components/Sidebar/Sidebar';
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  localStorage.clear();
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/fractals" element={<FractalPage />} />
          <Route path="/colors" element={<ColorsPage />} />
          <Route path="/shapes" element={<ShapePage />} />
        </Routes>
      </Router>
      <ToastContainer
        autoClose={2000}
        draggable={false}
        limit={2}
      />
    </>
  );
};
