import { Link, useParams } from 'react-router'
import { mathTopics } from '../../content/mathematics'
import { PageHeading } from '../../components/ui/PageHeading'
import { ProjectArticle } from '../../components/articles/ProjectArticle'
import { RelatedIdeas } from '../../components/navigation/RelatedIdeas'
import { NotFoundPage } from '../NotFoundPage'
export function MathematicsTopicPage() {
  const { slug } = useParams()
  const topic = mathTopics.find((item) => item.slug === slug)
  if (!topic) return <NotFoundPage />
  return (
    <>
      <Link className="back-link" to="/mathematics">
        ← Back to mathematics
      </Link>
      <PageHeading
        eyebrow="MATHEMATICS / AN IDEA TO FOLLOW"
        title={topic.title}
      >
        {topic.summary}
      </PageHeading>
      <ProjectArticle key={topic.slug} article={topic.article} />
      <RelatedIdeas id={topic.slug} />
    </>
  )
}
