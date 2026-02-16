import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const ADMIN_PIN = "1234";

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(
    () => localStorage.getItem("isAdmin") === "true"
  );

  const login = (pin) => {
    if (pin === ADMIN_PIN) {
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  };

  const value = useMemo(() => ({ isAdmin, login, logout }), [isAdmin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
