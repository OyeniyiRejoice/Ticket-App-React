import { createContext, useContext } from "react";

// Single source of truth for the Auth context and hook.
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
