import { useFilteredTasks } from '../hooks/useFilteredTasks';
import TaskPage from '../components/TaskPage/TaskPage';

export default function Today() {
  const { tasks, active, done, filter, setFilter } = useFilteredTasks("today");
  return (
    <TaskPage title="Today" tasks={tasks} active={active} done={done}
      filter={filter} setFilter={setFilter} emptyMessage="Nothing due today. Enjoy!" />
  );
}