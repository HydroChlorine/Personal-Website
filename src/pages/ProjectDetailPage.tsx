import { Link, useParams } from 'react-router'
import { projects } from '../content/projects'
import { subjects } from '../content/subjects'
import { PageHeading } from '../components/ui/PageHeading'
import { Panel, EmptyShelf } from '../components/ui/Panel'
import { ProjectArticle } from '../components/articles/ProjectArticle'
import { NotFoundPage } from './NotFoundPage'
import { RelatedIdeas } from '../components/navigation/RelatedIdeas'
import { SiteMiniature } from '../components/ui/SiteMiniature'
export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  if (!project) return <NotFoundPage />
  return (
    <>
      <Link className="back-link" to="/projects">
        ← Back to the workbench
      </Link>
      <PageHeading eyebrow={project.kind} title={project.title}>
        {project.summary}
      </PageHeading>
      {project.interactiveDemo && (
        <Panel title="A little version of this place">
          <SiteMiniature />
        </Panel>
      )}
      {project.article ? (
        <ProjectArticle
          key={project.slug}
          article={project.article}
          publication={project.publication}
        />
      ) : (
        <Panel>
          {project.progress && (
            <>
              <p className="eyebrow">WORK IN PROGRESS</p>
              {project.progress.expected && (
                <h2>Expected {project.progress.expected}</h2>
              )}
            </>
          )}
          <div className="prose">
            {project.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="inline-links">
            {subjects
              .filter((s) => project.subjects.includes(s.id))
              .map((s) => (
                <Link key={s.id} to={`/${s.id}`}>
                  {s.name} ↗
                </Link>
              ))}
          </div>
        </Panel>
      )}
      {project.article ? null : project.media ? (
        <figure className="panel">
          <img
            className="project-media"
            src={project.media.src}
            alt={project.media.alt}
          />
          {project.media.caption && (
            <figcaption>{project.media.caption}</figcaption>
          )}
        </figure>
      ) : project.progress ? null : (
        <Panel>
          <EmptyShelf title="A closer look, soon">
            Pictures, examples, and the longer story still need to be collected
            for this entry.
          </EmptyShelf>
        </Panel>
      )}
      <RelatedIdeas id={project.slug} />
      {project.links.length > 0 && (
        <Panel title="Further reading">
          <div className="inline-links">
            {project.links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label} ↗
              </a>
            ))}
          </div>
        </Panel>
      )}
    </>
  )
}
