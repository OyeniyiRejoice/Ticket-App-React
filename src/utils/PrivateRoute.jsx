// src/utils/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  // if no user session, redirect to /auth/login per spec
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // else show the protected page
  return children;
}
