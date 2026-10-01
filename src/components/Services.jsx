import { Link } from 'react-router-dom'
import { services } from '../data/services'
import Reveal from './Reveal'

const icons = {
  code: (
    <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 9h18M9 9v11" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  rocket: (
    <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2m8.5-12.5a5 5 0 0 1 0 5L11 18l-5-5 7.5-7.5a5 5 0 0 1 5 0ZM15 9h.01"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
}

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <Reveal className="section-center services__head">
          <span className="eyebrow">What I do</span>
          <h2 className="section-title">Services</h2>
          <p className="section-lead">
            End-to-end front-end — from the first wireframe to the final deploy.
          </p>
        </Reveal>

        <div className="services__grid">
          {services.map((s, i) => (
            <Reveal
              key={s.id}
              delay={i * 0.1}
              className={`services__card glass tilt ${s.featured ? 'is-featured' : ''}`}
            >
              <span className="services__icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  {icons[s.icon]}
                </svg>
              </span>
              <h3 className="services__title">{s.title}</h3>
              <p className="services__blurb">{s.blurb}</p>
              <Link to="/#work" className="services__more">
                Learn more
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
