# 📝 Taskly — Done Feels Good

A clean and minimal fast task management app built with React. Organize tasks by label, track what's due today, and stay on top of upcoming deadlines — all saved locally in your browser.



![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5-orange)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38BFF8?logo=tailwindcss&logoColor=white)

---

![Taskly Preview](./src/assets/localhost_5173_png)

## 🔗 Links

- **Live Demo:** [https://taskly-done-feels-good.netlify.app/](https://taskly-done-feels-good.netlify.app/)
- **Repository:** [https://github.com/MahmudaJahan99/Taskly---Done-Feels-Good](https://github.com/MahmudaJahan99/Taskly---Done-Feels-Good)

---

## Features

- **Add, edit, and delete tasks** with a title, due date, and label
- **Label-based organization** — Work, Health, Personal, Study, Other — each with its own page
- **Smart due date indicators** — shows "Due today", "Due tomorrow", "3d overdue", etc.
- **Filter pills** on every page to quickly switch between All, Active, and Done tasks
- **Today view** — tasks due today that aren't completed yet
- **Upcoming view** — future tasks sorted by what's coming next
- **Completed view** — a dedicated archive of everything you've finished
- **Progress bar** — visual completion percentage on every page
- **Global stat cards** on the All Tasks page that stay pinned regardless of active filter
- **Persistent storage** — tasks are saved to `localStorage` and survive page refreshes

---

## Tech Stack

| Concern | Library |
|---|---|
| UI | React 19 |
| Routing | React Router v7 |
| State management | Zustand |
| Styling | Tailwind CSS v4 |
| Build tool | Vite |
| Icons | React Icons |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/taskly.git
cd taskly

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

Output goes to the `dist/` folder, ready to deploy to any static host (Vercel, Netlify, GitHub Pages, etc.).

---

## How It Works

### State

All task data lives in a single Zustand store and is persisted to `localStorage` under the key `taskly-storage`. Each task has the following shape:

```js
{
  id: "uuid",
  title: "Buy groceries",
  label: "personal",       // work | health | personal | study | other
  done: false,
  createdAt: "2025-01-01T00:00:00.000Z",
  dueDate: "2025-01-15"    // YYYY-MM-DD, or null
}
```

### Filtering

Filtering works in two layers:

1. **View filter** — determined by the current route (`/today`, `/upcoming`, `/work`, etc.) and applied in `filterTasks()`
2. **Pill filter** — a secondary filter (All / Active / Done / label name) applied on top of the view result inside `useFilteredTasks()`

The All Tasks page intentionally keeps its three stat cards (Total / Active / Done) pinned to global counts — pill selection only affects the task list and progress bar below.

### Labels

Labels are defined in `src/constants/labels.js` as an array of `{ name, bg, text }` objects. Adding a new label there automatically adds it to the sidebar, the add/edit form dropdowns, the filter pills on All Tasks, and creates a valid route via `LabelPage`.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## License

MIT