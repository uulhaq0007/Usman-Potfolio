import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'

export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  const [active, setActive] = useState(null)
  const visible = showAll ? projects : projects.slice(0, 4)

  return (
    <section id="work" className="work">
      <div className="container">
        <Reveal className="section-center work__head">
          <span className="eyebrow">Portfolio</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-lead">
            A selection of recent builds — from landing pages to full web apps.
          </p>
        </Reveal>

        <motion.div layout className="work__grid">
          {visible.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={setActive} />
          ))}
        </motion.div>

        {projects.length > 4 && (
          <Reveal className="section-center work__viewall" delay={0.1}>
            <button className="btn btn-outline" onClick={() => setShowAll((s) => !s)}>
              {showAll ? 'Show less' : 'View all'}
            </button>
          </Reveal>
        )}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
