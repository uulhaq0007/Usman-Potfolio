import { useState } from 'react'
import Reveal from './Reveal'
import ContactModal from './ContactModal'

export default function CTA() {
  const [open, setOpen] = useState(false)

  return (
    <section id="contact" className="cta">
      <div className="container">
        <Reveal className="cta__card glass">
          <span className="cta__glow" aria-hidden="true" />
          <div className="cta__text">
            <h2 className="cta__title">
              Let’s work together on<br />
              <span className="gradient-text">your next project</span>
            </h2>
            <p className="cta__lead">
              Available for freelance &amp; full-time. Tell me what you’re building —
              I’ll reply within a day.
            </p>
          </div>
          <button type="button" className="btn btn-primary cta__btn" onClick={() => setOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Contact
          </button>
        </Reveal>
      </div>

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
