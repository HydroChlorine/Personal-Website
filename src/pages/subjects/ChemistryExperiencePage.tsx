import { Link, useParams } from 'react-router'
import { chemistryExperiences } from '../../content/chemistry/experiences/articles'
import { ProjectArticle } from '../../components/articles/ProjectArticle'
import { PageHeading } from '../../components/ui/PageHeading'
import { RelatedIdeas } from '../../components/navigation/RelatedIdeas'
import { NotFoundPage } from '../NotFoundPage'
export function ChemistryExperiencePage() {
  const { slug } = useParams()
  const index = chemistryExperiences.findIndex((item) => item.slug === slug)
  const item = chemistryExperiences[index]
  if (!item) return <NotFoundPage />
  return (
    <>
      <Link className="back-link" to="/chemistry">
        ← Back to chemistry
      </Link>
      <PageHeading eyebrow="CHEMISTRY / FROM THE LABORATORY" title={item.title}>
        {item.summary}
      </PageHeading>
      <ProjectArticle key={item.slug} article={item.article} />
      <RelatedIdeas id={item.slug} />
    </>
  )
}
