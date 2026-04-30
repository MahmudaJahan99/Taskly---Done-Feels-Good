import { useMemo, useState } from "react";
import useTaskStore from "../store/taskStore";
import { filterTasks } from "../utils/taskFilters";

export function useFilteredTasks(view) {
  const tasks = useTaskStore((s) => s.tasks);
  const [filter, setFilter] = useState("all"); // secondary filter (active/done/label)

  const filtered = useMemo(() => {
    // First apply the page-level view filter (today, upcoming, etc.)
    const byView = filterTasks(tasks, view);
    // Then apply the secondary pill filter within that result
    if (filter === "active") return byView.filter((t) => !t.done);
    if (filter === "done")   return byView.filter((t) => t.done);
    return byView;
  }, [tasks, view, filter]);

  const active = filtered.filter((t) => !t.done);
  const done   = filtered.filter((t) => t.done);

  return { tasks, filtered, active, done, filter, setFilter };
}