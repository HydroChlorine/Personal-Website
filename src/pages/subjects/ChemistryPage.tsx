import { useState } from 'react'
import { Link, useOutletContext } from 'react-router'
import { chemistry } from '../../content/subjects/chemistry'
import { chemistryExperienceCards } from '../../content/chemistry/experiences'
import { EmptyShelf } from '../../components/ui/Panel'
import { SubjectPage } from './SubjectPage'

function SnippetCard({
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
      to={`/chemistry/snippets/${item.slug}`}
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
            : `${item.category.toUpperCase()} / A CHEMISTRY SNIPPET`}
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
      overlap={
        <>
          <p>
            A spectrum is a chemical observation and a mathematical signal. A
            model is useful only when it respects what the instrument and the
            sample can actually do.
          </p>
          <p>
            In{' '}
            <Link to="/chemistry/snippets/tonic-water-fluorescence">
              the tonic-water story
            </Link>
            , a difficult measurement led to a different fit.{' '}
            <Link to="/mathematics/topics/mind-the-edges">
              Choosing the next experiment
            </Link>{' '}
            takes that question further: which conditions would teach us the
            most?
          </p>
          <p>
            <Link to="/chemistry/snippets/five-dyes-one-spectrum">
              Separating five dyes
            </Link>{' '}
            gives{' '}
            <Link to="/mathematics/topics/same-matrix-new-view">
              matrix methods
            </Link>{' '}
            something tangible to solve.{' '}
            <Link to="/mathematics/topics/a-signal-unfolded">
              Fourier transforms
            </Link>{' '}
            connect NMR and infrared measurements, while{' '}
            <Link to="/projects/catalyst-workflow">
              Molecules, meet computation
            </Link>{' '}
            turns a chemical search into a small software workflow.
          </p>
        </>
      }
      explore={
        <>
          <div className="laboratory-opening">
            <p className="eyebrow">FROM THE LABORATORY / SMALL DISCOVERIES</p>
            <h3>Questions from the bench. A few things worth keeping.</h3>
            <p>
              A few things I’ve learned and practiced along the way as a
              chemist. Some gave satisfying answers; others needed more
              deliberation. These snippets follow the questions, measurements,
              and reasoning behind them.
            </p>
          </div>
          <div className="math-sketch-grid laboratory-grid">
            {chemistryExperienceCards.slice(0, 3).map((item, index) => (
              <SnippetCard
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
                ? 'All 15 snippets'
                : 'Three moments at the bench. Twelve more to explore.'}
            </p>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls="more-laboratory-snippets"
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded
                ? 'Show fewer snippets ↑'
                : 'Expand all snippets (12 more) ↓'}
            </button>
          </div>
          <div id="more-laboratory-snippets" hidden={!expanded}>
            {expanded && (
              <div className="math-sketch-grid laboratory-grid laboratory-more">
                {chemistryExperienceCards.slice(3).map((item) => (
                  <SnippetCard key={item.slug} item={item} motion={motion} />
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
