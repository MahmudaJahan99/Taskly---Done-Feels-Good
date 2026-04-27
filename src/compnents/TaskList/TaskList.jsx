// src/components/TaskList/TaskList.jsx
import TaskItem from '../TaskItem/TaskItem'

export default function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return (
      <p className="text-center py-8 text-sm" style={{ color: 'var(--color-muted)' }}>
        No tasks here yet.
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}