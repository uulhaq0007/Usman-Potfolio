import { Navigate, Route, Routes } from 'react-router-dom'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import ProjectPage from './components/ProjectPage'
import ScrollManager from './components/ScrollManager'
import Skills from './components/Skills'
import CTA from './components/CTA'
import Footer from './components/Footer'
import './styles/sections.css'

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
  return (
    <>
      <ScrollManager />
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
