import { siteData } from '../siteData'
import { Section } from './Section'

/**
 * Contact section component displaying location, contact information, and hours.
 * Includes an embedded Google Maps iframe.
 * @returns The contact section component.
 */
export function Contact() {
  return (
    <Section id="contact" eyebrow="LOCATION / CONTACT" title="Find us & book fast">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="glass neon-ring rounded-2xl p-6">
          <div className="text-sm font-semibold text-[#3D3559]">Chify's Barbershop</div>
          <div className="mt-2 text-sm text-muted">
            {siteData.addressLine1}
            <br />
            {siteData.addressLine2}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <a
              className="rounded-2xl bg-white px-4 py-3 ring-1 ring-[#06B6D4]/30 hover:bg-gray-50"
              href={`tel:${siteData.phoneTel}`}
            >
              <div className="text-sm font-semibold">Book (Call)</div>
              <div className="text-sm text-muted">{siteData.phoneDisplay}</div>
            </a>
            <a
              className="rounded-2xl bg-white px-4 py-3 ring-1 ring-[#06B6D4]/30 hover:bg-gray-50"
              href={`mailto:${siteData.email}`}
            >
              <div className="text-sm font-semibold">Email</div>
              <div className="text-sm text-muted">{siteData.email}</div>
            </a>
            <a
              className="rounded-2xl bg-white px-4 py-3 ring-1 ring-[#06B6D4]/30 hover:bg-gray-50 sm:col-span-2"
              href={siteData.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              <div className="text-sm font-semibold">Directions</div>
              <div className="text-sm text-muted">Open Google Maps</div>
            </a>
          </div>
          <div className="mt-6 border-t border-[#06B6D4]/30 pt-5">
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
        </div>

        <div className="glass rounded-2xl p-6 bg-white">
          <div className="text-xs font-semibold tracking-[0.22em] text-[#EF4444]">
            QUICK MAP
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-[#06B6D4]/30">
            <iframe
              title="Map"
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=3055%20NE%20Columbia%20Ave%2C%20Minneapolis%2C%20MN%2055418&output=embed"
            />
          </div>
          <p className="mt-3 text-xs text-muted">
            Tip: For the fastest booking, call directly and we'll get you scheduled.
          </p>
        </div>
      </div>
    </Section>
  )
}
