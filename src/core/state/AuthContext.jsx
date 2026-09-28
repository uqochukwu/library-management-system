import { createContext, useContext, useMemo, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("lms_token");
    const storedUser = localStorage.getItem("lms_user");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.log("Invalid stored useer:", error);
        localStorage.removeItem("lms_user");
      }
    }

    setLoading(false);
  }, []);

  const login = (data) => {
    const t = data.data;
    const u = data.user;
    
    setToken(t);
    setUser(u);

    localStorage.setItem("lms_token", t);
    localStorage.setItem("lms_user", JSON.stringify(u));
  
  };
  
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("lms_token");
    localStorage.removeItem("lms_user");

    Navigate("/login");
  };

  const isAuthenticated = !!token;


  return (
    <AuthContext.Provider
      value={useMemo(() => ({ user, token, isAuthenticated, loading, login, logout }), [user])}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
