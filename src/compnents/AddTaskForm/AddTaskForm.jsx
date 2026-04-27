import { useState } from "react";
import useTaskStore from "../../store/taskStore";

export default function AddTaskForm() {
  const addTask = useTaskStore((s) => s.addTask);

  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("Work");

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
        className="flex-1 border px-3 py-2 rounded-lg text-sm"
      />

      <select
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="border px-2 py-2 rounded-lg text-sm"
      >
        <option>Work</option>
        <option>Health</option>
        <option>Personal</option>
      </select>

        <button className="primary-btn flex items-center gap-2">
                    <span>+</span>
                    <span>Add task</span>
                </button>
    </form>
  );
}