import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  email: string | null;
  login: (token: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(localStorage.getItem("accessToken")),
  );
  const [email, setEmail] = useState<string | null>(() =>
    localStorage.getItem("userEmail"),
  );

  const login = (token: string, userEmail: string) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userEmail", userEmail);
    setIsAuthenticated(true);
    setEmail(userEmail);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
