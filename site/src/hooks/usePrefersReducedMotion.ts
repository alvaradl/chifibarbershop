import { useEffect, useState } from 'react'

/**
 * Custom hook that detects if the user prefers reduced motion.
 * Checks the user's system preference for reduced motion animations.
 * @returns True if the user prefers reduced motion, false otherwise.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!mediaQuery) return
    const updatePreference = () => setReduced(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])
  return reduced
}
