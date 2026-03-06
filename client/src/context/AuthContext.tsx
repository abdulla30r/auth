import { createContext, useState, ReactNode } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessTokenState] = useState<string | null>(() => localStorage.getItem("accessToken"));

  const [userEmail, setUserEmailState] = useState<string | null>(() => localStorage.getItem("userEmail"));

  const setAccessToken = (token: string | null) => {
    setAccessTokenState(token);
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  };

  const setUserEmail = (email: string | null) => {
    setUserEmailState(email);
    if (email) {
      localStorage.setItem("userEmail", email);
    } else {
      localStorage.removeItem("userEmail");
    }
  };

  const logout = () => {
    setAccessToken(null);
    setUserEmail(null);
  };

  return <AuthContext.Provider value={{ accessToken, setAccessToken, userEmail, setUserEmail, logout }}>{children}</AuthContext.Provider>;
}

export default AuthContext;
