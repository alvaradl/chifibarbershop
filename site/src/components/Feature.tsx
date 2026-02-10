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
    <div className="rounded-2xl bg-white p-4 ring-1 ring-[#06B6D4]/30">
      <div className="text-sm font-semibold text-[#3D3559]">{title}</div>
      <div className="mt-1 text-sm text-muted">{desc}</div>
    </div>
  )
}
