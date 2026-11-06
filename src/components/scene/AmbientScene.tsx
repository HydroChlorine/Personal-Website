export type Weather = 'clear' | 'rain' | 'snow'
export function AmbientScene({
  weather,
  motion,
}: {
  weather: Weather
  motion: boolean
}) {
  return (
    <div className={`scene ${weather} ${motion ? '' : 'still'}`}>
      <img src="/art/night-workshop.svg" alt="" className="scene-art" />
      <div className="scene-grain" />
      {weather !== 'clear' && (
        <div className="weather-particles" aria-hidden="true">
          {Array.from({ length: 28 }, (_, i) => (
            <i
              key={i}
              style={{
                left: `${(i * 37) % 100}%`,
                animationDelay: `${-(i % 7)}s`,
                animationDuration: `${weather === 'snow' ? 7 + (i % 4) : 0.8 + (i % 3) * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}
      <div className="scene-copy">
        <span className="scene-kicker">LICHEN HUANG / HYDROCHLORINE</span>
        <p>
          A small corner
          <br />
          of the internet<span className="cursor">_</span>
        </p>
      </div>
      <div className="scene-caption">
        <span className="lit-dot" /> A few lights on. A few ideas in progress.
      </div>
      <span className="scene-location" aria-hidden="true">
        SCENE 001 · AFTER HOURS
      </span>
    </div>
  )
}
