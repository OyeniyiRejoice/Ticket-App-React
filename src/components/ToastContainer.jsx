import React from "react";
import { useToast } from "../context/useToast";
import "./Toast.css";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast() || { toasts: [] };

  return (
    <div className="toast-root" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`toast ${t.type || "info"}`}
          onClick={() => removeToast && removeToast(t.id)}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
