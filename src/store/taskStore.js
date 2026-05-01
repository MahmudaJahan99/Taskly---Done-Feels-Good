import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      darkMode: false,
      recentlyDeleted: [],

      toggleDarkMode: () =>
        set((state) => {
          const next = !state.darkMode;
          document.documentElement.classList.toggle("dark", next);
          return { darkMode: next };
        }),

      toggleDone: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t,
          ),
        })),

      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),

      deleteTask: (id) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === id);
          if (!task) return state;

          // Clear any existing timer for this task (e.g. double-click)
          const existing = state.recentlyDeleted.find((r) => r.task.id === id);
          if (existing?.timerId) clearTimeout(existing.timerId);

          // Start a 5s commit timer
          const timerId = setTimeout(() => {
            get().commitDelete(id);
          }, 5000);

          // Keep only last 5 deletions in the stack
          const updated = [
            ...state.recentlyDeleted.filter((r) => r.task.id !== id),
            { task, timerId },
          ].slice(-5);

          return {
            tasks: state.tasks.filter((t) => t.id !== id),
            recentlyDeleted: updated,
          };
        }),

      commitDelete: (id) =>
        set((state) => ({
          recentlyDeleted: state.recentlyDeleted.filter(
            (r) => r.task.id !== id,
          ),
        })),

      undoDelete: (id) =>
        set((state) => {
          const entry = state.recentlyDeleted.find((r) => r.task.id === id);
          if (!entry) return state;

          // Cancel the commit timer
          clearTimeout(entry.timerId);

          return {
            tasks: [...state.tasks, entry.task],
            recentlyDeleted: state.recentlyDeleted.filter(
              (r) => r.task.id !== id,
            ),
          };
        }),

      editTask: (id, changes) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...changes } : t,
          ),
        })),
    }),

    {
      name: "taskly-storage",
      partialize: (state) => ({ tasks: state.tasks, darkMode: state.darkMode }),

      onRehydrateStorage: () => (state) => {
        if (state?.darkMode) {
          document.documentElement.classList.add("dark");
        }
      },
    },
  ),
);

export default useTaskStore;
