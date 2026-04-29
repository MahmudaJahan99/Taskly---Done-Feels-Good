// AllTasks.jsx
import useTaskStore from '../store/taskStore'
import ProgressBar from '../components/ui/ProgressBar';
import FilterBar from "../components/FilterBar/FilterBar";
import TaskList from "../components/TaskList/TaskList";
import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import { LABEL_COLORS } from '../constants/labels';
import { useMemo, useState } from 'react';

const BASE_FILTERS = ["all", "active", "done"];
const LABEL_FILTERS = LABEL_COLORS.map((l) => l.name);
const FILTERS = [...BASE_FILTERS, ...LABEL_FILTERS];

const AllTasks = () => {
  const tasks = useTaskStore((s) => s.tasks);

  const [filter, setFilter] = useState("all");

  const { activeTasks, doneTasks, visibleActive, visibleDone } = useMemo(() => {
    const active = tasks.filter((t) => !t.done);
    const done = tasks.filter((t) => t.done);

    if (filter === 'active') return { activeTasks: active, doneTasks: done, visibleActive: active, visibleDone: [] };
    if (filter === 'done') return { activeTasks: active, doneTasks: done, visibleActive: [], visibleDone: done };

    if (LABEL_FILTERS.includes(filter)) {
      const byLabel = tasks.filter((t) => t.label === filter);
      return {
        activeTasks: active,
        doneTasks: done,
        visibleActive: byLabel.filter((t) => !t.done),
        visibleDone: byLabel.filter((t) => t.done),
      };
    }

    return { activeTasks: active, doneTasks: done, visibleActive: active, visibleDone: done };
  }, [tasks, filter]);

  return (
    <section>
      <div className="border-b pb-4 border-(--color-border)">
        <h1>All Tasks</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-2 my-3">
        <div className="primary-card">
          <span className="text-(--color-muted) text-sm">Total</span>
          <span className="text-[1.5rem]">{tasks.length}</span>
        </div>
        <div className="primary-card">
          <span className="text-(--color-muted) text-sm">Active</span>
          <span className="text-[1.5rem]">{activeTasks.length}</span>
        </div>
        <div className="primary-card">
          <span className="text-(--color-muted) text-sm">Done</span>
          <span className="text-[1.5rem]">{doneTasks.length}</span>
        </div>
      </div>

      <AddTaskForm />
      <ProgressBar total={tasks.length} done={doneTasks.length} />
      <FilterBar filters={FILTERS} filter={filter} setFilter={setFilter} />

      {/* Active section */}
      {visibleActive.length > 0 && (
        <div className="mb-6">
          <p className="uppercase tracking-[0.08em] mb-2 text-sm text-(--color-muted)">
            Active
          </p>
          <TaskList tasks={visibleActive} />
        </div>
      )}

      {/* Completed section */}
      {visibleDone.length > 0 && (
        <div>
          <p className="uppercase tracking-[0.08em] mb-2 text-sm text-(--color-muted)">
            Completed
          </p>
          <TaskList tasks={visibleDone} />
        </div>
      )}

      {/* Empty state when nothing matches the filter */}
      {visibleActive.length === 0 && visibleDone.length === 0 && (
        <p className="text-center py-8 text-sm text-(--color-muted)">
          No tasks here yet.
        </p>
      )}
    </section>
  );
};

export default AllTasks;