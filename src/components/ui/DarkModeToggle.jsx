import { motion } from 'motion/react'
import useTaskStore from '../../store/taskStore'

export default function DarkModeToggle() {
  const darkMode = useTaskStore((s) => s.darkMode)
  const toggleDarkMode = useTaskStore((s) => s.toggleDarkMode)

  return (
    <button
      onClick={toggleDarkMode}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={darkMode}
      style={{
        width: '44px',
        height: '24px',
        borderRadius: '12px',
        border: '1.5px solid var(--color-border)',
        background: darkMode ? 'var(--color-primary)' : 'var(--color-surface)',
        padding: '2px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        transition: 'background 0.2s ease, border-color 0.2s ease',
        flexShrink: 0,
      }}
    >
      {/* Sliding thumb with sun/moon icon */}
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: 'var(--color-white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '9px',
          marginLeft: darkMode ? 'auto' : '0',
        }}
      >
        {darkMode ? '🌙' : '☀️'}
      </motion.span>
    </button>
  )
}