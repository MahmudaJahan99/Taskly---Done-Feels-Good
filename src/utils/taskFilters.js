const todayStr = () => new Date().toLocaleDateString("en-CA");

function diffDays(dueDateStr) {
  const due = new Date(dueDateStr + "T00:00:00");
  return Math.round((due - new Date().setHours(0, 0, 0, 0)) / 86_400_000);
}

export function filterTasks(tasks, view) {
  switch (view) {
    case "all":
      return tasks;
    case "today":
      return tasks.filter((t) => t.dueDate === todayStr() && !t.done);
    case "upcoming":
      return tasks.filter((t) => !t.done && t.dueDate && diffDays(t.dueDate) > 0);
    case "done":
      return tasks.filter((t) => t.done);
    default:
      // label view e.g. "work", "health"
      return tasks.filter((t) => t.label === view);
  }
}

export function getCounts(tasks) {
  const today = todayStr();
  return {
    all: tasks.length,
    today: tasks.filter((t) => t.dueDate === today && !t.done).length,
    upcoming: tasks.filter((t) => !t.done && t.dueDate && diffDays(t.dueDate) > 0).length,
    done: tasks.filter((t) => t.done).length,
  };
}