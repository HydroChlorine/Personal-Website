import { Link, useParams } from 'react-router'
import { mathTopics } from '../../content/mathematics'
import { PageHeading } from '../../components/ui/PageHeading'
import { ProjectArticle } from '../../components/articles/ProjectArticle'
import { Panel } from '../../components/ui/Panel'
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
      <Panel title="Follow another idea">
        <div className="inline-links">
          {mathTopics
            .filter((item) => item.slug !== slug)
            .map((item) => (
              <Link key={item.slug} to={`/mathematics/topics/${item.slug}`}>
                {item.title} ↗
              </Link>
            ))}
        </div>
      </Panel>
    </>
  )
}
