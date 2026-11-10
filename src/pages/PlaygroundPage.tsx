import { Link } from 'react-router'
import { playground } from '../content/playground'
import { PageHeading } from '../components/ui/PageHeading'
import '../playground/playground.css'
export function PlaygroundPage() {
  return (
    <>
      <PageHeading eyebrow="LESS READING, MORE TRYING" title="The playground">
        A few things to open, play with, and make your own.
      </PageHeading>
      <p className="small-note">
        Each playable demo opens in its own tab, with room to explore.
      </p>
      <div className="playground-grid">
        {playground.map((item) => (
          <article className="playground-card" key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${item.title} in a new tab`}
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                width={900}
                height={600}
                loading="lazy"
              />
            </a>
            <span className="small-label">{item.label}</span>
            <h2>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.title} ↗
              </a>
            </h2>
            <p>{item.description}</p>
            <div className="inline-links">
              <a
                className="text-link"
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                Launch demo ↗
              </a>
              <Link className="text-link" to={item.story}>
                Read the story →
              </Link>
            </div>
          </article>
        ))}
        <article className="playground-card wip">
          <span className="small-label">
            FOUR DIMENSIONS / WORK IN PROGRESS
          </span>
          <h2>A different direction to explore</h2>
          <p>
            Our collaborative Godot game is still taking shape. Its training
            chambers explore moving through slices of a four-dimensional space.
            A browser build and packaged download are not available here yet.
          </p>
          <div className="inline-links">
            <Link className="text-link" to="/projects/four-dimensions">
              See the project →
            </Link>
            <a
              className="text-link"
              href="https://github.com/HydroChlorine/4Dto3D/releases"
              target="_blank"
              rel="noreferrer"
            >
              Check project releases ↗
            </a>
          </div>
        </article>
      </div>
    </>
  )
}
