import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

// Create and export the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("ticketapp_session"));
    if (session) setUser(session);
  }, []);

  const login = (userData) => {
    localStorage.setItem("ticketapp_session", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("ticketapp_session");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

