const links = [
  { label: "HOME", href: "#top" },
  { label: "ABOUT", href: "#about" },
  { label: "PROJECT", href: "#work" },
  { label: "CONTACT", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='container footer__inner'>
        <a
          href='#top'
          className='footer__brand'
          aria-label='Usman — home'>
          {/* <span className="nav__mark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 19 L12 5 L19 19" stroke="currentColor" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.5 14 H15.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </span> */}
        </a>

        <ul className='footer__links'>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <p className='footer__copy'>
          {/* © {new Date().getFullYear()} Usman · Built with React &amp; <span className="lime">♥</span> */}
        </p>
      </div>
    </footer>
  );
}
