import { profile } from '../content/profile'
import { PageHeading } from '../components/ui/PageHeading'
import { Panel } from '../components/ui/Panel'
export function ContactPage() {
  return (
    <>
      <PageHeading eyebrow="A NOTE FROM THE OTHER SIDE" title="Say hello">
        A question, a shared interest, or something you think I’d like? You can
        find me here.
      </PageHeading>
      <Panel title="Around the internet">
        <div className="contact-list">
          <a href={`mailto:${profile.email}`}>
            <span className="small-label">EMAIL</span>
            <span>{profile.email} ↗</span>
          </a>
          <a href={profile.github}>
            <span className="small-label">GITHUB</span>
            <span>HydroChlorine ↗</span>
          </a>
        </div>
      </Panel>
      <Panel title="For the formal details">
        {profile.cvUrl ? (
          <a className="text-link" href={profile.cvUrl}>
            Read my CV ↗
          </a>
        ) : (
          <p>A public CV will be added here when it’s ready.</p>
        )}
        <p className="small-note">{profile.location}</p>
      </Panel>
    </>
  )
}
