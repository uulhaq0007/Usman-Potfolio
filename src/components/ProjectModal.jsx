import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Fullscreen modal that shows every image in a project's folder, each
// labelled with its (prettified) file name. Closes on backdrop / Esc / ✕.
export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="modal__panel glass"
            style={{ '--accent': project.accent }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} gallery`}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="modal__head">
              <div>
                {project.category && <span className="modal__cat">{project.category}</span>}
                <h3 className="modal__title">{project.title}</h3>
              </div>
              <button className="modal__close" onClick={onClose} aria-label="Close gallery">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" />
                </svg>
              </button>
            </header>

            {project.blurb && <p className="modal__blurb">{project.blurb}</p>}

            {project.images.length > 0 ? (
              <div className="modal__gallery">
                {project.images.map((img) => (
                  <figure className="modal__item" key={img.url}>
                    <img src={img.url} alt={img.name} loading="lazy" />
                    <figcaption>{img.name}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <p className="modal__empty">
                No images in this project folder yet — drop some into{' '}
                <code>src/projects/{project.id}/</code>.
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
