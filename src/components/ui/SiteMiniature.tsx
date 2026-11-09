import { useOutletContext } from 'react-router'

export function SiteMiniature() {
  const { motion } = useOutletContext<{ motion: boolean }>()
  return (
    <div className="site-miniature">
      <div className="miniature-viewport">
        <iframe
          src={`/miniature?motion=${motion ? 'playing' : 'paused'}`}
          title="Interactive miniature of Lichen’s website"
          width={1440}
          height={1440}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
      <p className="miniature-credit">
        Original local implementation. Miniature-site idea inspired by{' '}
        <a href="https://dimden.dev/">dimden’s WebTiles miniature ↗</a>.
      </p>
      <a
        className="text-link"
        href="/miniature"
        target="_blank"
        rel="noreferrer"
      >
        Open the miniature on its own ↗
      </a>
    </div>
  )
}
