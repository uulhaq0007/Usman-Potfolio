import { skills } from '../data/skills'
import Reveal from './Reveal'

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <Reveal className="section-center skills__head">
          <span className="eyebrow">Tech stack</span>
          <h2 className="section-title">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-lead">
            The tools &amp; frameworks I build with every day — and more.
          </p>
        </Reveal>

        <div className="skills__grid">
          {skills.map((s, i) => {
            const Icon = s.Icon
            return (
              <Reveal
                as="article"
                key={s.name}
                delay={(i % 6) * 0.06}
                className="skills__card glass"
              >
                <span
                  className="skills__badge"
                  style={{ color: s.color, background: `${s.color}1f`, borderColor: `${s.color}55` }}
                  aria-hidden="true"
                >
                  <Icon size={24} />
                </span>
                <span className="skills__name">{s.name}</span>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
