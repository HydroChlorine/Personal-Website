import { Link } from 'react-router'
import { chemistry } from '../../content/subjects/chemistry'
import { chemistryExperienceCards } from '../../content/chemistry/experiences'
import { EmptyShelf } from '../../components/ui/Panel'
import { SubjectPage } from './SubjectPage'
export function ChemistryPage() {
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
              I thought about an experiment. Follow a picture for a short
              illustrated visit.
            </p>
          </div>
          <div className="math-sketch-grid laboratory-grid">
            {chemistryExperienceCards.map((item, index) => (
              <Link
                className={`math-sketch math-sketch-link laboratory-card ${index === 0 ? 'math-featured laboratory-featured' : ''}`}
                to={`/chemistry/experiences/${item.slug}`}
                key={item.slug}
              >
                <img
                  src={item.preview}
                  width={384}
                  height={216}
                  alt={item.previewAlt}
                  loading="lazy"
                />
                <div className="math-sketch-copy">
                  <span className="small-label">
                    {index === 0
                      ? 'START HERE / A DRINK BECOMES A MODEL'
                      : item.course === 'CHEM 3020'
                        ? 'ANALYTICAL CHEMISTRY / A LAB EXPERIENCE'
                        : 'PHYSICAL CHEMISTRY / A LAB EXPERIENCE'}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <span className="math-read-more">
                    Follow the experiment ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p className="small-note laboratory-note">
            These are illustrated reflections on my course laboratory work. Most
            animations are teaching models; the tonic-water and chlorophyll
            point plots are identified where they reproduce recorded readings.
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
