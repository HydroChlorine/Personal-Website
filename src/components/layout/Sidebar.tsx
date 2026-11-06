import { Link, NavLink } from 'react-router'
import { site } from '../../config/site'
import { profile } from '../../content/profile'
import { PixelIcon } from '../ui/PixelIcon'
import type { Weather } from '../scene/AmbientScene'
export function Sidebar({
  weather,
  setWeather,
  motion,
  setMotion,
}: {
  weather: Weather
  setWeather: (value: Weather) => void
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
      <section className="sidebar-panel atmosphere">
        <h2 className="sidebar-title">Outside the window</h2>
        <p>A little make-believe weather.</p>
        <div
          className="weather-controls"
          role="group"
          aria-label="Decorative weather"
        >
          {(['clear', 'rain', 'snow'] as const).map((value) => (
            <button
              key={value}
              aria-pressed={weather === value}
              onClick={() => setWeather(value)}
            >
              {value === 'clear' ? 'Clear' : value === 'rain' ? 'Rain' : 'Snow'}
            </button>
          ))}
        </div>
        <button
          className="motion-toggle"
          aria-pressed={!motion}
          onClick={() => setMotion(!motion)}
        >
          {motion ? 'Pause animation' : 'Resume animation'}
        </button>
      </section>
    </aside>
  )
}
