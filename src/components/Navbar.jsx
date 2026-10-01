import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// Sections live on the home page, so links are "/#id" and work from any page.
const links = [
  { label: "HOME", href: "/#top", id: "top" },
  { label: "ABOUT", href: "/#about", id: "about" },
  { label: "PROJECT", href: "/#work", id: "work" },
  { label: "CONTACT", href: "/#contact", id: "contact" },
];

export default function Navbar() {
  const onHome = useLocation().pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-spy: highlight the link of the section in view
  // (a project page has no sections — keep PROJECT highlighted there)
  useEffect(() => {
    if (!onHome) {
      setActive("work");
      return;
    }
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [onHome]);

  return (
    <motion.header
      className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      <nav className='nav__inner container'>
        {/* <a href="#top" className="nav__brand" aria-label="Usman — home">
          <span className="nav__mark">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 19 L12 5 L19 19" stroke="currentColor" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.5 14 H15.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </span>
        </a> */}

        <ul className={`nav__links ${open ? "is-open" : ""}`}>
          {links.map((l) => (
            <li key={l.href}>
              <Link
                to={l.href}
                className={active === l.id ? "is-active" : ""}
                onClick={() => setOpen(false)}>
                {active === l.id && (
                  <motion.span
                    className='nav__pill'
                    layoutId='nav-pill'
                  />
                )}
                <span className='nav__label'>{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={`nav__burger ${open ? "is-open" : ""}`}
          aria-label='Toggle menu'
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}>
          <span />
          <span />
          <span />
        </button>
      </nav>
    </motion.header>
  );
}
