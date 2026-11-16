import { Link, useOutletContext } from 'react-router'
import type { Project } from '../../content/types'
import { PublicationBadge } from './PublicationBadge'
import { SiteMiniature } from './SiteMiniature'
export function ProjectCard({ project }: { project: Project }) {
  const { motion } = useOutletContext<{ motion: boolean }>()
  const preview = project.preview
  const demo = project.interactiveDemo === 'site-miniature'
  const content = (
    <>
      {project.publication && (
        <PublicationBadge publication={project.publication} />
      )}
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
      {preview && (
        <div
          className={`project-card-media${preview.overlay ? ' project-card-media-layered' : ''}`}
        >
          <img
            src={
              preview.overlay
                ? preview.still
                : motion
                  ? preview.gif
                  : preview.still
            }
            width={preview.width}
            height={preview.height}
            alt={preview.alt}
            loading="lazy"
            className={
              preview.overlay
                ? 'publication-original'
                : preview.pixelated
                  ? 'pixel-project-preview'
                  : undefined
            }
          />
          {preview.overlay && motion && (
            <img
              className="project-card-dot-overlay"
              src={preview.gif}
              width={preview.width}
              height={preview.height}
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
          )}
        </div>
      )}
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
    <Link
      className={`project-card${preview ? ' project-card-illustrated' : ''}`}
      to={`/projects/${project.slug}`}
    >
      {content}
    </Link>
  )
}
