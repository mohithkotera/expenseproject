import Home from "./pages/Home";
import Login from "./pages/Login";

import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="bg-[#b7e4c730] h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
