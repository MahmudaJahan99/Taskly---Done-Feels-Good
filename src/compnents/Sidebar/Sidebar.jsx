import { Link, NavLink } from 'react-router-dom'
import icon from '/taskly-favicon.svg'

const navItems = [
  { to: '/', label: 'All tasks', count: 0 },
  { to: '/today', label: 'Today', count: 0 },
  { to: '/upcoming', label: 'Upcoming', count: 0 },
  { to: '/done', label: 'Completed' },
]

const labels = [
  { name: 'Work', color: '#FAC775' },
  { name: 'Health', color: '#7BAF7B' },
  { name: 'Personal', color: '#F5C4B3' },
]

export default function Sidebar() {
  return (
    <aside className='w-50 flex flex-col gap-1'>
      {/* Logo */}
      <Link to={"/"} href='#' className='flex items-center gap-2.5 mb-4.5'>
        <div className='w-8 h-8 flex items-center justify-center'>
          <img src={icon} alt="Taskly Logo" />
        </div>
        <span className='logo'>Taskly</span>
      </Link>

      {/* Nav links */}
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `sidebar-navlink ${isActive ? 'active' : ''}`
          }
        >
          {item.label}
          {item.count ? (
            <span className="nav-count">
              {item.count}
            </span>
          ) : ""}
        </NavLink>
      ))}

      {/* Labels section */}
      <p className='uppercase tracking-[0.08em] mt-4 mb-1.5 ml-2.5' style={{ color: 'var(--color-muted)' }}>Labels</p>
      {labels.map(label => (
        <button key={label.name} className='flex items-center gap-2.5 p-2 rounded-lg cursor-pointer'>
          <div className='w-2 h-2 rounded-full' style={{ background: label.color }} />
          {label.name}
        </button>
      ))}
    </aside>
  )
}