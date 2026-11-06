import { Link } from 'react-router'
import { profile } from '../../content/profile'
import { PixelIcon } from '../ui/PixelIcon'
export function SiteHeader() {
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <span className="brand-emblem">
          <PixelIcon name="chemistry" />
        </span>
        <span>
          hydrochlorine<span className="brand-domain"> / personal website</span>
        </span>
      </Link>
      <div className="header-links">
        <a href={profile.github}>GitHub ↗</a>
        <Link to="/contact">Say hello ↗</Link>
      </div>
    </header>
  )
}
