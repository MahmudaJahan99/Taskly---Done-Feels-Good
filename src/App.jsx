import './index.css'
import { Routes, Route } from 'react-router-dom'
import RootLayout from './components/RootLayout/RootLayout.jsx'
import AllTasks from './pages/AllTasks.jsx'
import TodayTasks from './pages/TodayTasks.jsx'
import UpcomingTasks from './pages/UpcomingTasks.jsx'
import CompletedTasks from './pages/CompletedTasks.jsx'
import LabelPage from './pages/LabelPage.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<AllTasks />} />
        <Route path="today" element={<TodayTasks />} />
        <Route path="upcoming" element={<UpcomingTasks />} />
        <Route path="done" element={<CompletedTasks />} />
        <Route path="/:label" element={<LabelPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}