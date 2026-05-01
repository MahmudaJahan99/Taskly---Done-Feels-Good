import { useState } from "react";
import useTaskStore from "../../store/taskStore";
import { LABEL_COLORS } from "../../constants/labels";
import { getTodayStr } from "../../utils/dates";
import { useToast } from '../../context/ToastContext'

export default function AddTaskForm() {
  const addTask = useTaskStore((s) => s.addTask);

  const { showToast } = useToast()

  // Form state
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("work");
  const [dueDate, setDueDate] = useState(getTodayStr());

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    // Date validation
    if (dueDate && dueDate < getTodayStr()) {
      showToast({ message: 'Due date cannot be in the past.', type: 'error' })
      return;
    }

    // Add the new task to the store
    addTask({
      id: crypto.randomUUID(),
      title: title.trim(),
      label: label.toLowerCase().trim(),
      done: false,
      createdAt: new Date().toISOString(),
      dueDate: dueDate || null,
    });

    // Show success toast
    showToast({ message: `"${title.trim()}" added ✓`, type: 'success' })

    // Reset form
    setTitle("");
    setDueDate(getTodayStr());
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
        min={getTodayStr()}
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
      <button type="submit" className="btn primary-btn flex items-center gap-2">
        <span>+</span>
        <span>Add task</span>
      </button>
    </form>
  );
}