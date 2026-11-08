import { Link } from 'react-router'
export function SiteFooter({ motion }: { motion: boolean }) {
  return (
    <footer className="site-footer">
      <div>
        <button
          className="footer-spark"
          aria-label="Launch a firework in the sky"
          title="Make a wish"
          disabled={!motion}
          onClick={() => window.dispatchEvent(new Event('site:sky-spark'))}
        >
          ✦
        </button>{' '}
        Lichen Huang <span className="muted">/ a work in progress</span>
      </div>
      <div>
        © {new Date().getFullYear()} <span className="footer-divider">·</span>
        <Link to="/credits">Credits & inspirations</Link>
      </div>
    </footer>
  )
}
