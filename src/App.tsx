import { lazy, Suspense, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useParams,
  Navigate,
} from 'react-router'
import { projects } from './content/projects'
import { SiteLayout } from './components/SiteLayout'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
const ChemistryExperiencePage = lazy(() =>
  import('./pages/subjects/ChemistryExperiencePage').then((m) => ({
    default: m.ChemistryExperiencePage,
  })),
)
import { chemistryExperienceCards } from './content/chemistry/experiences'
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
import { MathematicsTopicPage } from './pages/subjects/MathematicsTopicPage'
import { mathTopics } from './content/mathematics'
import { csTopics } from './content/computer-science'
import { ComputerScienceTopicPage } from './pages/subjects/ComputerScienceTopicPage'
const FireworksDemo = lazy(() =>
  import('./playground/fireworks/FireworksDemo').then((m) => ({
    default: m.FireworksDemo,
  })),
)
const CritterDemo = lazy(() =>
  import('./playground/critters/CritterDemo').then((m) => ({
    default: m.CritterDemo,
  })),
)
const titles: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/chemistry': 'Chemistry',
  '/mathematics': 'Mathematics',
  '/computer-science': 'Computer Science',
  '/projects': 'Projects',
  '/notebook': 'Notebook',
  '/playground': 'Playground',
  '/playground/fireworks': 'Paint a firework',
  '/playground/critterworld': 'CritterWorld / browser edition',
  '/personal': 'Personal corner',
  '/contact': 'Contact',
  '/credits': 'Credits',
}
function LegacyChemistrySnippet() {
  const { slug } = useParams()
  const { search, hash } = useLocation()
  return <Navigate replace to={`/chemistry/snippets/${slug}${search}${hash}`} />
}
function RouteEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = `${titles[pathname] ?? chemistryExperienceCards.find((item) => pathname === `/chemistry/snippets/${item.slug}`)?.title ?? mathTopics.find((topic) => pathname === `/mathematics/topics/${topic.slug}`)?.title ?? csTopics.find((topic) => pathname === `/computer-science/topics/${topic.slug}`)?.title ?? projects.find((project) => pathname === `/projects/${project.slug}`)?.title ?? 'Explore'} · Lichen Huang`
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
        <Route
          path="playground/fireworks"
          element={
            <Suspense
              fallback={<p role="status">Opening the fireworks workshop…</p>}
            >
              <FireworksDemo />
            </Suspense>
          }
        />
        <Route
          path="playground/critterworld"
          element={
            <Suspense fallback={<p role="status">Opening CritterWorld…</p>}>
              <CritterDemo />
            </Suspense>
          }
        />
        <Route path="miniature" element={<SiteLayout miniature />}>
          <Route index element={<HomePage miniature />} />
        </Route>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="chemistry" element={<ChemistryPage />} />
          <Route
            path="chemistry/snippets/:slug"
            element={
              <Suspense
                fallback={<p role="status">Opening the laboratory notebook…</p>}
              >
                <ChemistryExperiencePage />
              </Suspense>
            }
          />
          <Route
            path="chemistry/experiences/:slug"
            element={<LegacyChemistrySnippet />}
          />
          <Route path="mathematics" element={<MathematicsPage />} />
          <Route
            path="mathematics/topics/:slug"
            element={<MathematicsTopicPage />}
          />
          <Route path="computer-science" element={<ComputerSciencePage />} />
          <Route
            path="computer-science/topics/:slug"
            element={<ComputerScienceTopicPage />}
          />
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
