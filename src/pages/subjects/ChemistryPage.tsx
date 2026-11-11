import { useState } from 'react'
import { Link, useOutletContext } from 'react-router'
import { chemistry } from '../../content/subjects/chemistry'
import { chemistryExperienceCards } from '../../content/chemistry/experiences'
import { EmptyShelf } from '../../components/ui/Panel'
import { SubjectPage } from './SubjectPage'

function ExperienceCard({
  item,
  featured = false,
  motion,
}: {
  item: (typeof chemistryExperienceCards)[number]
  featured?: boolean
  motion: boolean
}) {
  return (
    <Link
      className={`math-sketch math-sketch-link laboratory-card ${featured ? 'math-featured laboratory-featured' : ''}`}
      to={`/chemistry/experiences/${item.slug}`}
    >
      <img
        src={motion ? item.previewGif : item.preview}
        width={768}
        height={432}
        alt={item.previewAlt}
        loading="lazy"
      />
      <div className="math-sketch-copy">
        <span className="small-label">
          {featured
            ? 'START HERE / A DRINK BECOMES A MODEL'
            : item.course === 'CHEM 3020'
              ? 'ANALYTICAL CHEMISTRY / A LAB EXPERIENCE'
              : 'PHYSICAL CHEMISTRY / A LAB EXPERIENCE'}
        </span>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        <span className="math-read-more">Follow the experiment ↗</span>
      </div>
    </Link>
  )
}

export function ChemistryPage() {
  const { motion } = useOutletContext<{ motion: boolean }>()
  const [expanded, setExpanded] = useState(false)
  return (
    <SubjectPage
      subject={chemistry}
      explore={
        <>
          <div className="laboratory-opening">
            <p className="eyebrow">FROM THE LABORATORY / SMALL DISCOVERIES</p>
            <h3>Sometimes the interesting part wasn’t in the instructions.</h3>
            <p>
              A few experiences from analytical and physical chemistry:
              surprising signals, stubborn instruments, and small changes in how
              I thought about an experiment. Follow a scene for a short
              illustrated visit.
            </p>
          </div>
          <div className="math-sketch-grid laboratory-grid">
            {chemistryExperienceCards.slice(0, 3).map((item, index) => (
              <ExperienceCard
                key={item.slug}
                item={item}
                featured={index === 0}
                motion={motion}
              />
            ))}
          </div>
          <div className="laboratory-disclosure">
            <p className="small-note" role="status">
              {expanded
                ? 'All 15 experiences'
                : 'Three moments at the bench. Twelve more to explore.'}
            </p>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls="more-laboratory-experiences"
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded
                ? 'Show fewer experiences ↑'
                : 'Expand all experiences (12 more) ↓'}
            </button>
          </div>
          <div id="more-laboratory-experiences" hidden={!expanded}>
            {expanded && (
              <div className="math-sketch-grid laboratory-grid laboratory-more">
                {chemistryExperienceCards.slice(3).map((item) => (
                  <ExperienceCard key={item.slug} item={item} motion={motion} />
                ))}
              </div>
            )}
          </div>
          <p className="small-note laboratory-note">
            These scenes are artistic illustrations of the experiments. Recorded
            readings are identified within the stories.
          </p>
          <div className="shelf-list">
            {chemistry.shelves.slice(1).map((shelf) => (
              <EmptyShelf key={shelf.title} title={shelf.title}>
                {shelf.description}
              </EmptyShelf>
            ))}
          </div>
        </>
      }
    />
  )
}
