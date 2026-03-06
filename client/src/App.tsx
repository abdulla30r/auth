import { useLocation } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Navbar from "./components/Navbar";
import "./styles.css";

export default function App() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <AppRoutes />
    </>
  );
}
