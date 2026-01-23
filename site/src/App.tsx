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

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]
        if (!visible?.target?.id) return
        const id = visible.target.id as typeof activeId
        setActiveId(id)
      },
      { root: null, rootMargin: '-30% 0px -60% 0px', threshold: [0.1, 0.2, 0.4] },
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
    <div className="min-h-screen text-white">
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
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-xl focus:bg-black/80 focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:ring-2 focus:ring-[#65fbd2]/70"
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
        <div className="glass neon-ring mt-3 rounded-2xl">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              onClick={() => scrollToId('home', prefersReducedMotion)}
              className="group flex items-center gap-2 rounded-xl px-2 py-1 text-left focus:outline-none focus:ring-2 focus:ring-[#65fbd2]/70"
              aria-label={`${siteData.name} — go to top`}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <span className="text-base font-semibold tracking-tight text-white">
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
                    'hover:bg-white/8 hover:ring-1 hover:ring-white/10',
                    activeId === l.id
                      ? 'bg-white/10 ring-1 ring-white/15'
                      : 'text-white/85',
                  )}
                >
                  {l.label}
                </button>
              ))}
              <a
                href={`tel:${siteData.phoneTel}`}
                className="ml-1 inline-flex items-center gap-2 rounded-xl bg-[#e2b35c]/18 px-3 py-2 text-sm font-semibold text-white ring-1 ring-[#e2b35c]/35 transition hover:bg-[#e2b35c]/22 focus:outline-none focus:ring-2 focus:ring-[#e2b35c]/70"
                aria-label={`Book appointment by calling ${siteData.phoneDisplay}`}
              >
                Book (Call)
                <span className="text-white/70">{siteData.phoneDisplay}</span>
              </a>
            </nav>

            <button
              type="button"
              className="md:hidden rounded-xl px-3 py-2 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-[#65fbd2]/70"
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
              'border-t border-white/10 px-3 pb-3 md:hidden',
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
                    activeId === l.id ? 'bg-white/10' : 'hover:bg-white/8',
                  )}
                >
                  {l.label}
                </button>
              ))}
              <a
                href={`tel:${siteData.phoneTel}`}
                className="mt-1 rounded-xl bg-[#e2b35c]/18 px-3 py-2 text-sm font-semibold ring-1 ring-[#e2b35c]/35 hover:bg-[#e2b35c]/22"
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
        <div className="text-xs font-semibold tracking-[0.22em] text-white/70">
          {eyebrow}
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
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
      <div className="glass neon-ring relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0">
          {heroImg ? (
            <img
              src={heroImg}
              alt=""
              className="h-full w-full object-cover opacity-30"
              aria-hidden="true"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/65 to-black/85" />
        </div>

        <div className="relative px-6 py-10 sm:px-10 sm:py-14">
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <div
              className={cx(
                'pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl',
                prefersReducedMotion ? 'opacity-60' : 'animate-pulse',
              )}
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(226,179,92,0.28), transparent 55%)',
              }}
            />
            <div
              className={cx(
                'pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full blur-3xl',
                prefersReducedMotion ? 'opacity-50' : 'animate-pulse',
              )}
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(101,251,210,0.22), transparent 55%)',
                animationDelay: '450ms',
              }}
            />
          </div>

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] text-white/80 ring-1 ring-white/10">
              {siteData.hero.eyebrow}
              <span className="h-1 w-1 rounded-full bg-white/35" />
              Minneapolis
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              <span className="block">{siteData.hero.headlineTop}</span>
              <span className="block text-accent">{siteData.hero.headlineBottom}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
              {siteData.hero.subhead}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`tel:${siteData.phoneTel}`}
                className="inline-flex items-center justify-center rounded-2xl bg-[#e2b35c]/18 px-5 py-3 text-sm font-semibold ring-1 ring-[#e2b35c]/35 transition hover:bg-[#e2b35c]/22 focus:outline-none focus:ring-2 focus:ring-[#e2b35c]/70"
              >
                Book Now (Call) — {siteData.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={() => scrollToId('gallery', prefersReducedMotion)}
                className="inline-flex items-center justify-center rounded-2xl bg-white/8 px-5 py-3 text-sm font-semibold ring-1 ring-white/12 transition hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                View Gallery
              </button>
              <a
                href={siteData.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white/85 ring-1 ring-white/10 transition hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                Get Directions
              </a>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="glass rounded-2xl p-5">
              <div className="text-xs font-semibold tracking-[0.22em] text-white/70">
                LOCATION
              </div>
              <div className="mt-2 text-sm font-semibold">{siteData.addressLine1}</div>
              <div className="text-sm text-muted">{siteData.addressLine2}</div>
              <a
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-white/6 px-4 py-2 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10"
                href={siteData.mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open in Maps
              </a>
            </div>
            <div className="glass rounded-2xl p-5">
              <div className="text-xs font-semibold tracking-[0.22em] text-white/70">
                HOURS
              </div>
              <div className="mt-3 grid gap-2">
                {siteData.hours.map((h) => (
                  <div key={h.label} className="flex items-center justify-between text-sm">
                    <div className="text-white/85">{h.label}</div>
                    <div className="text-muted">{h.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="text-xs font-semibold tracking-[0.22em] text-white/70">
                SHOP INFO
              </div>
              <div className="mt-3 grid gap-3">
                {siteData.shopHighlights.slice(0, 3).map((x) => (
                  <div key={x.title} className="rounded-2xl bg-black/20 p-4 ring-1 ring-white/10">
                    <div className="text-sm font-semibold">{x.title}</div>
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
      <div className="grid gap-6">
        <div className="glass neon-ring rounded-2xl p-6">
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
      </div>
    </Section>
  )
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <div className="text-sm font-semibold">{title}</div>
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
              className="glass rounded-2xl p-5 transition hover:bg-white/8"
            >
              <div className="flex items-center justify-between">
                <div className="text-base font-semibold">{s.title}</div>
                <div className="h-2 w-2 rounded-full bg-[#e2b35c]/85 shadow-[0_0_16px_rgba(226,179,92,0.25)]" />
              </div>
              <p className="mt-2 text-sm text-muted">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass neon-ring rounded-2xl p-6">
          <div className="text-xs font-semibold tracking-[0.22em] text-white/70">
            SERVICES / PRICING
          </div>
          <div className="mt-4 divide-y divide-white/10">
            {siteData.serviceMenu.map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-4 py-3">
                <div className="text-sm font-semibold">{item.name}</div>
                <div className="text-sm text-white/75">{item.note}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold">Book an appointment</div>
              <div className="text-sm text-muted">Call and we’ll get you scheduled.</div>
            </div>
            <a
              href={`tel:${siteData.phoneTel}`}
              className="inline-flex items-center justify-center rounded-2xl bg-[#e2b35c]/18 px-5 py-3 text-sm font-semibold ring-1 ring-[#e2b35c]/35 hover:bg-[#e2b35c]/22"
            >
              Call {siteData.phoneDisplay}
            </a>
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
            className="group glass overflow-hidden rounded-2xl text-left focus:outline-none focus:ring-2 focus:ring-[#7aa7ff]/70"
            onClick={() => onOpen(idx)}
            aria-label={`Open gallery image ${idx + 1}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-80" />
              <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white/90 ring-1 ring-white/10">
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
          <div className="text-sm font-semibold">Chifi’s Barbershop</div>
          <div className="mt-2 text-sm text-muted">
            {siteData.addressLine1}
            <br />
            {siteData.addressLine2}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <a
              className="rounded-2xl bg-white/6 px-4 py-3 ring-1 ring-white/10 hover:bg-white/10"
              href={`tel:${siteData.phoneTel}`}
            >
              <div className="text-sm font-semibold">Book (Call)</div>
              <div className="text-sm text-muted">{siteData.phoneDisplay}</div>
            </a>
            <a
              className="rounded-2xl bg-white/6 px-4 py-3 ring-1 ring-white/10 hover:bg-white/10"
              href={`mailto:${siteData.email}`}
            >
              <div className="text-sm font-semibold">Email</div>
              <div className="text-sm text-muted">{siteData.email}</div>
            </a>
            <a
              className="rounded-2xl bg-white/6 px-4 py-3 ring-1 ring-white/10 hover:bg-white/10 sm:col-span-2"
              href={siteData.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              <div className="text-sm font-semibold">Directions</div>
              <div className="text-sm text-muted">Open Google Maps</div>
            </a>
          </div>
          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="text-xs font-semibold tracking-[0.22em] text-white/70">
              HOURS
            </div>
            <div className="mt-3 grid gap-2">
              {siteData.hours.map((h) => (
                <div key={h.label} className="flex items-center justify-between text-sm">
                  <div className="text-white/85">{h.label}</div>
                  <div className="text-muted">{h.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="text-xs font-semibold tracking-[0.22em] text-white/70">
            QUICK MAP
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-white/10">
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
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold">{siteData.name}</div>
            <div className="text-sm text-muted">
              © {year} • {siteData.owner}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              className="rounded-xl bg-white/5 px-3 py-2 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10"
              href={`tel:${siteData.phoneTel}`}
            >
              Call
            </a>
            <a
              className="rounded-xl bg-white/5 px-3 py-2 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10"
              href={`mailto:${siteData.email}`}
            >
              Email
            </a>
            <a
              className="rounded-xl bg-white/5 px-3 py-2 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10"
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
      className="fixed inset-0 z-[999] grid place-items-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onMouseDown={(e) => {
        if (e.target === backdropRef.current) onClose()
      }}
    >
      <div className="glass neon-ring w-full max-w-4xl overflow-hidden rounded-3xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="text-sm font-semibold">Gallery</div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-3 py-2 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#65fbd2]/70"
          >
            Close
          </button>
        </div>

        <div className="relative bg-black/25">
          <img
            src={img.src}
            alt={img.alt}
            className="max-h-[72vh] w-full object-contain"
          />

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3">
            <button
              type="button"
              onClick={onPrev}
              className="rounded-xl bg-black/45 px-3 py-2 text-sm font-semibold ring-1 ring-white/10 hover:bg-black/55 focus:outline-none focus:ring-2 focus:ring-[#7aa7ff]/70"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={onNext}
              className="rounded-xl bg-black/45 px-3 py-2 text-sm font-semibold ring-1 ring-white/10 hover:bg-black/55 focus:outline-none focus:ring-2 focus:ring-[#7aa7ff]/70"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
