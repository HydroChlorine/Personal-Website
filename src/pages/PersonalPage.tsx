import { profile } from '../content/profile'
import { gallery } from '../content/gallery'
import { collectedLinks } from '../content/links'
import { PageHeading } from '../components/ui/PageHeading'
import { Panel, EmptyShelf } from '../components/ui/Panel'
export function PersonalPage() {
  return (
    <>
      <PageHeading
        eyebrow="BEYOND THE SUBJECT LABELS"
        title="The personal corner"
      >
        For the favorites, photographs, and small things that make this place
        mine.
      </PageHeading>
      <Panel title="Things I like">
        {profile.personalDetails.length ? (
          profile.personalDetails.map((item) => (
            <div key={item.label}>
              <h3>{item.label}</h3>
              <p>{item.text}</p>
            </div>
          ))
        ) : (
          <EmptyShelf title="A few favorites to come">
            Books, games, hobbies, or whatever else I decide to share.
          </EmptyShelf>
        )}
      </Panel>
      <Panel title="Pictures & little keepsakes">
        {gallery.length ? (
          <div className="gallery-grid">
            {gallery.map((item) => (
              <figure key={item.src}>
                <img src={item.src} alt={item.alt} />
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <EmptyShelf title="An album waiting to happen">
            A space for photographs, renders, drawings, and things worth
            keeping.
          </EmptyShelf>
        )}
      </Panel>
      <Panel title="Elsewhere on the internet">
        {collectedLinks.length ? (
          <ul>
            {collectedLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.title} ↗</a>
                <p>{item.note}</p>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyShelf title="A small collection of links">
            Interesting sites, useful resources, and favorite corners of the web
            will go here.
          </EmptyShelf>
        )}
      </Panel>
    </>
  )
}
