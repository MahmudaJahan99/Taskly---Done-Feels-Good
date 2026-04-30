import { useFilteredTasks } from '../hooks/useFilteredTasks';
import TaskPage from '../components/TaskPage/TaskPage';

export default function Completed() {
  const { tasks, active, done, filter, setFilter } = useFilteredTasks("done");
  return (
    <TaskPage title="Completed" tasks={tasks} active={active} done={done}
      filter={filter} setFilter={setFilter} showAddForm={false} showFilters={false}
      emptyMessage="Nothing completed yet. Get to it!" />
  );
}