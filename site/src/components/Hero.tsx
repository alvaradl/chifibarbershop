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
  return (
    <section id="home" className="scroll-mt-28 pb-4 pt-2 sm:pb-6">
      <div className="glass neon-ring relative overflow-hidden rounded-3xl border-2 border-[#3D3559]/40 bg-white ring-2 ring-[#3D3559]/30 ring-inset">
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {/* Barber pole - mobile */}
          <img
            src="/barber-pole-mobile.png"
            alt=""
            className="absolute left-1/2 top-1/2 z-[0] h-auto w-auto max-h-[600px] max-w-[600px] -translate-x-1/2 -translate-y-1/2 object-contain opacity-100 sm:hidden"
            style={{
              filter:
                'drop-shadow(-2px -2px 4px rgba(0,0,0,0.3)) drop-shadow(2px -2px 4px rgba(0,0,0,0.3)) drop-shadow(-2px 2px 4px rgba(0,0,0,0.3)) drop-shadow(2px 2px 4px rgba(0,0,0,0.3)) drop-shadow(0 0 8px rgba(0,0,0,0.2))',
            }}
            aria-hidden="true"
          />
          {/* Barber pole - desktop */}
          <img
            src="/barber-pole.png"
            alt=""
            className="absolute left-1/2 top-1/2 z-[0] hidden h-auto w-auto max-h-[600px] max-w-[600px] -translate-x-1/2 -translate-y-1/2 object-contain opacity-100 sm:block"
            style={{
              filter:
                'drop-shadow(-2px -2px 4px rgba(0,0,0,0.3)) drop-shadow(2px -2px 4px rgba(0,0,0,0.3)) drop-shadow(-2px 2px 4px rgba(0,0,0,0.3)) drop-shadow(2px 2px 4px rgba(0,0,0,0.3)) drop-shadow(0 0 8px rgba(0,0,0,0.2))',
            }}
            aria-hidden="true"
          />
          {/* Barber blade - top-left corner */}
          <img
            src="/barber-blade.png"
            alt=""
            className="absolute left-0 top-0 z-[0] h-auto w-auto max-h-40 max-w-40 sm:max-h-56 sm:max-w-56 object-contain opacity-100"
            style={{
              filter:
                'drop-shadow(-2px -2px 4px rgba(0,0,0,0.3)) drop-shadow(2px -2px 4px rgba(0,0,0,0.3)) drop-shadow(-2px 2px 4px rgba(0,0,0,0.3)) drop-shadow(2px 2px 4px rgba(0,0,0,0.3)) drop-shadow(0 0 8px rgba(0,0,0,0.2))',
            }}
            aria-hidden="true"
          />
          {/* Barber clip - top-right corner */}
          <img
            src="/barber-clip.png"
            alt=""
            className="absolute right-0 top-0 z-[0] h-auto w-auto max-h-40 max-w-40 sm:max-h-56 sm:max-w-56 object-contain opacity-100"
            style={{
              filter:
                'drop-shadow(-2px -2px 4px rgba(0,0,0,0.3)) drop-shadow(2px -2px 4px rgba(0,0,0,0.3)) drop-shadow(-2px 2px 4px rgba(0,0,0,0.3)) drop-shadow(2px 2px 4px rgba(0,0,0,0.3)) drop-shadow(0 0 8px rgba(0,0,0,0.2))',
            }}
            aria-hidden="true"
          />
          {/* Barber clip - bottom-left corner */}
          <img
            src="/barber-clip.png"
            alt=""
            className="absolute bottom-0 left-0 z-[0] h-auto w-auto max-h-40 max-w-40 sm:max-h-56 sm:max-w-56 object-contain opacity-100"
            style={{
              transform: 'rotate(180deg)',
              transformOrigin: 'center',
              filter:
                'drop-shadow(-2px -2px 4px rgba(0,0,0,0.3)) drop-shadow(2px -2px 4px rgba(0,0,0,0.3)) drop-shadow(-2px 2px 4px rgba(0,0,0,0.3)) drop-shadow(2px 2px 4px rgba(0,0,0,0.3)) drop-shadow(0 0 8px rgba(0,0,0,0.2))',
            }}
            aria-hidden="true"
          />
          {/* Barber blade - bottom-right corner */}
          <img
            src="/barber-blade.png"
            alt=""
            className="absolute bottom-0 right-0 z-[0] h-auto w-auto max-h-40 max-w-40 sm:max-h-56 sm:max-w-56 object-contain opacity-100"
            style={{
              transform: 'rotate(180deg)',
              transformOrigin: 'center',
              filter:
                'drop-shadow(-2px -2px 4px rgba(0,0,0,0.3)) drop-shadow(2px -2px 4px rgba(0,0,0,0.3)) drop-shadow(-2px 2px 4px rgba(0,0,0,0.3)) drop-shadow(2px 2px 4px rgba(0,0,0,0.3)) drop-shadow(0 0 8px rgba(0,0,0,0.2))',
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[#3D3559]/30" />
        </div>

        <div className="relative z-10 px-6 pt-8 pb-6 sm:px-10 sm:pt-12 sm:pb-8">
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden rounded-3xl"
          >
            <div
              className={classNames(
                'pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full blur-3xl',
                prefersReducedMotion ? 'opacity-40' : 'animate-pulse',
              )}
              style={{
                background: 'rgba(239,68,68,0.2)',
              }}
            />
          </div>

          <div className="relative z-20 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#EF4444]/20 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] text-[#EF4444] ring-1 ring-[#EF4444]/30">
                {siteData.hero.eyebrow}
                <span className="h-1 w-1 rounded-full bg-[#EF4444]/60" />
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
                  className="inline-flex items-center justify-center rounded-2xl bg-[#EF4444] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#F87171] focus:outline-none focus:ring-2 focus:ring-[#EF4444]/70"
                >
                  Book Now (Call) — {siteData.phoneDisplay}
                </a>
                <button
                  type="button"
                  onClick={() => scrollToSection('gallery', prefersReducedMotion)}
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#3D3559] ring-1 ring-[#06B6D4]/30 transition hover:bg-gray-50 hover:ring-[#06B6D4]/50 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50"
                >
                  View Gallery
                </button>
                <a
                  href={siteData.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#3D3559]/90 ring-1 ring-[#06B6D4]/30 transition hover:bg-gray-50 hover:ring-[#06B6D4]/50 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50"
                >
                  Get Directions
                </a>
              </div>

              <div className="mt-5 max-w-xl">
                <div className="rounded-2xl p-5 bg-white">
                  <div className="text-xs font-semibold tracking-[0.22em] text-[#EF4444]">
                    LOCATION
                  </div>
                  <div className="mt-2 text-sm font-semibold text-[#3D3559]">
                    {siteData.addressLine1}
                  </div>
                  <div className="text-sm text-muted">{siteData.addressLine2}</div>
                  <a
                    className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#3D3559] ring-1 ring-[#06B6D4]/30 hover:bg-gray-50"
                    href={siteData.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-2xl p-5 bg-white">
                <div className="text-xs font-semibold tracking-[0.22em] text-[#EF4444]">
                  HOURS
                </div>
                <div className="mt-3 grid gap-2">
                  {siteData.hours.map((hour) => (
                    <div
                      key={hour.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="text-[#3D3559]/90">{hour.label}</div>
                      <div className="text-muted">{hour.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-5 bg-white">
                <div className="text-xs font-semibold tracking-[0.22em] text-[#EF4444]">
                  SHOP INFO
                </div>
                <div className="mt-3 grid gap-3">
                  {siteData.shopHighlights.slice(0, 3).map((highlight) => (
                    <div
                      key={highlight.title}
                      className="rounded-2xl bg-white p-4 ring-1 ring-[#06B6D4]/30"
                    >
                      <div className="text-sm font-semibold text-[#3D3559]">
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
