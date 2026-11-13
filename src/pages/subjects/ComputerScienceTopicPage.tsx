import { Link, useParams } from 'react-router'
import { csTopics } from '../../content/computer-science'
import { ProjectArticle } from '../../components/articles/ProjectArticle'
import { PageHeading } from '../../components/ui/PageHeading'
import { RelatedIdeas } from '../../components/navigation/RelatedIdeas'
import { NotFoundPage } from '../NotFoundPage'

export function ComputerScienceTopicPage() {
  const { slug } = useParams()
  const topic = csTopics.find((item) => item.slug === slug)
  if (!topic) return <NotFoundPage />
  return (
    <>
      <Link className="back-link" to="/computer-science">
        ← Back to computer science
      </Link>
      <PageHeading
        eyebrow="COMPUTER SCIENCE / AN IDEA TO FOLLOW"
        title={topic.title}
      >
        {topic.summary}
      </PageHeading>
      <ProjectArticle key={topic.slug} article={topic.article} />
      <RelatedIdeas id={topic.slug} />
    </>
  )
}
