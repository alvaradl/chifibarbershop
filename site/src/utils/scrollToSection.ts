/**
 * Scrolls the page to a specific section by its ID.
 * Respects the user's reduced motion preference.
 * @param sectionId - The ID of the section element to scroll to.
 * @param prefersReducedMotion - Whether the user prefers reduced motion.
 */
export function scrollToSection(sectionId: string, prefersReducedMotion: boolean) {
  const element = document.getElementById(sectionId)
  if (!element) return
  element.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  })
}
