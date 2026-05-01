import { Link } from 'react-router-dom'
import { IoCheckboxOutline } from 'react-icons/io5'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      padding: '24px',
      textAlign: 'center',
    }}>

      {/* Icon */}
      <IoCheckboxOutline style={{
        fontSize: '3rem',
        color: 'var(--color-primary)',
        opacity: 0.6,
      }} />

      {/* 404 heading */}
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '4rem',
        color: 'var(--color-primary)',
        lineHeight: 1,
        margin: 0,
      }}>
        404
      </h1>

      {/* Subheading */}
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.25rem',
        color: 'var(--color-text)',
        margin: 0,
      }}>
        This page doesn't exist.
      </p>

      {/* Helper text */}
      <p style={{
        fontSize: '14px',
        color: 'var(--color-muted)',
        maxWidth: '320px',
        margin: 0,
      }}>
        Looks like you wandered off the list. Let's get you back on track.
      </p>

      {/* Back button */}
      <Link to="/" className="btn primary-btn" style={{ marginTop: '8px' }}>
        ← Back to my tasks
      </Link>

    </div>
  )
}