import { siteData } from '../siteData'
import { scrollToSection } from '../utils/scrollToSection'
import { classNames } from '../utils/classNames'

/**
 * Hero section component displaying the main headline and call-to-action buttons.
 * Includes shop information cards (location, hours, highlights).
 * @param props - Component props.
 * @param props.prefersReducedMotion - Whether the user prefers reduced motion.
 * @returns The hero section component.
 */
export function Hero({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const heroImage = siteData.gallery[0]?.src
  return (
    <section id="home" className="scroll-mt-28 pb-10 pt-2 sm:pb-14">
      <div className="glass neon-ring relative overflow-hidden rounded-3xl bg-[#F5F1E8]">
        <div className="absolute inset-0">
          {heroImage ? (
            <img
              src={heroImage}
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
              className={classNames(
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
                  onClick={() => scrollToSection('gallery', prefersReducedMotion)}
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
                <div className="mt-2 text-sm font-semibold text-blue-900">
                  {siteData.addressLine1}
                </div>
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
                  {siteData.hours.map((hour) => (
                    <div
                      key={hour.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="text-blue-900/90">{hour.label}</div>
                      <div className="text-muted">{hour.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-5 bg-[#F5F1E8]">
                <div className="text-xs font-semibold tracking-[0.22em] text-[#FF8C42]">
                  SHOP INFO
                </div>
                <div className="mt-3 grid gap-3">
                  {siteData.shopHighlights.slice(0, 3).map((highlight) => (
                    <div
                      key={highlight.title}
                      className="rounded-2xl bg-blue-50 p-4 ring-1 ring-blue-200"
                    >
                      <div className="text-sm font-semibold text-blue-900">
                        {highlight.title}
                      </div>
                      <div className="mt-1 text-sm text-muted">{highlight.desc}</div>
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
