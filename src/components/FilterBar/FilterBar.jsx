const FilterBar = ({ filters, filter, setFilter }) => {

  return (
    <div className="flex gap-2 flex-wrap my-4">
      {filters.map((label) => (
        <button
          key={label}
          onClick={() => setFilter(label)}
          aria-pressed={filter === label}
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