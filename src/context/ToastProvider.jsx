import { useContext } from 'react'
import { ToastContext, useToastState } from './ToastContext'

// Styles for different toast types
const STYLES = {
  success: { background: '#7BAF7B', color: '#fff', icon: '✓' },
  error: { background: '#C0634D', color: '#fff', icon: '✕' },
  info: {
    background: 'var(--color-surface)', color: 'var(--color-text)',
    icon: 'i', border: '1px solid var(--color-border)'
  },
}

// Provider
export function ToastProvider({ children }) {
  const value = useToastState()

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

// Container for all toasts, positioned at bottom-right
function ToastContainer() {
  const { toasts } = useContext(ToastContext)

  return (
    <div
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      style={{
        position: 'fixed', bottom: '24px', right: '24px',
        display: 'flex', flexDirection: 'column', gap: '8px',
        zIndex: 9999, pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  )
}

// Single toast card
function Toast({ toast }) {
  const { removeToast } = useContext(ToastContext)
  const style = STYLES[toast.type] ?? STYLES.info

  // Handle action button click
  function handleAction() {
    toast.action?.onClick()
    removeToast(toast.id)
  }

  return (
    // Using role="alert" to ensure screen readers announce the toast immediately
    <div
      role="alert"
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '10px 14px', borderRadius: '10px',
        background: style.background, color: style.color,
        border: style.border ?? 'none', fontSize: '13px',
        fontFamily: 'var(--font-sans)', minWidth: '220px', maxWidth: '360px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        pointerEvents: 'all', cursor: 'default',
        animation: 'toast-in 0.2s ease-out',
      }}
    >
      {/* Icon */}
      <span style={{
        width: '18px', height: '18px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '10px', fontWeight: '500', flexShrink: 0,
      }}>
        {style.icon}
      </span>

      {/* Message */}
      <span style={{ flex: 1 }}>{toast.message}</span>

      {/* Action Button */}
      {toast.action && (
        <button onClick={handleAction} style={{
          background: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.35)',
          color: 'inherit', borderRadius: '6px',
          padding: '3px 10px', fontSize: '12px', fontWeight: '500',
          cursor: 'pointer', fontFamily: 'var(--font-sans)', flexShrink: 0,
        }}>
          {toast.action.label}
        </button>
      )}

      {/* Dismiss Button */}
      <button
        onClick={() => removeToast(toast.id)}
        aria-label="Dismiss notification"
        style={{
          background: 'none', border: 'none', color: 'inherit',
          cursor: 'pointer', opacity: 0.7, fontSize: '14px',
          padding: '0 2px', lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  )
}