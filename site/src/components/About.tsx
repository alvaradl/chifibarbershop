import { siteData } from '../siteData'
import { Section } from './Section'
import { Feature } from './Feature'

/**
 * About section component displaying information about the barbershop.
 * Shows owner description and key features.
 * @returns The about section component.
 */
export function About() {
  return (
    <Section id="about" eyebrow="ABOUT" title="Built for consistency. Styled for confidence.">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="glass neon-ring rounded-2xl p-6 bg-[#F5F1E8]">
          <p className="text-muted">
            {siteData.owner} focuses on details: clean blends, sharp lines, and a finish
            that holds up days later. Whether you want a classic look or something modern,
            you'll leave fresh.
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
