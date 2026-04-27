import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'All tasks', count: 5 },
  { to: '/today', label: 'Today', count: 3 },
  { to: '/upcoming', label: 'Upcoming', count: 2 },
  { to: '/done', label: 'Completed' },
]

const labels = [
  { name: 'Work', color: '#FAC775' },
  { name: 'Health', color: '#7BAF7B' },
  { name: 'Personal', color: '#F5C4B3' },
]

export default function Sidebar() {
  return (
    <aside style={{
      width: '200px', background: 'var(--color-surface)',
      borderRight: '0.5px solid var(--color-border)',
      padding: '20px 16px', display: 'flex',
      flexDirection: 'column', gap: '4px'
    }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
        <div style={{ width: 32, height: 32, background: 'var(--color-primary)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* inline svg logo mark */}
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--color-text)' }}>Taskly</span>
      </div>

      {/* Nav links */}
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}   /* 'end' prevents '/' matching all routes */
          style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: 9,
            padding: '8px 10px', borderRadius: 8, fontSize: 13,
            textDecoration: 'none',
            background: isActive ? 'var(--color-primary)' : 'transparent',
            color: isActive ? '#fff' : 'var(--color-muted)',
          })}
        >
          {item.label}
          {item.count && (
            <span style={{ marginLeft: 'auto', fontSize: 11, background: 'rgba(0,0,0,0.1)', borderRadius: 10, padding: '1px 7px' }}>
              {item.count}
            </span>
          )}
        </NavLink>
      ))}

      {/* Labels section */}
      <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-muted)', margin: '16px 0 6px 10px' }}>Labels</p>
      {labels.map(label => (
        <button key={label.name} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', borderRadius: 8, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: label.color }} />
          {label.name}
        </button>
      ))}
    </aside>
  )
}