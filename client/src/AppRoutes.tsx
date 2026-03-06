import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import User from "./pages/Users";
import Roles from "./pages/Roles";
import Permission from "./pages/Permission";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />
      <Route
        path="/roles"
        element={
          <ProtectedRoute>
            <Roles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/permissions"
        element={
          <ProtectedRoute>
            <Permission />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
