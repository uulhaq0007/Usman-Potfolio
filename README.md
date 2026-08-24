# Usman · Portfolio

A fancy **glassmorphism** portfolio for a front-end web developer — built with
**Vite + React + Framer Motion**. Frosted-glass cards, an animated gradient-blob
background, a glowing custom cursor, 3D-tilt project cards, and a filterable work
gallery.

The design system (palette, fonts, glass tokens, motion timings) was generated
with the [UI/UX Pro Max skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
and lives in `.claude/skills/ui-ux-pro-max/`.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in /dist
npm run preview  # preview the build
```

## Make it yours

| What | Where |
|------|-------|
| **Your projects / websites** | `src/data/projects.js` — edit title, blurb, tags, `live`/`code` links. Add a real screenshot by dropping an image in `public/` and referencing it. |
| **Name, bio, stats** | `src/components/Hero.jsx`, `src/components/About.jsx` |
| **Skills** | `src/components/Skills.jsx` |
| **Email & socials** | `src/components/Contact.jsx` |
| **Colors / glass / fonts** | CSS variables at the top of `src/index.css` |

## Tech

- React 18 + Vite 5
- Framer Motion (scroll reveals, layout filter animation, card transitions)
- Pure CSS glassmorphism (`backdrop-filter`), no UI library
- Fonts: **Archivo** (headings) + **Space Grotesk** (body)
- Fully responsive, keyboard-accessible, honours `prefers-reduced-motion`

## Deploy

It's a static site — drop the `dist/` folder on **Vercel**, **Netlify**, or
**GitHub Pages**. On Vercel/Netlify just point at the repo; build command
`npm run build`, output dir `dist`.
