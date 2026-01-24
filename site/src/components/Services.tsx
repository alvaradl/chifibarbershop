import { siteData } from '../siteData'
import { Section } from './Section'

/**
 * Services section component displaying available barber services.
 * Shows service cards and pricing information.
 * @returns The services section component.
 */
export function Services() {
  return (
    <Section id="services" eyebrow="SERVICES" title="Barber services">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="grid gap-4 sm:grid-cols-2">
          {siteData.services.map((service) => (
            <div
              key={service.title}
              className="glass rounded-2xl p-5 bg-[#F5F1E8] transition hover:bg-blue-50"
            >
              <div className="flex items-center justify-between">
                <div className="text-base font-semibold text-blue-900">
                  {service.title}
                </div>
                <div className="h-2 w-2 rounded-full bg-[#FF8C42] shadow-[0_0_12px_rgba(255,140,66,0.4)]" />
              </div>
              <p className="mt-2 text-sm text-muted">{service.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4">
          <div className="glass neon-ring rounded-2xl p-6 bg-[#F5F1E8]">
            <div className="text-xs font-semibold tracking-[0.22em] text-[#FF8C42]">
              SERVICES / PRICING
            </div>
            <div className="mt-4 divide-y divide-white/10">
              {siteData.serviceMenu.map((menuItem) => (
                <div
                  key={menuItem.name}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div className="text-sm font-semibold">{menuItem.name}</div>
                  <div className="text-sm text-blue-900/75">{menuItem.note}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-blue-900">
                  Book an appointment
                </div>
                <div className="text-sm text-muted">Call and we'll get you scheduled.</div>
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
