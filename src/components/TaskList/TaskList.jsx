import TaskItem from '../TaskItem/TaskItem'

export default function TaskList({ tasks }) {
  // If no tasks, show a message instead of an empty list
  if (tasks.length === 0) {
    return (
      <p className="text-center py-8 text-sm" style={{ color: 'var(--color-muted)' }}>
        No tasks here yet.
      </p>
    )
  }

  // Render the list of tasks
  return (
    <ul className="flex flex-col gap-3">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}