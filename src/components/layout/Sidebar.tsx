import { Link, NavLink } from 'react-router'
import { site } from '../../config/site'
import { profile } from '../../content/profile'
import { PixelIcon } from '../ui/PixelIcon'
import { scenes } from '../../content/scenes'
import type { SceneSelection } from '../../content/scenes'
export function Sidebar({
  selection,
  chooseScene,
  nextScene,
  motion,
  setMotion,
}: {
  selection: SceneSelection
  chooseScene: (value: SceneSelection) => void
  nextScene: () => void
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
        <p>
          {selection === 'shuffle'
            ? motion
              ? 'A new season every 10 seconds.'
              : 'The seasons are paused.'
            : 'Stay a little longer in this season.'}
        </p>
        <label className="scene-select-label" htmlFor="scene-selection">
          Choose a scene
        </label>
        <select
          id="scene-selection"
          aria-label="Choose a scene"
          className="scene-select"
          value={selection}
          onChange={(event) => chooseScene(event.target.value)}
        >
          <option value="shuffle">Shuffle all seasons</option>
          {scenes.map((scene) => (
            <option key={scene.id} value={scene.id}>
              {scene.label}
            </option>
          ))}
        </select>
        <button className="next-scene" onClick={nextScene}>
          Next random scene →
        </button>
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
