import { Link } from 'react-router'
import type { Project } from '../../content/types'
import { SiteMiniature } from './SiteMiniature'
export function ProjectCard({ project }: { project: Project }) {
  const demo = project.interactiveDemo === 'site-miniature'
  const content = (
    <>
      <div className="project-card-top">
        <span className="small-label">{project.kind}</span>
        <span aria-hidden="true">↗</span>
      </div>
      <h3>
        {demo ? (
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        ) : (
          project.title
        )}
      </h3>
      <p>{project.summary}</p>
      <div className="project-card-bottom">
        <span>
          {project.subjects
            .map((s) =>
              s === 'computer-science'
                ? 'CS'
                : s === 'mathematics'
                  ? 'Math'
                  : 'Chem',
            )
            .join(' / ')}
        </span>
        <span className="draft-label">
          {demo ? (
            <Link to={`/projects/${project.slug}`}>
              Read the project story ↗
            </Link>
          ) : project.progress ? (
            'Work in progress'
          ) : project.readiness === 'outline' ? (
            'Notes taking shape'
          ) : (
            'Read more'
          )}
        </span>
      </div>
    </>
  )
  return demo ? (
    <article className="project-card project-card-interactive">
      <div className="project-card-copy">{content}</div>
      <SiteMiniature />
    </article>
  ) : (
    <Link className="project-card" to={`/projects/${project.slug}`}>
      {content}
    </Link>
  )
}
