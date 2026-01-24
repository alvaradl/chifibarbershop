/**
 * Feature card component displaying a title and description.
 * Used in the About section to highlight key features.
 * @param props - Component props.
 * @param props.title - The feature title.
 * @param props.desc - The feature description.
 * @returns A feature card element.
 */
export function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-blue-50 p-4 ring-1 ring-blue-200">
      <div className="text-sm font-semibold text-blue-900">{title}</div>
      <div className="mt-1 text-sm text-muted">{desc}</div>
    </div>
  )
}
