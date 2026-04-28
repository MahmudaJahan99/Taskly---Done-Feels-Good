import useTaskStore from '../../store/taskStore'

export default function TaskItem({ task }) {
  const toggleTask = useTaskStore((s) => s.toggleDone)
  const deleteTask = useTaskStore((s) => s.deleteTask)

  return (
    <li className="flex items-center gap-3 p-3 rounded-lg border border-(--color-border) bg-white">
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => toggleTask(task.id)}
        className="accent-(--color-primary) w-4 h-4 cursor-pointer"
      />
      <span
        className="flex-1 text-sm"
        style={{
          textDecoration: task.done ? 'line-through' : 'none',
          opacity: task.done ? 0.5 : 1,
        }}
      >
        {task.title}
      </span>
      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#F5E6D3', color: '#6B4C36' }}>
        {task.label}
      </span>
      <button onClick={() => deleteTask(task.id)} className="text-xs cursor-pointer" style={{ color: '#C0634D' }}>
        Delete
      </button>
    </li>
  )
}