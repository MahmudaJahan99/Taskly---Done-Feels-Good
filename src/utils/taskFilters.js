import { getTodayStr } from "./dates";

// Returns the number of days between today and the given due date string (YYYY-MM-DD).
function diffDays(dueDateStr) {
  const due = new Date(dueDateStr + "T00:00:00");
  return Math.round((due - new Date().setHours(0, 0, 0, 0)) / 86_400_000);
}

// Filters tasks based on the selected view: "all", "today", "upcoming", "done", or a specific label.
export function filterTasks(tasks, view) {
  const todayStr = getTodayStr();
  
  switch (view) {
    case "all":
      return tasks;
    case "today":
      return tasks.filter((t) => t.dueDate === todayStr);
    case "upcoming":
      return tasks.filter((t) => t.dueDate && diffDays(t.dueDate) > 0);
    case "done":
      return tasks.filter((t) => t.done);
    default:
      return tasks.filter((t) => t.label === view);
  }
}

// Returns counts of tasks for each category: all, today, upcoming, and done.
export function getCounts(tasks) {
  const todayStr = getTodayStr();
  return {
    all: tasks.length,
    today: tasks.filter((t) => t.dueDate === todayStr && !t.done).length,
    upcoming: tasks.filter(
      (t) => !t.done && t.dueDate && diffDays(t.dueDate) > 0,
    ).length,
    done: tasks.filter((t) => t.done).length,
  };
}