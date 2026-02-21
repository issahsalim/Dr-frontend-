import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import GalleryPage from './pages/GalleryPage'
import ResearchPage from './pages/ResearchPage'
import PublicationsPage from './pages/PublicationsPage'
import ProjectsPage from './pages/ProjectsPage'
import './App.css'

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="research" element={<ResearchPage />} />
              <Route path="publications" element={<PublicationsPage />} />
              <Route path="projects" element={<ProjectsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
