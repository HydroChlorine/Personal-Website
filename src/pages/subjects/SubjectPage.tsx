import { Link } from 'react-router'
import type { ReactNode } from 'react'
import type { Subject } from '../../content/types'
import { projects } from '../../content/projects'
import { subjects } from '../../content/subjects'
import { PageHeading } from '../../components/ui/PageHeading'
import { Panel, EmptyShelf } from '../../components/ui/Panel'
import { ProjectCard } from '../../components/ui/ProjectCard'
import { PixelIcon } from '../../components/ui/PixelIcon'
export function SubjectPage({
  subject,
  explore,
  overlap,
}: {
  subject: Subject
  explore?: ReactNode
  overlap?: ReactNode
}) {
  const related = projects.filter((project) =>
    project.subjects.includes(subject.id),
  )
  return (
    <div className={`subject-page ${subject.id}`}>
      <PageHeading
        eyebrow={`${subject.number} / ONE OF THREE THREADS`}
        title={subject.name}
      >
        {subject.tagline}
      </PageHeading>
      <Panel className="subject-intro">
        <PixelIcon name={subject.id} />
        <p>{subject.introduction}</p>
        <div className="topic-tags">
          {subject.interests.map((interest) => (
            <span key={interest}>{interest}</span>
          ))}
        </div>
      </Panel>
      <section className="work-section">
        <div className="section-label">
          <h2>Things I’m working on</h2>
          <Link to={`/projects?subject=${subject.id}`}>Browse projects ↗</Link>
        </div>
        <div className="project-grid">
          {related.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
      <Panel title="More to explore">
        {explore ?? (
          <div className="shelf-list">
            {subject.shelves.map((shelf) => (
              <EmptyShelf key={shelf.title} title={shelf.title}>
                {shelf.description}
              </EmptyShelf>
            ))}
          </div>
        )}
      </Panel>
      <Panel eyebrow="FOLLOW ANOTHER THREAD" title="The ideas overlap">
        {overlap ?? (
          <p>
            Some projects belong in more than one place. Follow a connection, or
            try something different.
          </p>
        )}
        <div className="inline-links">
          {subjects
            .filter((other) => other.id !== subject.id)
            .map((other) => (
              <Link to={`/${other.id}`} key={other.id}>
                {other.name} ↗
              </Link>
            ))}
        </div>
      </Panel>
    </div>
  )
}
