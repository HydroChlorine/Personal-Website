import { Link } from 'react-router'
import { connectedIdeas } from '../../content/connections'
import { PublicationBadge } from '../ui/PublicationBadge'
import { Panel } from '../ui/Panel'

export default function RelatedIdeas({ id }: { id: string }) {
  const links = connectedIdeas(id)
  if (!links.length) return null
  const list = (items: typeof links) => (
    <ul className="idea-connections">
      {items.map((item) => (
        <li key={item.id}>
          <Link to={item.href}>
            {item.publication && (
              <>
                <PublicationBadge publication={item.publication} compact />
                <br />
              </>
            )}
            {item.title} ↗
          </Link>
          <p>{item.reason}</p>
        </li>
      ))}
    </ul>
  )
  return (
    <Panel eyebrow="FOLLOW A CONNECTION" title="Where this idea leads">
      {list(links.slice(0, 4))}
      {links.length > 4 && (
        <details className="more-connections">
          <summary>More connections ({links.length - 4})</summary>
          {list(links.slice(4))}
        </details>
      )}
    </Panel>
  )
}
