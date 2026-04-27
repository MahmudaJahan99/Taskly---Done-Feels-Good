import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar.jsx'

export default function RootLayout() {
  return (
    <div className='flex min-h-screen bg-(--color-bg)'>
      <Sidebar />
      <main className='flex-1 flex flex-col'>
        <Outlet />
      </main>
    </div>
  )
}