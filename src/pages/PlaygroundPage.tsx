import { playground } from '../content/playground'
import { PageHeading } from '../components/ui/PageHeading'
import { Panel, EmptyShelf } from '../components/ui/Panel'
export function PlaygroundPage() {
  return (
    <>
      <PageHeading eyebrow="LESS READING, MORE TRYING" title="The playground">
        A future home for little tools, graphics, puzzles, and interactive
        experiments.
      </PageHeading>
      <Panel>
        {playground.length ? (
          playground.map((item) => (
            <article key={item.href}>
              <h2>
                <a href={item.href}>{item.title} ↗</a>
              </h2>
              <p>{item.description}</p>
            </article>
          ))
        ) : (
          <EmptyShelf title="The toys aren’t unpacked yet">
            As actual demos are ready, you’ll be able to try them here. For now,
            you can play with the weather outside the window.
          </EmptyShelf>
        )}
      </Panel>
    </>
  )
}
