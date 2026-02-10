/**
 * Accessibility component that provides a "skip to main content" link.
 * Hidden by default, visible when focused via keyboard navigation.
 * @returns A skip link anchor element.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-[#3D3559] focus:ring-2 focus:ring-[#EF4444]/70"
    >
      Skip to content
    </a>
  )
}
