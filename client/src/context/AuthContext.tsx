import { createContext, useState, useEffect, ReactNode } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(() => localStorage.getItem("userEmail"));
  const [loading, setLoading] = useState(true);

  // On mount, try to get a new access token using the refresh cookie
  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setAccessToken(data.accessToken);
          if (data.email) setUserEmail(data.email);
        }
      } catch {
        // refresh failed — user stays logged out
      } finally {
        setLoading(false);
      }
    };
    refreshAccessToken();
  }, []);

  const setUserEmailPersist = (email: string | null) => {
    setUserEmail(email);
    if (email) {
      localStorage.setItem("userEmail", email);
    } else {
      localStorage.removeItem("userEmail");
    }
  };

  const logout = () => {
    setAccessToken(null);
    setUserEmailPersist(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        userEmail,
        setUserEmail: setUserEmailPersist,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
