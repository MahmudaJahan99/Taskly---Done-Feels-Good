import { createContext, useCallback, useContext, useReducer } from "react";

const ToastContext = createContext(null);

// Reducer function to manage toast state
function toastReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.toast];
    case "REMOVE":
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}

export function useToastState() {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  // Function to show a new toast
  const showToast = useCallback(
    ({ message, type = "success", duration = 3000, action }) => {
      const id = crypto.randomUUID();
      dispatch({ type: "ADD", toast: { id, message, type, action } });
      setTimeout(() => dispatch({ type: "REMOVE", id }), duration);
    },
    [],
  );

  // Function to manually remove a toast
  const removeToast = useCallback((id) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  return { toasts, showToast, removeToast };
}

// Custom hook to use the Toast context
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

export { ToastContext };
