import { Link } from "react-router-dom";
import Reveal from "./Reveal";

const facts = [
  { k: "Name", v: "Usman" },
  { k: "Role", v: "Front-End Developer" },
  { k: "Based in", v: "Remote · GMT+5" },
  { k: "Experience", v: "4+ years" },
];

export default function About() {
  return (
    <section
      id='about'
      className='about'>
      <div className='container about__grid'>
        <Reveal className='about__copy'>
          <span className='eyebrow'>About me</span>
          <h2 className='section-title'>
            I craft the <span className='gradient-text'>front of the web</span>
          </h2>
          <p className='about__p'>
            I’m a front-end developer who cares deeply about the details — the
            timing of an animation, the contrast of a button, the millisecond a
            page takes to paint. I bridge design and code, turning Figma files
            into responsive, accessible, production-ready interfaces.
          </p>
          <p className='about__p'>
            My toolkit centres on <strong>React</strong> and{" "}
            <strong>Next.js</strong>, but I’m happiest wherever clean UI and
            smooth UX meet.
          </p>

          <div className='about__facts'>
            {facts.map((f) => (
              <div
                className='about__fact'
                key={f.k}>
                <span className='about__fact-k'>{f.k}</span>
                <span className='about__fact-v'>{f.v}</span>
              </div>
            ))}
          </div>

          <Link
            to='/#contact'
            className='btn btn-primary about__btn'>
            Hire me
          </Link>
        </Reveal>

        <Reveal
          className='about__panel'
          delay={0.15}>
          <div className='about__card glass'>
            <div className='about__card-head'>
              <span className='about__dots'>
                <i />
                <i />
                <i />
              </span>
              <span className='about__file'>usman.js</span>
            </div>
            <pre className='about__code'>
              {`const usman = {
  role: "Front-End Developer",
  stack: ["React", "Next.js", "TS"],
  loves: ["clean UI", "motion"],
  coffee: Infinity,
};

usman.build("something great");`}
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
