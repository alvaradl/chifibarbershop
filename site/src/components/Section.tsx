import type { ReactNode } from 'react'

/**
 * Reusable section wrapper component with consistent styling.
 * Provides a section element with an eyebrow label and title.
 * @param props - Component props.
 * @param props.id - The section ID (used for navigation).
 * @param props.eyebrow - Small label text above the title.
 * @param props.title - The main section title.
 * @param props.children - The section content.
 * @returns A section element with header and content.
 */
export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
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
