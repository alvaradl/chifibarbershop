import { useEffect, useMemo, useRef, useState } from 'react'
import { siteData } from './siteData'

function App() {
  const [activeId, setActiveId] = useState<
    'home' | 'about' | 'services' | 'gallery' | 'contact'
  >('home')
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const sectionIds = useMemo(
    () => ['home', 'about', 'services', 'gallery', 'contact'] as const,
    [],
  )

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (!els.length) return

    let lastScrollY = window.scrollY

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return

        const currentScrollY = window.scrollY
        const scrollingDown = currentScrollY > lastScrollY
        lastScrollY = currentScrollY

        // Sort by intersection ratio first
        const sorted = visible.sort((a, b) => {
          const ratioDiff = (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          if (Math.abs(ratioDiff) > 0.15) return ratioDiff
          
          // If ratios are close, use scroll direction to determine priority
          const aTop = a.boundingClientRect.top
          const bTop = b.boundingClientRect.top
          
          // When scrolling down, prefer the section that's higher (smaller top value)
          // When scrolling up, prefer the section that's lower (larger top value)
          if (scrollingDown) {
            return aTop - bTop
          } else {
            return bTop - aTop
          }
        })

        const selected = sorted[0]
        if (!selected?.target?.id) return
        const id = selected.target.id as typeof activeId
        setActiveId(id)
      },
      { root: null, rootMargin: '-10% 0px -40% 0px', threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6] },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  useEffect(() => {
    if (lightboxIdx === null) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null)
      if (e.key === 'ArrowLeft')
        setLightboxIdx((i) => (i === null ? i : (i + siteData.gallery.length - 1) % siteData.gallery.length))
      if (e.key === 'ArrowRight')
        setLightboxIdx((i) => (i === null ? i : (i + 1) % siteData.gallery.length))
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxIdx])

  return (
    <div className="min-h-screen text-blue-900">
      <SkipLink />
      <Header activeId={activeId} prefersReducedMotion={prefersReducedMotion} />

      <main id="main" className="mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6">
        <Hero prefersReducedMotion={prefersReducedMotion} />
        <About />
        <Services />
        <Gallery onOpen={setLightboxIdx} />
        <Contact />
      </main>

      <Footer />

      <Lightbox
        idx={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onPrev={() =>
          setLightboxIdx((i) =>
            i === null ? i : (i + siteData.gallery.length - 1) % siteData.gallery.length,
          )
        }
        onNext={() =>
          setLightboxIdx((i) => (i === null ? i : (i + 1) % siteData.gallery.length))
        }
      />
    </div>
  )
}

export default App

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])
  return reduced
}

function scrollToId(id: string, prefersReducedMotion: boolean) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  })
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-xl focus:bg-[#F5F1E8] focus:px-4 focus:py-2 focus:text-sm focus:text-blue-900 focus:ring-2 focus:ring-[#FF8C42]/70"
    >
      Skip to content
    </a>
  )
}

function Header({
  activeId,
  prefersReducedMotion,
}: {
  activeId: 'home' | 'about' | 'services' | 'gallery' | 'contact'
  prefersReducedMotion: boolean
}) {
  const [open, setOpen] = useState(false)

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Location / Contact' },
  ] as const

  useEffect(() => {
    const onResize = () => setOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="glass neon-ring mt-3 rounded-2xl bg-[#F5F1E8]">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              onClick={() => scrollToId('home', prefersReducedMotion)}
              className="group flex items-center gap-2 rounded-xl px-2 py-1 text-left focus:outline-none focus:ring-2 focus:ring-[#FF8C42]/70"
              aria-label={`${siteData.name} — go to top`}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-200">
                <span className="text-base font-semibold tracking-tight text-[#FF8C42]">
                  C
                </span>
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold tracking-tight">
                  {siteData.name}
                </span>
                <span className="block text-xs text-muted">{siteData.tagline}</span>
              </span>
            </button>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
              {links.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => scrollToId(l.id, prefersReducedMotion)}
                  className={cx(
                    'rounded-xl px-3 py-2 text-sm font-medium transition',
                    'hover:bg-blue-50 hover:ring-1 hover:ring-blue-200',
                    activeId === l.id
                      ? 'bg-blue-50 ring-1 ring-[#FF8C42]/40 text-[#FF8C42]'
                      : 'text-blue-900/85',
                  )}
                >
                  {l.label}
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
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              Menu
            </button>
          </div>

          <div
            id="mobile-nav"
            className={cx(
              'border-t border-blue-200 px-3 pb-3 md:hidden bg-[#F5F1E8]',
              open ? 'block' : 'hidden',
            )}
          >
            <div className="grid gap-1 pt-3">
              {links.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    scrollToId(l.id, prefersReducedMotion)
                  }}
                  className={cx(
                    'rounded-xl px-3 py-2 text-left text-sm font-semibold transition',
                    activeId === l.id ? 'bg-blue-50 text-[#FF8C42]' : 'hover:bg-blue-50',
                  )}
                >
                  {l.label}
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

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28 py-10 sm:py-14">
      <div className="mb-6">
        <div className="text-xs font-semibold tracking-[0.22em] text-[#FF8C42]">
          {eyebrow}
        </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl text-blue-900">
              {title}
            </h2>
      </div>
      {children}
    </section>
  )
}

function Hero({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const heroImg = siteData.gallery[0]?.src
  return (
    <section id="home" className="scroll-mt-28 pb-10 pt-2 sm:pb-14">
      <div className="glass neon-ring relative overflow-hidden rounded-3xl bg-[#F5F1E8]">
        <div className="absolute inset-0">
          {heroImg ? (
            <img
              src={heroImg}
              alt=""
              className="h-full w-full object-cover opacity-20"
              aria-hidden="true"
            />
          ) : null}
          <div className="absolute inset-0 bg-blue-900/80" />
        </div>

        <div className="relative px-6 py-10 sm:px-10 sm:py-14">
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <div
              className={cx(
                'pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl',
                prefersReducedMotion ? 'opacity-40' : 'animate-pulse',
              )}
              style={{
                background: 'rgba(255,140,66,0.2)',
              }}
            />
          </div>

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FF8C42]/20 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] text-[#FF8C42] ring-1 ring-[#FF8C42]/30">
              {siteData.hero.eyebrow}
              <span className="h-1 w-1 rounded-full bg-[#FF8C42]/60" />
              Minneapolis
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl text-white">
              <span className="block">{siteData.hero.headlineTop}</span>
              <span className="block text-accent">{siteData.hero.headlineBottom}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
              {siteData.hero.subhead}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`tel:${siteData.phoneTel}`}
                className="inline-flex items-center justify-center rounded-2xl bg-[#FF8C42] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#FFA366] focus:outline-none focus:ring-2 focus:ring-[#FF8C42]/70"
              >
                Book Now (Call) — {siteData.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={() => scrollToId('gallery', prefersReducedMotion)}
                className="inline-flex items-center justify-center rounded-2xl bg-[#F5F1E8] px-5 py-3 text-sm font-semibold text-blue-900 ring-1 ring-blue-300 transition hover:bg-blue-50 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                View Gallery
              </button>
              <a
                href={siteData.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[#F5F1E8] px-5 py-3 text-sm font-semibold text-blue-900/90 ring-1 ring-blue-300 transition hover:bg-blue-50 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Get Directions
              </a>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="glass rounded-2xl p-5 bg-[#F5F1E8]">
              <div className="text-xs font-semibold tracking-[0.22em] text-[#FF8C42]">
                LOCATION
              </div>
              <div className="mt-2 text-sm font-semibold text-blue-900">{siteData.addressLine1}</div>
              <div className="text-sm text-muted">{siteData.addressLine2}</div>
              <a
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900 ring-1 ring-blue-200 hover:bg-blue-200"
                href={siteData.mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open in Maps
              </a>
            </div>
            <div className="glass rounded-2xl p-5 bg-[#F5F1E8]">
              <div className="text-xs font-semibold tracking-[0.22em] text-[#FF8C42]">
                HOURS
              </div>
              <div className="mt-3 grid gap-2">
                {siteData.hours.map((h) => (
                  <div key={h.label} className="flex items-center justify-between text-sm">
                    <div className="text-blue-900/90">{h.label}</div>
                    <div className="text-muted">{h.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5 bg-[#F5F1E8]">
              <div className="text-xs font-semibold tracking-[0.22em] text-[#FF8C42]">
                SHOP INFO
              </div>
              <div className="mt-3 grid gap-3">
                {siteData.shopHighlights.slice(0, 3).map((x) => (
                  <div key={x.title} className="rounded-2xl bg-blue-50 p-4 ring-1 ring-blue-200">
                    <div className="text-sm font-semibold text-blue-900">{x.title}</div>
                    <div className="mt-1 text-sm text-muted">{x.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <Section id="about" eyebrow="ABOUT" title="Built for consistency. Styled for confidence.">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="glass neon-ring rounded-2xl p-6 bg-[#F5F1E8]">
          <p className="text-muted">
            {siteData.owner} focuses on details: clean blends, sharp lines, and a finish
            that holds up days later. Whether you want a classic look or something modern,
            you’ll leave fresh.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Feature title="Precision" desc="Crisp edges & clean fades." />
            <Feature title="Comfort" desc="Relaxed, professional vibe." />
            <Feature title="Consistency" desc="Same standard, every visit." />
            <Feature title="Fast booking" desc="Call to get scheduled." />
          </div>
        </div>
        {siteData.gallery[1] && (
          <div className="glass rounded-2xl overflow-hidden bg-[#F5F1E8]">
            <img
              src={siteData.gallery[1].src}
              alt="Barbershop work"
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    </Section>
  )
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-blue-50 p-4 ring-1 ring-blue-200">
                <div className="text-sm font-semibold text-blue-900">{title}</div>
      <div className="mt-1 text-sm text-muted">{desc}</div>
    </div>
  )
}

function Services() {
  return (
    <Section id="services" eyebrow="SERVICES" title="Barber services">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="grid gap-4 sm:grid-cols-2">
          {siteData.services.map((s) => (
            <div
              key={s.title}
              className="glass rounded-2xl p-5 bg-[#F5F1E8] transition hover:bg-blue-50"
            >
              <div className="flex items-center justify-between">
                <div className="text-base font-semibold text-blue-900">{s.title}</div>
                <div className="h-2 w-2 rounded-full bg-[#FF8C42] shadow-[0_0_12px_rgba(255,140,66,0.4)]" />
              </div>
              <p className="mt-2 text-sm text-muted">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4">
          <div className="glass neon-ring rounded-2xl p-6 bg-[#F5F1E8]">
            <div className="text-xs font-semibold tracking-[0.22em] text-[#FF8C42]">
              SERVICES / PRICING
            </div>
          <div className="mt-4 divide-y divide-white/10">
            {siteData.serviceMenu.map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-4 py-3">
                <div className="text-sm font-semibold">{item.name}</div>
                <div className="text-sm text-blue-900/75">{item.note}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-blue-900">Book an appointment</div>
              <div className="text-sm text-muted">Call and we’ll get you scheduled.</div>
            </div>
            <a
              href={`tel:${siteData.phoneTel}`}
              className="inline-flex items-center justify-center rounded-2xl bg-[#FF8C42] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#FFA366]"
            >
              Call {siteData.phoneDisplay}
            </a>
          </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function Gallery({ onOpen }: { onOpen: (idx: number) => void }) {
  return (
    <Section id="gallery" eyebrow="GALLERY" title="Recent cuts">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {siteData.gallery.map((img, idx) => (
          <button
            key={img.src}
            type="button"
            className="group relative block w-full overflow-hidden rounded-2xl bg-[#F5F1E8] p-0 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]/70"
            onClick={() => onOpen(idx)}
            aria-label={`Open gallery image ${idx + 1}`}
          >
            <div className="relative aspect-[4/5] w-full">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-blue-900/30" />
              <div className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-full bg-[#FF8C42]/90 px-3 py-1 text-xs font-semibold text-black ring-1 ring-[#FF8C42]">
                Tap to enlarge
              </div>
            </div>
          </button>
        ))}
      </div>
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact" eyebrow="LOCATION / CONTACT" title="Find us & book fast">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="glass neon-ring rounded-2xl p-6">
          <div className="text-sm font-semibold text-blue-900">Chify's Barbershop</div>
          <div className="mt-2 text-sm text-muted">
            {siteData.addressLine1}
            <br />
            {siteData.addressLine2}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <a
              className="rounded-2xl bg-blue-50 px-4 py-3 ring-1 ring-blue-200 hover:bg-blue-100"
              href={`tel:${siteData.phoneTel}`}
            >
              <div className="text-sm font-semibold">Book (Call)</div>
              <div className="text-sm text-muted">{siteData.phoneDisplay}</div>
            </a>
            <a
              className="rounded-2xl bg-blue-50 px-4 py-3 ring-1 ring-blue-200 hover:bg-blue-100"
              href={`mailto:${siteData.email}`}
            >
              <div className="text-sm font-semibold">Email</div>
              <div className="text-sm text-muted">{siteData.email}</div>
            </a>
            <a
              className="rounded-2xl bg-blue-50 px-4 py-3 ring-1 ring-blue-200 hover:bg-blue-100 sm:col-span-2"
              href={siteData.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              <div className="text-sm font-semibold">Directions</div>
              <div className="text-sm text-muted">Open Google Maps</div>
            </a>
          </div>
          <div className="mt-6 border-t border-blue-200 pt-5">
            <div className="text-xs font-semibold tracking-[0.22em] text-[#FF8C42]">
              HOURS
            </div>
            <div className="mt-3 grid gap-2">
              {siteData.hours.map((h) => (
                <div key={h.label} className="flex items-center justify-between text-sm">
                  <div className="text-blue-900/90">{h.label}</div>
                  <div className="text-muted">{h.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 bg-[#F5F1E8]">
          <div className="text-xs font-semibold tracking-[0.22em] text-[#FF8C42]">
            QUICK MAP
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-blue-200">
            <iframe
              title="Map"
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=3055%20NE%20Columbia%20Ave%2C%20Minneapolis%2C%20MN%2055418&output=embed"
            />
          </div>
          <p className="mt-3 text-xs text-muted">
            Tip: For the fastest booking, call directly and we’ll get you scheduled.
          </p>
        </div>
      </div>
    </Section>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-blue-200">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div               className="text-sm font-semibold text-blue-900">{siteData.name}</div>
              <div className="text-sm text-muted">
                © {year} • {siteData.owner}
              </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold ring-1 ring-blue-200 hover:bg-blue-100"
              href={`tel:${siteData.phoneTel}`}
            >
              Call
            </a>
            <a
              className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold ring-1 ring-blue-200 hover:bg-blue-100"
              href={`mailto:${siteData.email}`}
            >
              Email
            </a>
            <a
              className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold ring-1 ring-blue-200 hover:bg-blue-100"
              href={siteData.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Directions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function Lightbox({
  idx,
  onClose,
  onPrev,
  onNext,
}: {
  idx: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const backdropRef = useRef<HTMLDivElement | null>(null)
  const img = idx === null ? null : siteData.gallery[idx]

  useEffect(() => {
    if (idx === null) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [idx])

  if (!img) return null

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[999] grid place-items-center bg-blue-900/85 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onMouseDown={(e) => {
        if (e.target === backdropRef.current) onClose()
      }}
    >
      <div className="glass neon-ring w-full max-w-4xl overflow-hidden rounded-3xl bg-[#F5F1E8]">
        <div className="flex items-center justify-between border-b border-blue-200 px-4 py-3 bg-[#F5F1E8]">
          <div className="text-sm font-semibold text-blue-900">Gallery</div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-3 py-2 text-sm font-semibold ring-1 ring-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]/70"
          >
            Close
          </button>
        </div>

        <div className="relative bg-[#F5F1E8]">
          <img
            src={img.src}
            alt={img.alt}
            className="max-h-[72vh] w-full object-contain"
          />

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3">
            <button
              type="button"
              onClick={onPrev}
              className="rounded-xl bg-[#F5F1E8] px-3 py-2 text-sm font-semibold ring-1 ring-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]/70"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={onNext}
              className="rounded-xl bg-[#F5F1E8] px-3 py-2 text-sm font-semibold ring-1 ring-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]/70"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
