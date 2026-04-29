export default function ProgressBar({ total, done }) {
  // Calculate the percentage of tasks completed
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <div className="flex items-center gap-3 my-3">
      <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--color-surface)' }}>
        <div
          className="h-1.5 rounded-full transition-all duration-500"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Task completion: ${percent}%`}
          style={{
            width: `${percent}%`,
            background: 'var(--color-primary)',
          }}
        />
      </div>
      {/* Progress percentage */}
      <span className="text-xs whitespace-nowrap" style={{ color: 'var(--color-muted)' }}>
        {percent}% complete
      </span>
    </div>
  )
}