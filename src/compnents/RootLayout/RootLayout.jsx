import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar.jsx'

export default function RootLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
    </div>
  )
}