import { useState } from "react";
import useTaskStore from "../../store/taskStore";
import { LABEL_COLORS } from "../../constants/labels";

export default function AddTaskForm() {
  const addTask = useTaskStore((s) => s.addTask);

  // Calculate today's date in YYYY-MM-DD format for the date input's min attribute
  const today = new Date();
  const minDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  // Form state
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("work");
  const [dueDate, setDueDate] = useState(minDate);

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      id: crypto.randomUUID(),
      title: title.trim(),
      label: label.toLowerCase().trim(),
      done: false,
      createdAt: new Date().toISOString(),
      dueDate: dueDate || null,
    });

    setTitle("");
    setDueDate("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 my-3">
      {/* Task title input */}
      <input
        id="task-title"
        aria-label="New task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task..."
        className="flex-1 min-w-40"
      />

      {/* Due date input */}
      <input
        type="date"
        min={minDate}
        aria-label="Due date (optional)"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="text-sm"
      />

      {/* Label select */}
      <select
        value={label}
        onChange={(e) => setLabel(e.target.value)}>
        {LABEL_COLORS.map((l) => (
          <option key={l.name} value={l.name}>
            {l.name.charAt(0).toUpperCase() + l.name.slice(1)}
          </option>
        ))}
      </select>

      {/* Add task button */}
      <button className="primary-btn flex items-center gap-2">
        <span>+</span>
        <span>Add task</span>
      </button>
    </form>
  );
}