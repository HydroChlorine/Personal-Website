import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import { SiteLayout } from './components/SiteLayout'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ChemistryPage } from './pages/subjects/ChemistryPage'
import { MathematicsPage } from './pages/subjects/MathematicsPage'
import { ComputerSciencePage } from './pages/subjects/ComputerSciencePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { NotebookPage } from './pages/NotebookPage'
import { NoteDetailPage } from './pages/NoteDetailPage'
import { PlaygroundPage } from './pages/PlaygroundPage'
import { PersonalPage } from './pages/PersonalPage'
import { ContactPage } from './pages/ContactPage'
import { CreditsPage } from './pages/CreditsPage'
import { NotFoundPage } from './pages/NotFoundPage'
const titles: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/chemistry': 'Chemistry',
  '/mathematics': 'Mathematics',
  '/computer-science': 'Computer Science',
  '/projects': 'Projects',
  '/notebook': 'Notebook',
  '/playground': 'Playground',
  '/personal': 'Personal corner',
  '/contact': 'Contact',
  '/credits': 'Credits',
}
function RouteEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = `${titles[pathname] ?? 'Explore'} · Lichen Huang`
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [pathname])
  return null
}
export default function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="chemistry" element={<ChemistryPage />} />
          <Route path="mathematics" element={<MathematicsPage />} />
          <Route path="computer-science" element={<ComputerSciencePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="notebook" element={<NotebookPage />} />
          <Route path="notebook/:slug" element={<NoteDetailPage />} />
          <Route path="playground" element={<PlaygroundPage />} />
          <Route path="personal" element={<PersonalPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="credits" element={<CreditsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
