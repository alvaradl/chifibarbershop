import { useEffect, useRef } from 'react'
import { siteData } from '../siteData'

/**
 * Lightbox modal component for viewing gallery images in full size.
 * Supports keyboard navigation (arrow keys, escape) and clicking backdrop to close.
 * Prevents body scrolling when open.
 * @param props - Component props.
 * @param props.imageIndex - The index of the currently displayed image, or null if closed.
 * @param props.onClose - Callback to close the lightbox.
 * @param props.onPrevious - Callback to show the previous image.
 * @param props.onNext - Callback to show the next image.
 * @returns The lightbox modal, or null if no image is selected.
 */
export function Lightbox({
  imageIndex,
  onClose,
  onPrevious,
  onNext,
}: {
  imageIndex: number | null
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}) {
  const backdropRef = useRef<HTMLDivElement | null>(null)
  const currentImage = imageIndex === null ? null : siteData.gallery[imageIndex]

  // Prevent body scrolling when lightbox is open
  useEffect(() => {
    if (imageIndex === null) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [imageIndex])

  if (!currentImage) return null

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[999] grid place-items-center bg-[#3D3559]/85 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onMouseDown={(event) => {
        if (event.target === backdropRef.current) onClose()
      }}
    >
      <div className="glass neon-ring w-full max-w-4xl overflow-hidden rounded-3xl bg-white">
        <div className="flex items-center justify-between border-b border-[#06B6D4]/30 px-4 py-3 bg-white">
          <div className="text-sm font-semibold text-[#3D3559]">Gallery</div>
          <button
            type="button"
            onClick={onClose}
              className="rounded-xl px-3 py-2 text-sm font-semibold ring-1 ring-[#06B6D4]/30 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#EF4444]/70"
          >
            Close
          </button>
        </div>

        <div className="relative bg-white">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-h-[72vh] w-full object-contain"
          />

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3">
            <button
              type="button"
              onClick={onPrevious}
              className="rounded-xl bg-[#BEBBBB] px-3 py-2 text-sm font-semibold ring-1 ring-[#06B6D4]/30 hover:bg-[#BEBBBB]/80 focus:outline-none focus:ring-2 focus:ring-[#EF4444]/70"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={onNext}
              className="rounded-xl bg-[#BEBBBB] px-3 py-2 text-sm font-semibold ring-1 ring-[#06B6D4]/30 hover:bg-[#BEBBBB]/80 focus:outline-none focus:ring-2 focus:ring-[#EF4444]/70"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
