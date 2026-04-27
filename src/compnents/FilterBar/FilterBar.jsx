// src/components/ui/FilterBar.jsx
import useTaskStore from '../../store/taskStore'

const FILTERS = ['ALL', 'ACTIVE', 'DONE', 'WORK', 'HEALTH', 'PERSONAL']

export default function FilterBar() {
  const filter = useTaskStore((s) => s.filter)
  const setFilter = useTaskStore((s) => s.setFilter)

  return (
    <div className="flex gap-2 flex-wrap my-4">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded-full text-sm border transition-all cursor-pointer capitalize
            ${filter === f
              ? 'text-white border-transparent'
              : 'border-transparent'
            }`}
          style={filter === f
            ? { background: 'var(--color-primary)' }
            : { background: 'var(--color-surface)', color: 'var(--color-muted)' }
          }
        >
          {f}
        </button>
      ))}
    </div>
  )
}