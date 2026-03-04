import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import User from "./pages/Users";
import Roles from "./pages/Roles";
import Permission from "./pages/Permission";
import Login from "./pages/Login";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<User />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/permissions" element={<Permission />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}
