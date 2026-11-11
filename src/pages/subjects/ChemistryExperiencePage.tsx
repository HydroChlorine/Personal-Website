import { Link, useParams } from 'react-router'
import { chemistryExperiences } from '../../content/chemistry/experiences/articles'
import { ProjectArticle } from '../../components/articles/ProjectArticle'
import { PageHeading } from '../../components/ui/PageHeading'
import { Panel } from '../../components/ui/Panel'
import { NotFoundPage } from '../NotFoundPage'
export function ChemistryExperiencePage() {
  const { slug } = useParams()
  const index = chemistryExperiences.findIndex((item) => item.slug === slug)
  const item = chemistryExperiences[index]
  if (!item) return <NotFoundPage />
  const next = chemistryExperiences[(index + 1) % chemistryExperiences.length]!
  return (
    <>
      <Link className="back-link" to="/chemistry">
        ← Back to chemistry
      </Link>
      <PageHeading eyebrow="CHEMISTRY / FROM THE LABORATORY" title={item.title}>
        {item.summary}
      </PageHeading>
      <ProjectArticle key={item.slug} article={item.article} />
      <Panel eyebrow="ANOTHER MOMENT AT THE BENCH" title={next.title}>
        <p>{next.summary}</p>
        <div className="inline-links">
          <Link to={`/chemistry/snippets/${next.slug}`}>Next snippet ↗</Link>
          <Link to="/chemistry">All chemistry snippets ↗</Link>
          {index === 0 && (
            <Link to="/mathematics/topics/mind-the-edges">
              Where should the next experiment go? ↗
            </Link>
          )}
        </div>
      </Panel>
    </>
  )
}
