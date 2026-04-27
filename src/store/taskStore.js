// src/store/taskStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [
        { id: '1', title: 'Review pull request', label: 'Work', done: false, createdAt: new Date().toISOString() },
        { id: '2', title: 'Morning walk — 30 minutes', label: 'Health', done: false, createdAt: new Date().toISOString() },
        { id: '3', title: 'Buy groceries', label: 'Personal', done: false, createdAt: new Date().toISOString() },
        { id: '4', title: 'Set up Vite + React', label: 'Work', done: true, createdAt: new Date().toISOString() },
        { id: '5', title: 'Read 20 pages', label: 'Personal', done: true, createdAt: new Date().toISOString() },
      ],
      filter: 'all',
      setFilter: (filter) => set({ filter }),
      toggleDone: (id) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)
      })),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter(t => t.id !== id) })),
    }),
    { name: 'taskly-storage' } // auto-persists to localStorage!
  )
)

export default useTaskStore