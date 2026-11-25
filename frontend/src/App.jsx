import "./styles/Dashboard.css";
import "./styles/Auth.css";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={token ? "/dashboard" : "/login"}
            replace
          />
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route
        path="*"
        element={
          <Navigate
            to={token ? "/dashboard" : "/login"}
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;
