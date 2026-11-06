import { Link } from 'react-router'
import { PageHeading } from '../components/ui/PageHeading'
import { Panel } from '../components/ui/Panel'
export function NotFoundPage() {
  return (
    <>
      <PageHeading eyebrow="404 / A WRONG TURN" title="An unexplored corner">
        There isn’t a page at this address.
      </PageHeading>
      <Panel>
        <p>Try another path, or head back to familiar ground.</p>
        <Link className="text-link" to="/">
          ← Back home
        </Link>
      </Panel>
    </>
  )
}
