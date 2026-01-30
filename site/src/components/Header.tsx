import { useEffect, useState } from 'react'
import { siteData } from '../siteData'
import type { SectionId } from '../types'
import { scrollToSection } from '../utils/scrollToSection'
import { classNames } from '../utils/classNames'

/**
 * Main navigation header component with desktop and mobile menu.
 * Highlights the currently active section in the navigation.
 * @param props - Component props.
 * @param props.activeSectionId - The ID of the currently visible section.
 * @param props.prefersReducedMotion - Whether the user prefers reduced motion.
 * @returns The header navigation component.
 */
export function Header({
  activeSectionId,
  prefersReducedMotion,
}: {
  activeSectionId: SectionId
  prefersReducedMotion: boolean
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Location / Contact' },
  ] as const

  // Close mobile menu when window is resized
  useEffect(() => {
    const handleResize = () => setIsMobileMenuOpen(false)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="glass neon-ring mt-3 rounded-2xl bg-[#F5F1E8]">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              onClick={() => scrollToSection('home', prefersReducedMotion)}
              className="group flex items-center gap-2 rounded-xl px-2 py-1 text-left focus:outline-none focus:ring-2 focus:ring-[#FF8C42]/70"
              aria-label={`${siteData.name} — go to top`}
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-50 p-1 ring-1 ring-blue-200">
                <img
                  src="/barber-pole.png"
                  alt=""
                  className="h-full w-full object-contain"
                  aria-hidden="true"
                />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold tracking-tight">
                  {siteData.name}
                </span>
                <span className="block text-xs text-muted">{siteData.tagline}</span>
              </span>
            </button>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
              {navigationLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id, prefersReducedMotion)}
                  className={classNames(
                    'rounded-xl px-3 py-2 text-sm font-medium transition',
                    'hover:bg-blue-50 hover:ring-1 hover:ring-blue-200',
                    activeSectionId === link.id
                      ? 'bg-blue-50 ring-1 ring-[#FF8C42]/40 text-[#FF8C42]'
                      : 'text-blue-900/85',
                  )}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={`tel:${siteData.phoneTel}`}
                className="ml-1 inline-flex items-center gap-2 rounded-xl bg-[#FF8C42] px-3 py-2 text-sm font-semibold text-black transition hover:bg-[#FFA366] focus:outline-none focus:ring-2 focus:ring-[#FF8C42]/70"
                aria-label={`Book appointment by calling ${siteData.phoneDisplay}`}
              >
                Book (Call)
                <span className="text-black/70">{siteData.phoneDisplay}</span>
              </a>
            </nav>

            <button
              type="button"
              className="md:hidden rounded-xl px-3 py-2 text-sm font-semibold ring-1 ring-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]/70"
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              Menu
            </button>
          </div>

          <div
            id="mobile-nav"
            className={classNames(
              'border-t border-blue-200 px-3 pb-3 md:hidden bg-[#F5F1E8]',
              isMobileMenuOpen ? 'block' : 'hidden',
            )}
          >
            <div className="grid gap-1 pt-3">
              {navigationLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    scrollToSection(link.id, prefersReducedMotion)
                  }}
                  className={classNames(
                    'rounded-xl px-3 py-2 text-left text-sm font-semibold transition',
                    activeSectionId === link.id
                      ? 'bg-blue-50 text-[#FF8C42]'
                      : 'hover:bg-blue-50',
                  )}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={`tel:${siteData.phoneTel}`}
                className="mt-1 rounded-xl bg-[#FF8C42] px-3 py-2 text-sm font-semibold text-black transition hover:bg-[#FFA366]"
              >
                Book Appointment (Call) — {siteData.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
