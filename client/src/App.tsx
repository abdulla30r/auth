import { useLocation } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Navbar from "./components/Navbar";
import "./styles.css";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";

export default function App() {
  const location = useLocation();
  const { accessToken } = useContext(AuthContext);

  return (
    <>
      {accessToken && <Navbar />}
      <AppRoutes />
    </>
  );
}
