import { useState } from "react";
import useTaskStore from "../../store/taskStore";

export default function AddTaskForm() {
  const addTask = useTaskStore((s) => s.addTask);

  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("work");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    addTask({
      id: Date.now().toString(),
      title,
      label,
      done: false,
      createdAt: new Date().toISOString(),
    });

    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 my-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task..."
        className="flex-1"
      />

      <select
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      >
        <option className="capitalize">work</option>
        <option className="capitalize">health</option>
        <option className="capitalize">personal</option>
      </select>

      <button className="primary-btn flex items-center gap-2">
        <span>+</span>
        <span>Add task</span>
      </button>
    </form>
  );
}