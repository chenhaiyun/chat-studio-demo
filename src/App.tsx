import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import StudioPage from './pages/StudioPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/studio/:projectId" element={<StudioPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
