import useTaskStore from '../../store/taskStore'

const FILTERS = ['all', 'active', 'done', 'work', 'health', 'personal']

const FilterBar = () => {
  const filter = useTaskStore((s) => s.filter)
  const setFilter = useTaskStore((s) => s.setFilter)

  return (
    <div className="flex gap-2 flex-wrap my-4">
      {FILTERS.map((label) => (
        <button
          key={label}
          onClick={() => setFilter(label)}
          className={`px-3 py-1 rounded-full text-sm border transition-all cursor-pointer capitalize
            ${filter === label
              ? 'text-(--color-bg) border-transparent bg-(--color-primary)'
              : 'border-transparent bg-(--color-surface) text-(--color-muted)'
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;