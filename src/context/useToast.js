import { useContext } from "react";
import ToastContext from "./ToastContext";

// Small wrapper hook to consume the ToastContext from a separate module
export const useToast = () => useContext(ToastContext);

export default useToast;
