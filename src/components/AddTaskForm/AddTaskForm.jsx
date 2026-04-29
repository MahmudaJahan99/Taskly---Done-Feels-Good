import { useState } from "react";
import useTaskStore from "../../store/taskStore";
import { LABEL_COLORS } from "../../constants/labels";

export default function AddTaskForm() {
  const addTask = useTaskStore((s) => s.addTask);

  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("work");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    addTask({
      id: crypto.randomUUID(),
      title,
      label: label.toLowerCase().trim(),
      done: false,
      createdAt: new Date().toISOString(),
    });

    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 my-3">
      <input
        id="task-title"
        aria-label="New task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task..."
        className="flex-1"
      />

      <select
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      >
        {LABEL_COLORS.map((l) => (
          <option key={l.name} value={l.name}>
            {l.name.charAt(0).toUpperCase() + l.name.slice(1)}
          </option>
        ))}
      </select>

      <button className="primary-btn flex items-center gap-2">
        <span>+</span>
        <span>Add task</span>
      </button>
    </form>
  );
}