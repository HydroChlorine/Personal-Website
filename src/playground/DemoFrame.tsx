import type { ReactNode } from 'react'
import { Link } from 'react-router'
import './playground.css'
/** Standalone application shell: no rotating site banner or background effects. */
export function DemoFrame({
  title,
  subtitle,
  story,
  children,
}: {
  title: string
  subtitle: string
  story: string
  children: ReactNode
}) {
  return (
    <div className="demo-shell">
      <header className="demo-header">
        <div>
          <p className="eyebrow">AFTER HOURS / PLAYGROUND</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <nav aria-label="Demo navigation">
          <Link to="/playground">← Playground</Link>
          <Link to={story}>Project story ↗</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="demo-footer">
        Runs locally in this tab. <Link to="/credits">Credits & origins ↗</Link>
      </footer>
    </div>
  )
}
