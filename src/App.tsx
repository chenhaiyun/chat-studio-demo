import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import StudioPage from './pages/StudioPage'
import ProjectsPage from './pages/ProjectsPage'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/studio/:projectId" element={<StudioPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
