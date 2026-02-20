import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-gray-700 hover:text-gray-900 transition border-b-2 ${
    isActive ? "border-blue-600" : "border-transparent"
  }`;

export default function Navbar() {
  const { email, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const initial = email ? email[0].toUpperCase() : "?";

  // close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">Auth</div>

        <div className="flex items-center space-x-8">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/users" className={linkClass}>
            Users
          </NavLink>
          <NavLink to="/roles" className={linkClass}>
            Roles
          </NavLink>
          <NavLink to="/permissions" className={linkClass}>
            Permisions
          </NavLink>

          {/* Profile avatar */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {initial}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black/5 py-1">
                <div className="px-4 py-2 text-sm text-gray-500 truncate border-b">
                  {email}
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
