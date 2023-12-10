// import { Sidebar } from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import MainPage from "./pages/main/MainPage";
import FractalPage from "./pages/fractals/FractalPage";
import ColorsPage from "./pages/colors/ColorsPage";

export const App = () => {

  return (
    <>
    <Router>
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/fractals" element={<FractalPage/>} />
        <Route path="/colors" element={<ColorsPage/>} />
        {/* <Route path="/seat" element={} /> */}
      </Routes>
    </Router>
  </>
    // <>
    //   <Sidebar onItemSelect={(element: Page) => setSelectedElement(element)} />
      
    // </>
  );
};
