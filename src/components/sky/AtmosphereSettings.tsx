import { palettes } from '../../content/appearance'
import type {
  PaletteId,
  SkyWeather,
  WeatherMode,
} from '../../content/appearance'
export function AtmosphereSettings({
  palette,
  setPalette,
  weather,
  weatherMode,
  setWeather,
  motion,
  setMotion,
}: {
  palette: PaletteId
  setPalette: (value: PaletteId) => void
  weather: SkyWeather
  weatherMode: WeatherMode
  setWeather: (value: WeatherMode) => void
  motion: boolean
  setMotion: (value: boolean) => void
}) {
  return (
    <section className="sidebar-panel atmosphere">
      <details className="atmosphere-details">
        <summary>
          Atmosphere <span aria-hidden="true">✧</span>
        </summary>
        <div className="settings-group">
          <p className="settings-label">Night palette</p>
          <div
            className="palette-choices"
            role="group"
            aria-label="Color palette"
          >
            {palettes.map((item) => (
              <button
                key={item.id}
                onClick={() => setPalette(item.id)}
                aria-pressed={palette === item.id}
                title={item.note}
              >
                <span className="palette-swatches" aria-hidden="true">
                  {item.colors.map((color) => (
                    <i key={color} style={{ backgroundColor: color }} />
                  ))}
                </span>
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div className="settings-group">
          <p className="settings-label">Sky weather</p>
          <div
            className="sky-weather-controls"
            role="group"
            aria-label="Background sky weather"
          >
            {(['auto', 'off', 'rain', 'snow'] as const).map((value) => (
              <button
                key={value}
                onClick={() => setWeather(value)}
                aria-pressed={weatherMode === value}
              >
                {value === 'auto'
                  ? 'Auto'
                  : value === 'off'
                    ? 'Off'
                    : value === 'rain'
                      ? 'Rain'
                      : 'Snow'}
              </button>
            ))}
          </div>
          {weatherMode === 'auto' && (
            <p className="weather-auto-note">
              From your local calendar:{' '}
              {weather === 'off' ? 'clear skies' : weather}.
            </p>
          )}
        </div>
      </details>
      <button
        className="motion-toggle"
        aria-pressed={!motion}
        onClick={() => setMotion(!motion)}
      >
        {motion ? 'Pause animation' : 'Resume animation'}
      </button>
    </section>
  )
}
