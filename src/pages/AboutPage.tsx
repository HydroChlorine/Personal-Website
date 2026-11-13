import { PersonalText } from '../components/typography/Typography'
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
          {profile.about.map((p, index) => (
            <p key={p}>
              {index === 0 ? <PersonalText text={p} word="love" /> : p}
            </p>
          ))}
        </div>
      </Panel>
      <Panel title="Still me">
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
      <Panel title="Still me again">
        {profile.personalDetails.length ? (
          profile.personalDetails.map((item) => (
            <div key={item.label}>
              <h3>{item.label}</h3>
              <p>{item.text}</p>
            </div>
          ))
        ) : (
          <EmptyShelf title="">
            <p>
              <PersonalText
                text="* I love the moon and cloud over sumshine. "
                word="love"
              />
            </p>
            <p>* Dim cozy spaces are where I create ideas. </p>
            <p>
              * Though love rainy and snowy weathers, but hate moisture in
              rooms.{' '}
            </p>
            <p>* Always want to eat healthy, but never succeeded. </p>
            <p>* Don't really love sweet treats, but never turned any down.</p>
          </EmptyShelf>
        )}
      </Panel>
    </>
  )
}
