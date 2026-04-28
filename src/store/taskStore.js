// src/store/taskStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      filter: "all",
      setFilter: (filter) => set({ filter }),
      toggleDone: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t,
          ),
        })),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      deleteTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
    }),
    { name: "taskly-storage" }, // auto-persists to localStorage!
  ),
);

export default useTaskStore;
