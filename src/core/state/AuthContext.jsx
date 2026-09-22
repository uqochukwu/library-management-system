import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("lms_user",));
    } catch {
      return null;
    }
  });
  const login = (data) => {
    const u = data?.user;
    if (data?.data) localStorage.setItem("lms_token", data.data);
    localStorage.setItem("lms_user", JSON.stringify(u));
    setUser(u);
  };
  
  const logout = () => {
    localStorage.removeItem("lms_token");
    localStorage.removeItem("lms_user");
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={useMemo(() => ({ user, login, logout }), [user])}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
