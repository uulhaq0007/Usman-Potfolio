import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item = {
  hidden: { y: 26, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stats = [
  { value: "4+", label: "Years experience" },
  { value: "6+", label: "Clients" },
  { value: "15+", label: "Completed projects" },
  // { value: "20+", label: "Achievements" },
];

export default function Hero() {
  return (
    <section
      id='top'
      className='hero'>
      <div className='container'>
        <motion.div
          className='hero__grid'
          variants={container}
          initial='hidden'
          animate='show'>
          {/* Portrait */}
          <motion.div
            className='hero__photo'
            variants={item}>
            <div
              className='hero__photo-glow'
              aria-hidden='true'
            />
            <img
              src='/profile.svg'
              alt='Usman — front-end web developer'
              className='hero__img'
              width='420'
              height='480'
            />
            <span className='hero__badge glass'>
              <span className='hero__pulse' /> Open to work
            </span>
          </motion.div>

          {/* Copy */}
          <div className='hero__copy'>
            <motion.span
              className='hero__hello'
              variants={item}>
              Hello, I’m Usman
            </motion.span>
            <motion.h1
              className='hero__title'
              variants={item}>
              Front-End <span className='gradient-text'>Developer</span>
            </motion.h1>
            <motion.p
              className='hero__lead'
              variants={item}>
              I design and build fast, beautiful, responsive websites — from
              landing pages to full web apps. I turn ideas into pixel-perfect
              interfaces people love to use.
            </motion.p>
            <motion.div
              className='hero__actions'
              variants={item}>
              <a
                href='#about'
                className='btn btn-outline'>
                About me
              </a>
              <a
                href='#work'
                className='btn btn-primary'>
                View work
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className='hero__stats glass'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          {stats.map((s) => (
            <div
              className='hero__stat'
              key={s.label}>
              <span className='hero__stat-value gradient-text'>{s.value}</span>
              <span className='hero__stat-label'>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
