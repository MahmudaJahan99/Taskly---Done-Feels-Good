import { Link, NavLink } from 'react-router-dom'
import './Sidebar.css'
import icon from '/taskly-favicon.svg'
import { IoCheckboxOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import useTaskStore from '../../store/taskStore';
import { LABEL_COLORS } from '../../constants/labels';

export default function Sidebar() {

  const tasks = useTaskStore(state => state.tasks)

  const allCount = tasks.length;

  const todayStr = new Date().toLocaleDateString("en-CA");
  const todayCount = tasks.filter((task) => task.dueDate === todayStr && !task.done).length;

  const completedCount = tasks.filter(task => task.done).length;

  const upcomingCount = tasks.filter((task) => {
    if (task.done || !task.dueDate) return false;
    const diffDays = Math.round(
      (new Date(task.dueDate + "T00:00:00") - new Date().setHours(0, 0, 0, 0)) / 86_400_000
    );
    return diffDays > 0;
  }).length;

  const navItems = [
    { to: '/', icon: <IoCheckboxOutline />, label: 'All tasks', count: allCount },
    { to: '/today', icon: <MdAccessTime />, label: 'Today', count: todayCount },
    { to: '/upcoming', icon: <CiCalendar />, label: 'Upcoming', count: upcomingCount },
    { to: '/done', icon: <IoCheckmarkCircleOutline />, label: 'Completed', count: completedCount },
  ]

  const labels = LABEL_COLORS;

  return (
    <aside className='w-50 flex flex-col gap-1'>
      {/* Logo */}
      <Link to={"/"} className='flex items-center gap-2 mb-4.5'>
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
          <span className='flex items-center gap-2'>
            {item.icon}
            {item.label}
          </span>
          {item.count ? (
            <span className="nav-count">
              {item.count}
            </span>
          ) : ""}
        </NavLink>
      ))}

      {/* Labels section */}
      <p className='uppercase tracking-[0.08em] mt-4 mb-1.5 ml-2.5 text-(--color-muted)'>Labels</p>

      {labels.map(label => (
        <NavLink
          key={label.name}
          to={`/${label.name}`}
          end
          className={({ isActive }) =>
            `sidebar-navlink ${isActive ? 'active' : ''}`
          }
        >
          <span className="w-2.5 h-2.5 rounded-full ml-0.5"
            style={{ backgroundColor: label.bg }}>
          </span>
          <span className='capitalize'>
            {label.name}
          </span>
        </NavLink>
      ))}
    </aside>
  )
}