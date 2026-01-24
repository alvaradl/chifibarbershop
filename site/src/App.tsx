import { useEffect, useState } from 'react'
import { siteData } from './siteData'
import type { SectionId } from './types'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { SkipLink } from './components/SkipLink'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Services } from './components/Services'
import { Gallery } from './components/Gallery'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Lightbox } from './components/Lightbox'

/**
 * Main application component that renders the barbershop website.
 * Manages active section tracking for navigation highlighting and lightbox state.
 * @returns The complete application with all sections and components.
 */
function App() {
  const [activeSectionId, setActiveSectionId] = useState<SectionId>('home')
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const sectionIds: readonly SectionId[] = ['home', 'about', 'services', 'gallery', 'contact']

  // Track which section is currently visible to highlight in navigation
  useEffect(() => {
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (sectionElements.length === 0) return

    let previousScrollY = window.scrollY

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting)
        if (visibleSections.length === 0) return

        const currentScrollY = window.scrollY
        const isScrollingDown = currentScrollY > previousScrollY
        previousScrollY = currentScrollY

        // Sort visible sections by how much they're visible, then by position
        const sortedSections = visibleSections.sort((sectionA, sectionB) => {
          const ratioA = sectionA.intersectionRatio ?? 0
          const ratioB = sectionB.intersectionRatio ?? 0
          const ratioDifference = ratioB - ratioA

          // If one section is significantly more visible, use that
          if (Math.abs(ratioDifference) > 0.15) {
            return ratioDifference
          }

          // If visibility is similar, use scroll direction to pick the right section
          const sectionATop = sectionA.boundingClientRect.top
          const sectionBTop = sectionB.boundingClientRect.top

          if (isScrollingDown) {
            // When scrolling down, prefer the section higher on the page
            return sectionATop - sectionBTop
          } else {
            // When scrolling up, prefer the section lower on the page
            return sectionBTop - sectionATop
          }
        })

        const selectedSection = sortedSections[0]
        if (!selectedSection?.target?.id) return

        const sectionId = selectedSection.target.id as SectionId
        setActiveSectionId(sectionId)
      },
      {
        root: null,
        rootMargin: '-10% 0px -40% 0px',
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      },
    )

    sectionElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [sectionIds])

  // Handle keyboard navigation in lightbox (arrow keys, escape)
  useEffect(() => {
    if (lightboxImageIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxImageIndex(null)
        return
      }

      const totalImages = siteData.gallery.length
      if (event.key === 'ArrowLeft') {
        const previousIndex =
          lightboxImageIndex === null
            ? null
            : (lightboxImageIndex + totalImages - 1) % totalImages
        setLightboxImageIndex(previousIndex)
      }
      if (event.key === 'ArrowRight') {
        const nextIndex =
          lightboxImageIndex === null ? null : (lightboxImageIndex + 1) % totalImages
        setLightboxImageIndex(nextIndex)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxImageIndex])

  return (
    <div className="min-h-screen text-blue-900">
      <SkipLink />
      <Header
        activeSectionId={activeSectionId}
        prefersReducedMotion={prefersReducedMotion}
      />

      <main id="main" className="mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6">
        <Hero prefersReducedMotion={prefersReducedMotion} />
        <About />
        <Services />
        <Gallery onImageClick={setLightboxImageIndex} />
        <Contact />
      </main>

      <Footer />

      <Lightbox
        imageIndex={lightboxImageIndex}
        onClose={() => setLightboxImageIndex(null)}
        onPrevious={() => {
          if (lightboxImageIndex === null) return
          const totalImages = siteData.gallery.length
          const previousIndex = (lightboxImageIndex + totalImages - 1) % totalImages
          setLightboxImageIndex(previousIndex)
        }}
        onNext={() => {
          if (lightboxImageIndex === null) return
          const totalImages = siteData.gallery.length
          const nextIndex = (lightboxImageIndex + 1) % totalImages
          setLightboxImageIndex(nextIndex)
        }}
      />
    </div>
  )
}

export default App
