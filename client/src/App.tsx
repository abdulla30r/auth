import AppRoutes from "./AppRoutes";
import Navbar from "./components/Navbar";
import "./styles.css";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <AppRoutes />
    </>
  );
}
