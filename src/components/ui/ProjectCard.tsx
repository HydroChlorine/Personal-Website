import { Link } from 'react-router'
import type { Project } from '../../content/types'
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className="project-card" to={`/projects/${project.slug}`}>
      <div className="project-card-top">
        <span className="small-label">{project.kind}</span>
        <span aria-hidden="true">↗</span>
      </div>
      <h3>{project.title}</h3>
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
          {project.readiness === 'outline' ? 'Notes taking shape' : 'Read more'}
        </span>
      </div>
    </Link>
  )
}
