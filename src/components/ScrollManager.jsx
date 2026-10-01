import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const STORAGE_KEY = 'scroll-positions'

// Last scroll position of every history entry visited, by location key.
// Kept in sessionStorage across reloads.
const positions = new Map()
try {
  for (const [key, y] of JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]')) {
    positions.set(key, y)
  }
} catch {
  // storage unavailable — positions just won't survive a reload
}

// The browser restores scroll before React has rendered the page being
// returned to, so it lands in the wrong place. Handle it here instead.
history.scrollRestoration = 'manual'

const restore = (key) => {
  if (positions.has(key)) window.scrollTo({ top: positions.get(key), behavior: 'instant' })
}

// Keeps scrolling sensible across route changes:
//   back / forward / reload  → where that entry was left
//   link to "/#id"           → that section
//   a new page               → the top
export default function ScrollManager() {
  const location = useLocation()
  const navType = useNavigationType()
  const current = useRef(null)

  useEffect(() => {
    const save = () => {
      if (current.current) positions.set(current.current.key, window.scrollY)
    }
    const persist = () => {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...positions]))
      } catch {
        // storage unavailable
      }
    }
    window.addEventListener('scroll', save, { passive: true })
    window.addEventListener('pagehide', persist)
    return () => {
      window.removeEventListener('scroll', save)
      window.removeEventListener('pagehide', persist)
    }
  }, [])

  useLayoutEffect(() => {
    const from = current.current
    current.current = location
    const pageChanged = !!from && from.pathname !== location.pathname

    if (!from) {
      // First render: only a fresh visit goes to its "#id"; a reload or a
      // history jump from another site goes back to where it was.
      const nav = performance.getEntriesByType('navigation')[0]
      if (nav && nav.type !== 'navigate') return restore(location.key)
      // every freshly opened page starts with the same key — drop its old value
      positions.delete(location.key)
    } else if (navType === 'POP') {
      return restore(location.key)
    }

    if (location.hash) {
      document
        .getElementById(location.hash.slice(1))
        ?.scrollIntoView({ behavior: pageChanged ? 'instant' : 'auto' })
    } else if (pageChanged) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location, navType])

  return null
}
