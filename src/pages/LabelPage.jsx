import { useFilteredTasks } from '../hooks/useFilteredTasks';
import TaskPage from '../components/TaskPage/TaskPage';
import { useParams, Navigate } from 'react-router-dom';
import { LABEL_COLORS } from '../constants/labels';

const VALID_LABELS = new Set(LABEL_COLORS.map(l => l.name));

export default function LabelPage() {
  const { label } = useParams();

  const { tasks, active, done, filter, setFilter } = useFilteredTasks(label);

  if (!VALID_LABELS.has(label)) {
    return <Navigate to="/" replace />;
  }

  return (
    <TaskPage
      title={label.charAt(0).toUpperCase() + label.slice(1)}
      tasks={tasks} active={active} done={done}
      filter={filter} setFilter={setFilter}
      emptyMessage={`No ${label} tasks yet.`}
    />
  );
}