import { useEffect, useRef } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import ProjectPage from './components/ProjectPage'
import Skills from './components/Skills'
import CTA from './components/CTA'
import Footer from './components/Footer'
import './styles/sections.css'

// Scroll to the #section in the URL, or to the top of a newly opened page.
// Back/forward is left alone so the browser restores the previous position.
function useScrollOnNavigate() {
  const location = useLocation()
  const navType = useNavigationType()
  const prevPath = useRef(location.pathname)
  const firstLoad = useRef(true)

  useEffect(() => {
    const pageChanged = prevPath.current !== location.pathname
    prevPath.current = location.pathname
    const isFirstLoad = firstLoad.current
    firstLoad.current = false
    if (navType === 'POP' && !isFirstLoad) return

    if (location.hash) {
      document
        .getElementById(location.hash.slice(1))
        ?.scrollIntoView({ behavior: pageChanged ? 'instant' : 'auto' })
    } else if (pageChanged) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location, navType])
}

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Skills />
      <CTA />
    </main>
  )
}

export default function App() {
  useScrollOnNavigate()

  return (
    <>
      <Background />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}
