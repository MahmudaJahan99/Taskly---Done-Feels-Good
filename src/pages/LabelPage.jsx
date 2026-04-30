import { useFilteredTasks } from '../hooks/useFilteredTasks';
import TaskPage from '../components/TaskPage/TaskPage';
import { useParams } from 'react-router-dom';

export default function LabelPage() {
  const { label } = useParams(); // e.g. "work", "health"
  const { tasks, active, done, filter, setFilter } = useFilteredTasks(label);
  return (
    <TaskPage title={label.charAt(0).toUpperCase() + label.slice(1)}
      tasks={tasks} active={active} done={done}
      filter={filter} setFilter={setFilter}
      emptyMessage={`No ${label} tasks yet.`} />
  );
}