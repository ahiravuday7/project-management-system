import "../src/styles/global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./pages/Board";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/board"
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
