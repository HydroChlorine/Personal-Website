import { Link } from 'react-router'
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <span className="footer-mark" aria-hidden="true">
          ✦
        </span>{' '}
        Lichen Huang <span className="muted">/ a work in progress</span>
      </div>
      <div>
        © {new Date().getFullYear()} <span className="footer-divider">·</span>
        <Link to="/credits">Credits & inspirations</Link>
      </div>
    </footer>
  )
}
