import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { accessToken, logout, userEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const avatarLetter = userEmail ? userEmail.trim()[0].toUpperCase() : "?";

  return (
    <nav className="bg-white shadow px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-blue-600">
        Auth App
      </Link>
      <div className="flex gap-4 items-center">
        {accessToken ? (
          <>
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/users" className="text-gray-700 hover:text-blue-600">
              Users
            </Link>
            <Link to="/roles" className="text-gray-700 hover:text-blue-600">
              Roles
            </Link>
            <Link to="/permissions" className="text-gray-700 hover:text-blue-600">
              Permissions
            </Link>

            <div ref={ref} className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold"
                aria-label="User menu"
              >
                {avatarLetter}
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow py-2 text-sm">
                  <div className="px-3 py-2 text-gray-800">{userEmail}</div>
                  <div className="border-t" />
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-red-500 hover:bg-gray-50">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
