import { siteData } from '../siteData'
import { Section } from './Section'

/**
 * Services section component displaying available barber services.
 * Shows service cards and pricing information.
 * @returns The services section component.
 */
export function Services() {
  return (
    <Section id="services" eyebrow="GALLERY" title="Barber services">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch relative">
        <div className="grid h-full min-h-0 gap-4 sm:grid-cols-2 relative">
          {siteData.services.map((service) => (
            <div
              key={service.title}
              className="glass rounded-2xl p-6 bg-white transition hover:bg-gray-50 relative z-10"
              style={{ opacity: 1, visibility: 'visible' }}
            >
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-[#3D3559]">
                  {service.title}
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-[#EF4444] shadow-[0_0_12px_rgba(239,68,68,0.4)]" />
              </div>
              <p className="mt-3 text-base text-muted">{service.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4">
          <div className="glass neon-ring rounded-2xl p-7 bg-white relative z-10" style={{ opacity: 1, visibility: 'visible' }}>
            <div className="text-sm font-semibold tracking-[0.22em] text-[#EF4444]">
              SERVICES / PRICING
            </div>
            <div className="mt-5 divide-y divide-white/10">
              {siteData.serviceMenu.map((menuItem) => (
                <div
                  key={menuItem.name}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div className="text-base font-semibold">{menuItem.name}</div>
                  <div className="text-base text-[#3D3559]/75">{menuItem.note}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-base font-semibold text-[#3D3559]">
                  Book an appointment
                </div>
                <div className="text-base text-muted">Call and we'll get you scheduled.</div>
              </div>
              <a
                href={`tel:${siteData.phoneTel}`}
                className="inline-flex items-center justify-center rounded-2xl bg-[#EF4444] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#F87171]"
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
