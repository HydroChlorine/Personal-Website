import { useOutletContext } from 'react-router'

export function SiteMiniature() {
  const { motion } = useOutletContext<{ motion: boolean }>()
  return (
    <div className="site-miniature">
      <iframe
        src={`/demos/site-miniature/index.html?motion=${motion ? 'playing' : 'paused'}`}
        title="Interactive miniature of Lichen’s website"
        width={250}
        height={250}
        loading="lazy"
        sandbox="allow-scripts"
        referrerPolicy="no-referrer"
      />
      <p>Try the subject buttons, change the sky, or click the scene.</p>
      <p className="miniature-credit">
        Original local implementation. Miniature-site idea inspired by{' '}
        <a href="https://dimden.dev/">dimden’s WebTiles miniature ↗</a>.
      </p>
      <a
        className="text-link"
        href="/demos/site-miniature/index.html"
        target="_blank"
        rel="noreferrer"
      >
        Open the miniature on its own ↗
      </a>
    </div>
  )
}
