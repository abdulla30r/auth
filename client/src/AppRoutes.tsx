import { Routes, Route, Navigate } from "react-router-dom";
import RolesPage from "./pages/Roles";
import HomePage from "./pages/Home";
import PermissionPage from "./pages/Permission";
import UserPage from "./pages/Users";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth } from "./context/AuthContext";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />}
      />

      <Route
        path="/"
        element={
          isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/roles"
        element={
          isAuthenticated ? <RolesPage /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/permissions"
        element={
          isAuthenticated ? (
            <PermissionPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/users"
        element={
          isAuthenticated ? <UserPage /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}
