import './index.css'
import { Routes, Route } from 'react-router-dom'
import RootLayout from './components/RootLayout/RootLayout.jsx'
import AllTasks from './pages/AllTasks.jsx'
import TodayTasks from './pages/TodayTasks.jsx'
import UpcomingTasks from './pages/UpcomingTasks.jsx'
import CompletedTasks from './pages/CompletedTasks.jsx'
import WorkTasks from './pages/WorkTasks.jsx'
import HealthTasks from './pages/HealthTasks.jsx'
import PersonalTasks from './pages/PersonalTasks.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<AllTasks />} />
        <Route path="today" element={<TodayTasks />} />
        <Route path="upcomingTasks" element={<UpcomingTasks />} />
        <Route path="done" element={<CompletedTasks />} />
        <Route path="work" element={<WorkTasks />} />
        <Route path="health" element={<HealthTasks />} />
        <Route path="personal" element={<PersonalTasks />} />
      </Route>
    </Routes>
  )
}