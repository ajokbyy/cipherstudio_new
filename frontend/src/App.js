import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import IDE from "./components/IDE";
import Landing from "./components/Landing";
import Login from "./components/Login";
import ProjectManager from "./components/ProjectManager";

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <Router>
      <LogoutControl />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/projects"
          element={
            <RequireAuth>
              <ProjectManager />
            </RequireAuth>
          }
        />
        <Route
          path="/ide/:id"
          element={
            <RequireAuth>
              <IDE />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

function LogoutControl() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) return null;
  return (
    <button
      onClick={() => {
        localStorage.removeItem("token");
        navigate("/"); // Go to landing page
      }}
      style={{
        position: "fixed",
        top: 10,
        right: 10,
        zIndex: 1000,
        background: "#000",
        color: "#fff",
        border: "2px solid #000",
        borderRadius: 8,
        padding: "8px 12px",
        cursor: "pointer"
      }}
    >
      Logout
    </button>
  );
}

export default App;
