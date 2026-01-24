import { siteData } from '../siteData'

/**
 * Footer component displaying copyright information and quick contact links.
 * @returns The footer component.
 */
export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-blue-200">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-blue-900">{siteData.name}</div>
            <div className="text-sm text-muted">
              © {year} • {siteData.owner}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold ring-1 ring-blue-200 hover:bg-blue-100"
              href={`tel:${siteData.phoneTel}`}
            >
              Call
            </a>
            <a
              className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold ring-1 ring-blue-200 hover:bg-blue-100"
              href={`mailto:${siteData.email}`}
            >
              Email
            </a>
            <a
              className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold ring-1 ring-blue-200 hover:bg-blue-100"
              href={siteData.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Directions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
