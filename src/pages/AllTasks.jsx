// src/pages/AllTasks.jsx
import { LABEL_COLORS } from '../constants/labels';
import { useFilteredTasks } from '../hooks/useFilteredTasks';
import TaskPage from '../components/TaskPage/TaskPage';

const LABEL_FILTERS = LABEL_COLORS.map((l) => l.name);

export default function AllTasks() {
  const { tasks, active, done, filter, setFilter } = useFilteredTasks("all");
  return (
    <TaskPage title="All Tasks" tasks={tasks} active={active} done={done}
      filter={filter} setFilter={setFilter} extraFilters={LABEL_FILTERS} />
  );
}