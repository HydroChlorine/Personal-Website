import { useEffect, useState } from 'react'
import { moonLocation, moonPixels, moonReading } from './moonState'

export function MoonWidget() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  const moon = moonReading(now)
  return (
    <section
      className="sidebar-panel moon-widget"
      aria-label={`Moon over ${moonLocation.name}`}
    >
      <svg
        className="moon-face"
        viewBox="0 0 24 24"
        role="img"
        aria-label={moon.phaseName}
        shapeRendering="crispEdges"
      >
        {moonPixels(moon.fraction, moon.angle - moon.parallacticAngle).map(
          ({ x, y, fill }) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="1"
              height="1"
              fill={fill}
            />
          ),
        )}
      </svg>
      <dl className="moon-readings">
        <div>
          <dt>Phase:</dt>
          <dd>{moon.phaseName}</dd>
        </div>
        <div title="Degrees clockwise from north">
          <dt>Azimuth:</dt>
          <dd>
            {moon.azimuth.toFixed(2)}°
            <svg
              className="moon-compass"
              viewBox="0 0 24 24"
              role="img"
              aria-label={`Moon bearing ${moon.azimuth.toFixed(2)} degrees clockwise from north; north is up`}
            >
              <circle
                cx="12"
                cy="12"
                r="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M12 1V5" stroke="currentColor" strokeWidth="1.5" />
              <g transform={`rotate(${moon.azimuth} 12 12)`}>
                <path d="M12 2L16 10H13V21H11V10H8Z" fill="currentColor" />
              </g>
            </svg>
          </dd>
        </div>
        <div
          className={moon.altitude < 0 ? 'moon-below' : ''}
          title="Degrees above the horizon"
        >
          <dt>Altitude:</dt>
          <dd>
            {moon.altitude.toFixed(2)}° {moon.rising ? '▴' : '▾'}
          </dd>
        </div>
      </dl>
      <time className="moon-clock" dateTime={now.toISOString()}>
        {moonLocation.name} · {moon.clock}
      </time>
      <a
        className="moon-credit"
        href="https://dimden.dev/moonwidget"
        target="_blank"
        rel="noreferrer"
      >
        Inspired by dimden’s moon widget ↗
      </a>
    </section>
  )
}
