import { PersonalText } from '../components/typography/Typography'
import { Link, useParams } from 'react-router'
import { notes } from '../content/notes'
import { PageHeading } from '../components/ui/PageHeading'
import { Panel } from '../components/ui/Panel'
import { NotFoundPage } from './NotFoundPage'
export function NoteDetailPage() {
  const { slug } = useParams()
  const note = notes.find((item) => item.slug === slug)
  if (!note) return <NotFoundPage />
  return (
    <>
      <Link className="back-link" to="/notebook">
        ← Back to the notebook
      </Link>
      <PageHeading eyebrow={note.date} title={note.title}>
        {note.summary}
      </PageHeading>
      <Panel>
        <article className="prose">
          {note.paragraphs.map((p, index) => (
            <p key={p}>
              {note.slug === 'hello-world' && index === 0 ? (
                <PersonalText text={p} word="Hello" letterIndex={2} />
              ) : (
                p
              )}
            </p>
          ))}
        </article>
      </Panel>
    </>
  )
}
