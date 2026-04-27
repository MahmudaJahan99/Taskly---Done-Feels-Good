import './index.css'
import { Routes, Route } from 'react-router-dom'
import RootLayout from './compnents/RootLayout/RootLayout.jsx'
import AllTasks from './pages/AllTasks.jsx'
import Today from './pages/Today.jsx'
import Upcoming from './pages/Upcoming.jsx'
import Completed from './pages/Completed.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<AllTasks />} />
        <Route path="today" element={<Today />} />
        <Route path="upcoming" element={<Upcoming />} />
        <Route path="done" element={<Completed />} />
      </Route>
    </Routes>
  )
}