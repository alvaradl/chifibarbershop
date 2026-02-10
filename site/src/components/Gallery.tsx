import { siteData } from '../siteData'
import { Section } from './Section'

/**
 * Gallery section component displaying a grid of barbershop work images.
 * Each image can be clicked to open in a lightbox viewer.
 * @param props - Component props.
 * @param props.onImageClick - Callback when an image is clicked.
 * @returns The gallery section component.
 */
export function Gallery({ onImageClick }: { onImageClick: (imageIndex: number) => void }) {
  return (
    <Section id="gallery" eyebrow="GALLERY" title="Styles and Designs">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {siteData.gallery.map((image, imageIndex) => (
          <button
            key={image.src}
            type="button"
            className="group relative block w-full overflow-hidden rounded-2xl bg-white p-0 focus:outline-none focus:ring-2 focus:ring-[#EF4444]/70"
            onClick={() => onImageClick(imageIndex)}
            aria-label={`Open gallery image ${imageIndex + 1}`}
          >
            <div className="relative aspect-[4/5] w-full">
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[#3D3559]/30" />
              <div className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-full bg-[#EF4444]/90 px-3 py-1 text-xs font-semibold text-white ring-1 ring-[#EF4444]">
                Tap to enlarge
              </div>
            </div>
          </button>
        ))}
      </div>
    </Section>
  )
}
