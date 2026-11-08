import { Link, NavLink } from 'react-router'
import { site } from '../../config/site'
import { profile } from '../../content/profile'
import { PixelIcon } from '../ui/PixelIcon'
import { AtmosphereSettings } from '../sky/AtmosphereSettings'
import type {
  PaletteId,
  SkyWeather,
  WeatherMode,
} from '../../content/appearance'
export function Sidebar({
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
    <aside className="sidebar">
      <div className="sidebar-panel">
        <h2 className="sidebar-title">
          Find your way <span aria-hidden="true">✧</span>
        </h2>
        <nav aria-label="Main navigation">
          {site.navigation.map((item) => (
            <NavLink key={item.href} to={item.href} end={item.href === '/'}>
              <PixelIcon name={item.icon} />
              <span>{item.label}</span>
              <span className="nav-arrow" aria-hidden="true">
                ›
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
      <section className="sidebar-panel now-panel">
        <h2 className="sidebar-title">At the moment</h2>
        <span className="status">
          <span className="lit-dot" /> Site in the making
        </span>
        <p>{profile.now}</p>
        <Link to="/notebook">Visit the notebook →</Link>
      </section>
      <AtmosphereSettings
        palette={palette}
        setPalette={setPalette}
        weather={weather}
        weatherMode={weatherMode}
        setWeather={setWeather}
        motion={motion}
        setMotion={setMotion}
      />
    </aside>
  )
}
