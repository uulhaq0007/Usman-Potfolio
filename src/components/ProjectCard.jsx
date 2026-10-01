import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

// Glass project card with pointer-driven 3D tilt + sheen.
// The card is a link to the project's page, /projects/<slug>.
export default function ProjectCard({ project, index = 0 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(py - 0.5) * -8}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 10}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <MotionLink
      ref={ref}
      to={`/projects/${project.slug}`}
      className='project-card glass tilt'
      style={{ "--accent": project.accent }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      aria-label={`${project.title} — view gallery`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}>
      <div className='project-card__inner'>
        <div className='project-card__thumb'>
          {project.cover ?
            <img
              className='project-card__img'
              src={project.cover}
              alt={project.title}
              loading='lazy'
            />
          : <div
              className='project-card__mock'
              aria-hidden='true'>
              <span className='project-card__mock-bar'>
                <i />
                <i />
                <i />
              </span>
              <span className='project-card__mock-logo'>
                {project.title.charAt(0)}
              </span>
            </div>
          }
          {project.year && (
            <span className='project-card__year'>{project.year}</span>
          )}
          {project.featured && (
            <span className='project-card__star'>★ Featured</span>
          )}

          <div className='project-card__overlay'>
            <span className='project-card__view'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'>
                <rect
                  x='3'
                  y='3'
                  width='18'
                  height='18'
                  rx='3'
                  stroke='currentColor'
                  strokeWidth='2'
                />
                <circle
                  cx='9'
                  cy='9'
                  r='1.6'
                  fill='currentColor'
                />
                <path
                  d='M21 15l-5-5L7 19'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              View gallery
              {project.images.length > 0 ? ` (${project.images.length})` : ""}
            </span>

            {/* {(project.live || project.code) && (
              <span className="project-card__links">
                {project.live && (
                  <a href={project.live} className="project-card__icon" aria-label="Live demo"
                    target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
                {project.code && (
                  <a href={project.code} className="project-card__icon" aria-label="Source code"
                    target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </span> 
            )}*/}
          </div>
        </div>

        <div className='project-card__body'>
          <span className='project-card__cat'>{project.category}</span>
          <h3 className='project-card__title'>{project.title}</h3>
          {project.blurb && (
            <p className='project-card__blurb'>{project.blurb}</p>
          )}
          {project.tags.length > 0 && (
            <ul className='project-card__tags'>
              {project.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </MotionLink>
  );
}
