// Original 16 × 16 grid drawings; no external icon set.
const paths = {
  home: 'M2 7h2V5h2V3h4v2h2v2h2v7H9v-4H7v4H2z',
  person: 'M5 1h6v6H5zM3 9h10v6H3z',
  chemistry: 'M6 1h5v2h-1v4l4 6v2H2v-2l5-6V3H6zM5 11v2h6v-2z',
  mathematics: 'M1 13h2V9h3V6h3V3h3V1h2v4h-3v3H8v3H5v4H1z',
  'computer-science': 'M1 2h14v10H9v2h4v1H3v-1h4v-2H1zM3 4v6h10V4z',
  folder: 'M1 3h6v2h8v9H1z',
  book: 'M2 1h11v14H2zM4 3v2h7V3zM4 7v1h7V7zM4 10v1h5v-1z',
  play: 'M4 2h2v2h3v2h3v4H9v2H6v2H4z',
  star: 'M7 1h2v4h5v3h-3v3h1v4H9v-3H6v3H3v-4h1V8H1V5h6z',
  mail: 'M1 3h14v10H1zM3 5v2h2v2h6V7h2V5h-2v2H5V5z',
}
export type PixelIconName = keyof typeof paths
export function PixelIcon({
  name,
  className = '',
}: {
  name: PixelIconName
  className?: string
}) {
  return (
    <svg
      className={`pixel-icon ${className}`}
      viewBox="0 0 16 16"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <path fill="currentColor" fillRule="evenodd" d={paths[name]} />
    </svg>
  )
}
