import "../src/styles/global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./pages/Board";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/board" element={<Board />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
