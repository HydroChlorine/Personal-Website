import { inspirations } from '../content/credits'
import { PageHeading } from '../components/ui/PageHeading'
import { Panel } from '../components/ui/Panel'
export function CreditsPage() {
  return (
    <>
      <PageHeading eyebrow="WITH THANKS" title="Credits & inspirations">
        A place to keep track of the people and tools behind this little corner.
      </PageHeading>
      <Panel title="Places that inspired this one">
        {inspirations.map((item) => (
          <article className="credit-entry" key={item.href}>
            <h3>
              <a href={item.href}>{item.name} ↗</a>
            </h3>
            <p>{item.note}</p>
          </article>
        ))}
      </Panel>
      <Panel title="Artwork & type">
        <p>
          The nighttime workshop illustration and pixel icons were created for
          this website. The interface uses system fonts; no external font files
          or reference-site artwork are included.
        </p>
      </Panel>
      <Panel title="Open-source foundations">
        <p>
          Built with React, React Router, TypeScript, and Vite. React and React
          Router are MIT licensed; TypeScript is Apache-2.0 licensed; Vite is
          MIT licensed with bundled dependency notices.
        </p>
        <a className="text-link" href="/licenses/THIRD_PARTY_NOTICES.txt">
          Read third-party license notices ↗
        </a>
        <p className="small-note">
          Additional dependency licenses are recorded with the source. Credits
          will grow as new material is added.
        </p>
      </Panel>
    </>
  )
}
