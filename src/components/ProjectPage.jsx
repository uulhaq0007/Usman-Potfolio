import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'

// Project detail page at /projects/<slug>. Shows every image in the project's
// folder, each labelled with its (prettified) file name.
export default function ProjectPage() {
  const { slug } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const project = projects.find((p) => p.slug === slug)

  useEffect(() => {
    if (!project) return
    const prev = document.title
    document.title = `${project.title} · Usman`
    return () => {
      document.title = prev
    }
  }, [project])

  // Came from the home page → step back in history so the grid is where it was
  // left. Opened directly (shared link, new tab) → fall through to /#work.
  const goBack = (e) => {
    if (location.key === 'default') return
    e.preventDefault()
    navigate(-1)
  }

  const backLink = (
    <Link to="/#work" className="project-page__back" onClick={goBack}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      All projects
    </Link>
  )

  if (!project) {
    return (
      <main className="project-page">
        <div className="container">
          {backLink}
          <div className="project-page__panel glass">
            <h1 className="project-page__title">Project not found</h1>
            <p className="project-page__empty">
              There is no project at <code>{location.pathname}</code>.
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="project-page">
      <div className="container">
        {backLink}

        <motion.article
          className="project-page__panel glass"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <header className="project-page__head">
            {project.category && <span className="project-page__cat">{project.category}</span>}
            <h1 className="project-page__title">{project.title}</h1>
          </header>

          {project.blurb && <p className="project-page__blurb">{project.blurb}</p>}

          {project.images.length > 0 ? (
            <div className="project-page__gallery">
              {project.images.map((img) => (
                <figure className="project-page__item" key={img.url}>
                  <img src={img.url} alt={img.name} loading="lazy" />
                  <figcaption>{img.name}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <p className="project-page__empty">
              No images in this project folder yet — drop some into{' '}
              <code>src/projects/{project.id}/</code>.
            </p>
          )}
        </motion.article>
      </div>
    </main>
  )
}
