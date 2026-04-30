import AddTaskForm from "../AddTaskForm/AddTaskForm";
import FilterBar from "../FilterBar/FilterBar";
import ProgressBar from "../ui/ProgressBar";
import TaskList from "../TaskList/TaskList";

const BASE_FILTERS = ["all", "active", "done"];

export default function TaskPage({
  title,
  tasks,
  statTasks,
  active,
  done,
  filter,
  setFilter,
  showAddForm = true,
  showFilters = true,
  extraFilters = [], // e.g. label names for AllTasks
  emptyMessage = "No tasks here yet.",
}) {
  const filters = showFilters ? [...BASE_FILTERS, ...extraFilters] : [];
  const stats = statTasks ?? tasks;
  const statDone = stats.filter(t => t.done).length;

  return (
    <section>
      <div className="border-b pb-4 border-(--color-border)">
        <h1>{title}</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-2 my-3">
        <div className="primary-card">
          <span className="text-(--color-muted) text-sm">Total</span>
          <span className="text-[1.5rem]">{stats.length}</span>
        </div>
        <div className="primary-card">
          <span className="text-(--color-muted) text-sm">Active</span>
          <span className="text-[1.5rem]">{stats.filter(t => !t.done).length}</span>
        </div>
        <div className="primary-card">
          <span className="text-(--color-muted) text-sm">Done</span>
          <span className="text-[1.5rem]">{stats.filter(t => t.done).length}</span>
        </div>
      </div>

      {showAddForm && <AddTaskForm />}
      <ProgressBar total={stats.length} done={statDone} />
      {showFilters && <FilterBar filters={filters} filter={filter} setFilter={setFilter} />}

      {active.length > 0 && (
        <div className="mb-5">
          <p className="uppercase tracking-[0.08em] mb-2 text-sm text-(--color-muted)">Active</p>
          <TaskList tasks={active} />
        </div>
      )}

      {done.length > 0 && (
        <div>
          <p className="uppercase tracking-[0.08em] mb-2 text-sm text-(--color-muted)">Completed</p>
          <TaskList tasks={done} />
        </div>
      )}

      {active.length === 0 && done.length === 0 && (
        <p className="text-center py-8 text-sm text-(--color-muted)">{emptyMessage}</p>
      )}
    </section>
  );
}