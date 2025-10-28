import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./components/Layout.css";
import App from "./App.jsx";
import { AuthProvider } from "./context";
import { ToastProvider } from "./context/ToastContext";
import ToastContainer from "./components/ToastContainer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <App />
          <ToastContainer />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);

