// src/context/ToastContext.jsx
import { createContext, useCallback, useContext, useReducer } from 'react'

// --- State shape ---
// toasts: [{ id, message, type: 'success' | 'error' | 'info' }]

const ToastContext = createContext(null)

function toastReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.toast]
    case 'REMOVE':
      return state.filter((t) => t.id !== action.id)
    default:
      return state
  }
}

export function ToastProvider({ children }) {
  const [toasts, dispatch] = useReducer(toastReducer, [])

  // Stable reference with useCallback — safe to use in useEffect deps
  const showToast = useCallback(({ message, type = 'success', duration = 3000 }) => {
    const id = crypto.randomUUID()

    dispatch({ type: 'ADD', toast: { id, message, type } })

    // Auto-dismiss after duration
    setTimeout(() => {
      dispatch({ type: 'REMOVE', id })
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    dispatch({ type: 'REMOVE', id })
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

// --- Custom hook — this is your public API ---
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}

// --- Container renders all active toasts ---
function ToastContainer() {
  const { toasts } = useContext(ToastContext)

  return (
    <div
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  )
}

// --- Single toast card ---
const STYLES = {
  success: {
    background: '#7BAF7B',
    color: '#fff',
    icon: '✓',
  },
  error: {
    background: '#C0634D',
    color: '#fff',
    icon: '✕',
  },
  info: {
    background: 'var(--color-surface)',
    color: 'var(--color-text)',
    icon: 'i',
    border: '1px solid var(--color-border)',
  },
}

function Toast({ toast }) {
  const { removeToast } = useContext(ToastContext)
  const style = STYLES[toast.type] ?? STYLES.info

  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 14px',
        borderRadius: '10px',
        background: style.background,
        color: style.color,
        border: style.border ?? 'none',
        fontSize: '13px',
        fontFamily: 'var(--font-sans)',
        minWidth: '220px',
        maxWidth: '360px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        pointerEvents: 'all',
        cursor: 'default',
        animation: 'toast-in 0.2s ease-out',
      }}
    >
      {/* Type icon */}
      <span style={{
        width: '18px', height: '18px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '10px', fontWeight: '500', flexShrink: 0,
      }}>
        {style.icon}
      </span>

      {/* Message */}
      <span style={{ flex: 1 }}>{toast.message}</span>

      {/* Dismiss button */}
      <button
        onClick={() => removeToast(toast.id)}
        aria-label="Dismiss notification"
        style={{
          background: 'none', border: 'none',
          color: 'inherit', cursor: 'pointer',
          opacity: 0.7, fontSize: '14px',
          padding: '0 2px', lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  )
}