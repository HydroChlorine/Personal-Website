import { useSearchParams } from 'react-router'
import { projects } from '../content/projects'
import { subjects } from '../content/subjects'
import { PageHeading } from '../components/ui/PageHeading'
import { ProjectCard } from '../components/ui/ProjectCard'
export function ProjectsPage() {
  const [params, setParams] = useSearchParams()
  const selected = params.get('subject') ?? 'all'
  const filtered = projects.filter(
    (p) =>
      selected === 'all' ||
      p.subjects.includes(selected as (typeof p.subjects)[number]),
  )
  return (
    <>
      <PageHeading
        eyebrow="BUILT, TESTED, STILL TINKERING"
        title="The workbench"
      >
        Research, software, and small experiments. A growing collection, with a
        few outlines to start.
      </PageHeading>
      <div
        className="filters"
        role="group"
        aria-label="Filter projects by subject"
      >
        {[{ id: 'all', name: 'Everything' }, ...subjects].map((subject) => (
          <button
            key={subject.id}
            aria-pressed={selected === subject.id}
            onClick={() =>
              setParams(subject.id === 'all' ? {} : { subject: subject.id })
            }
          >
            {subject.name}
          </button>
        ))}
      </div>
      <p className="results-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
      </p>
      <div className="project-grid">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="panel">Nothing on this shelf yet. Try another subject.</p>
      )}
      <div className="panel collection-note">
        <h2>Room for the next thing</h2>
        <p>
          Graphics projects, mathematical experiments, and independent creations
          will join the collection as their stories and media are ready.
        </p>
      </div>
    </>
  )
}
