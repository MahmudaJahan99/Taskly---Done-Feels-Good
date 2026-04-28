export default function ProgressBar({ total, done }) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <div className="flex items-center gap-3 my-3">
      <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--color-surface)' }}>
        <div
          className="h-1.5 rounded-full transition-all duration-500"
          style={{
            width: `${percent}%`,
            background: 'var(--color-primary)',
          }}
        />
      </div>
      <span className="text-xs whitespace-nowrap" style={{ color: 'var(--color-muted)' }}>
        {percent}% complete
      </span>
    </div>
  )
}