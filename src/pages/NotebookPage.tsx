import { Link } from 'react-router'
import { notes } from '../content/notes'
import { PageHeading } from '../components/ui/PageHeading'
import { Panel, EmptyShelf } from '../components/ui/Panel'
export function NotebookPage() {
  return (
    <>
      <PageHeading eyebrow="LOOSE LEAVES & SIDE QUESTS" title="The notebook">
        Passing thoughts, loose ends, and things I want to remember.
      </PageHeading>
      <Panel>
        {notes.length ? (
          <div className="note-list">
            {notes.map((note) => (
              <article key={note.slug}>
                <time dateTime={note.date}>{note.date}</time>
                <h2>
                  <Link to={`/notebook/${note.slug}`}>{note.title}</Link>
                </h2>
                <p>{note.summary}</p>
              </article>
            ))}
          </div>
        ) : (
          <EmptyShelf title="A fresh notebook">
            The first entry is still unwritten. There will be room here for
            chemistry, mathematics, programming, and the occasional detour.
          </EmptyShelf>
        )}
      </Panel>
    </>
  )
}
