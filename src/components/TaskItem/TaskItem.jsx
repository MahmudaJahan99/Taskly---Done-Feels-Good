import { LABEL_COLORS } from '../../constants/labels'
import useTaskStore from '../../store/taskStore'

export default function TaskItem({ task }) {
  const toggleTask = useTaskStore((s) => s.toggleDone)
  const deleteTask = useTaskStore((s) => s.deleteTask)

  const labelColor = LABEL_COLORS.find((l) => l.name === task.label)
    ?? { bg: '#F3F4F6', text: '#6B7280', border: '#E5E7EB' }

  return (
    <li
      className="flex items-center gap-3 p-3 rounded-lg border border-(--color-border) bg-white"
      style={{
        '--label-bg': labelColor.bg,
        '--label-text': labelColor.text,
        '--label-border': labelColor.border,
      }}
    >
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => toggleTask(task.id)}
        className="accent-(--color-primary) w-4 h-4 cursor-pointer"
      />
      <span className={`flex-1 text-sm transition-opacity ${task.done ? 'line-through opacity-50' : 'opacity-100'}`}>
        {task.title}
      </span>
      <span className="text-xs px-2 py-0.5 rounded-full capitalize bg-(--label-bg) text-(--label-text) border border-(--label-border)">
        {task.label}
      </span>
      <button onClick={() => deleteTask(task.id)} className="text-xs cursor-pointer text-(--color-danger)">
        Delete
      </button>
    </li>
  )
}