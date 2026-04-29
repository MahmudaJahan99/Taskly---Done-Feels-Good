import { useState } from 'react'
import { LABEL_COLORS } from '../../constants/labels'
import useTaskStore from '../../store/taskStore'

function formatDueDate(dueDate) {
  if (!dueDate) return null;

  const today = new Date();
  const due = new Date(dueDate + 'T00:00:00'); // force local time, not UTC
  const diffDays = Math.round((due - today.setHours(0, 0, 0, 0)) / 86_400_000);

  if (diffDays < 0) return { label: `${Math.abs(diffDays)}d overdue`, color: 'text-red-500' };
  if (diffDays === 0) return { label: 'Due today', color: 'text-(--color-primary)' };
  if (diffDays === 1) return { label: 'Due tomorrow', color: 'text-(--color-muted)' };
  return { label: `Due ${due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`, color: 'text-(--color-muted)' };
}

export default function TaskItem({ task }) {
  const toggleTask = useTaskStore((s) => s.toggleDone)
  const deleteTask = useTaskStore((s) => s.deleteTask)
  const editTask = useTaskStore((s) => s.editTask)

  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(task.title)
  const [draftLabel, setDraftLabel] = useState(task.label)
  const [draftDue, setDraftDue] = useState(task.dueDate ?? '')

  const dueInfo = formatDueDate(task.dueDate)

  function handleSave() {
    if (draft.trim()) {
      editTask(task.id, {
        title: draft.trim(),
        label: draftLabel,
        dueDate: draftDue || null,
      })
    }
    setEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') {
      setDraft(task.title)
      setDraftLabel(task.label)
      setDraftDue(task.dueDate ?? '')
      setEditing(false)
    }
  }

  const labelColor = LABEL_COLORS.find((l) => l.name === task.label)
    ?? LABEL_COLORS[0]

  return (
    <li
      className="flex items-center gap-3 p-3 rounded-lg border border-(--color-border) bg-white"
      style={{ '--label-bg': labelColor.bg, '--label-text': labelColor.text }}
    >
      <input
        type="checkbox"
        checked={task.done}
        aria-label={`Mark "${task.title}" as ${task.done ? 'active' : 'done'}`}
        onChange={() => toggleTask(task.id)}
        className="accent-(--color-primary) w-4 h-4 cursor-pointer flex-shrink-0"
      />

      <div className="flex-1 flex flex-col gap-1 min-w-0">
        {editing ? (
          <>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              className="text-sm border px-1 rounded"
              autoFocus
            />

            <div className="flex gap-2">
              <select
                value={draftLabel}
                onChange={(e) => setDraftLabel(e.target.value)}
                className="text-xs border rounded px-1"
              >
                {LABEL_COLORS.map((l) => (
                  <option key={l.name} value={l.name}>
                    {l.name.charAt(0).toUpperCase() + l.name.slice(1)}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={draftDue}
                onChange={(e) => setDraftDue(e.target.value)}
                className="text-xs border rounded px-1"
              />
            </div>
          </>
        ) : (
          <>
            <span className={`text-sm transition-opacity ${task.done ? 'line-through opacity-50' : ''}`}>
              {task.title}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full capitalize"
                style={{ background: 'var(--label-bg)', color: 'var(--label-text)' }}>
                {task.label}
              </span>
              {!task.done && dueInfo && (
                <span className={`text-xs ${dueInfo.color}`}>{dueInfo.label}</span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-auto">
        {!task.done && (
          editing ? (
            <button onClick={handleSave} className="text-xs cursor-pointer text-(--color-primary)">
              Save
            </button>
          ) : (
            <button onClick={() => setEditing(true)} className="text-xs cursor-pointer text-(--color-primary)">
              Edit
            </button>
          )
        )}
        <button onClick={() => deleteTask(task.id)} className="text-xs cursor-pointer text-(--color-danger)">
          Delete
        </button>
      </div>
    </li>
  )
}