import type { Project } from '../../content/types'

export function PublicationBadge({
  publication,
  compact = false,
}: {
  publication: NonNullable<Project['publication']>
  compact?: boolean
}) {
  return (
    <span
      className={`publication-badge${compact ? ' publication-badge-compact' : ''}`}
      title={publication.status}
      aria-label={`Publication — ${publication.status}`}
    >
      <svg className="publication-star" viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M16 1 20 10 30 12 23 19 24 30 15 25 5 30 7 19 1 11 12 10Z"
          fill="currentColor"
        />
        <path d="m16 5 2 8 8 1-9 3-2 9-2-9-7-4 8 1Z" fill="#fff8bd" />
        <path d="M27 1v6m-3-3h6M3 24v4m-2-2h4" stroke="#fff7b3" />
      </svg>
      <span className="publication-word">Publication</span>
    </span>
  )
}
