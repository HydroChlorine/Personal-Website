import { Link } from 'react-router'
import type { Subject } from '../../content/types'
import { PixelIcon } from './PixelIcon'
export function SubjectLink({ subject }: { subject: Subject }) {
  return (
    <Link to={`/${subject.id}`} className={`subject-link ${subject.id}`}>
      <div className="subject-icon">
        <PixelIcon name={subject.id} />
      </div>
      <div>
        <span className="small-label">{subject.number} / a place for</span>
        <h3>{subject.name}</h3>
        <p>{subject.tagline}</p>
      </div>
      <span className="subject-arrow" aria-hidden="true">
        ↗
      </span>
    </Link>
  )
}
