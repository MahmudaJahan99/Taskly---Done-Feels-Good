import { useFilteredTasks } from '../hooks/useFilteredTasks';
import TaskPage from '../components/TaskPage/TaskPage';

export default function Upcoming() {
  const { tasks, active, done, filter, setFilter } = useFilteredTasks("upcoming");
  return (
    <TaskPage title="Upcoming" tasks={tasks} active={active} done={done}
      filter={filter} setFilter={setFilter} showFilters={false}
      emptyMessage="No upcoming tasks. You're all caught up!" />
  );
}