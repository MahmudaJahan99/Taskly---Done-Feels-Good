import { useMemo, useState } from "react";
import useTaskStore from "../store/taskStore";
import { filterTasks } from "../utils/taskFilters";
import { LABEL_COLORS } from "../constants/labels";

const LABEL_NAMES = new Set(LABEL_COLORS.map((l) => l.name));

export function useFilteredTasks(view) {
  const allTasks = useTaskStore((s) => s.tasks);
  const [filter, setFilter] = useState("all");

  const viewTasks = useMemo(() => filterTasks(allTasks, view), [allTasks, view]);

  const filtered = useMemo(() => {
    if (filter === "active") return viewTasks.filter((t) => !t.done);
    if (filter === "done")   return viewTasks.filter((t) => t.done);
    if (LABEL_NAMES.has(filter)) return viewTasks.filter((t) => t.label === filter);
    return viewTasks;
  }, [viewTasks, filter]);

  const active = filtered.filter((t) => !t.done);
  const done   = filtered.filter((t) => t.done);

  return { allTasks, tasks: viewTasks, filtered, active, done, filter, setFilter };
}