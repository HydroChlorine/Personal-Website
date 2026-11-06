import { Link } from 'react-router'
import { profile } from '../content/profile'
import { PageHeading } from '../components/ui/PageHeading'
import { Panel, EmptyShelf } from '../components/ui/Panel'
export function AboutPage() {
  return (
    <>
      <PageHeading
        eyebrow="THE PERSON BEHIND THE PAGES"
        title="A little about me"
      >
        Lichen Huang, also online as HydroChlorine.
      </PageHeading>
      <Panel>
        <div className="prose">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Panel>
      <Panel title="A few stops along the way">
        <ol className="timeline">
          {profile.milestones.map((item) => (
            <li key={item.title}>
              <span className="small-label">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </li>
          ))}
        </ol>
      </Panel>
      <Panel title="Away from the workbench">
        {profile.personalDetails.length ? (
          profile.personalDetails.map((item) => (
            <div key={item.label}>
              <h3>{item.label}</h3>
              <p>{item.text}</p>
            </div>
          ))
        ) : (
          <EmptyShelf title="The other bits of me">
            A few personal interests, favorites, and small stories will go here.
          </EmptyShelf>
        )}
        <Link className="text-link" to="/personal">
          Visit my personal corner →
        </Link>
      </Panel>
    </>
  )
}
