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
      <div className="grid gap-6 lg:grid-cols-1">
        <div className="glass neon-ring w-full rounded-2xl p-5 bg-[#F5F1E8] sm:p-6">
          <p className="text-muted">
            {siteData.owner} focuses on details: clean blends, sharp lines, and a finish
            that holds up days later. Whether you want a classic look or something modern,
            you'll leave fresh.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 sm:gap-3">
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
