import { computerScience } from '../../content/subjects/computer-science'
import { SubjectPage } from './SubjectPage'
import { Link } from 'react-router'
import { csTopics, csProjectOrder } from '../../content/computer-science'
export function ComputerSciencePage() {
  return (
    <SubjectPage
      subject={computerScience}
      workTitle="Built, explored, still building"
      projectOrder={csProjectOrder}
      explore={
        <>
          <p>
            Some tools change how I build; others change what I can claim about
            what I built. Formal verification is one I want to explain through a
            concrete piece of work.
          </p>
          <div className="cs-topic-grid">
            {csTopics.map((topic) => (
              <Link
                className="math-sketch math-sketch-link cs-topic-featured"
                to={`/computer-science/topics/${topic.slug}`}
                key={topic.slug}
              >
                <img
                  src="/art/computer-science/v1/proof-study.png"
                  width={582}
                  height={288}
                  loading="lazy"
                  alt="Typed function blocks compose into a proof object, with its connections checked."
                />
                <div className="math-sketch-copy">
                  <span className="small-label">
                    FOLLOW THE IDEA / FORMAL VERIFICATION
                  </span>
                  <h3>{topic.title}</h3>
                  <p>{topic.summary}</p>
                  <span className="math-read-more">
                    Follow a claim into a checked proof ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </>
      }
      overlap={
        <>
          <p>
            Chemistry gives me questions; mathematics gives me ways to describe
            them; computer science helps me turn those descriptions into tools.
            In{' '}
            <Link to="/projects/catalyst-workflow">
              Molecules, meet computation
            </Link>
            , that meant connecting candidate structures, calculation inputs,
            and a small prediction model. That early project is one place where
            all three threads meet.
          </p>
          <p>
            The connections keep going. A{' '}
            <Link to="/mathematics/topics/a-signal-unfolded">
              Fourier transform
            </Link>{' '}
            becomes a signal-processing algorithm; a{' '}
            <Link to="/mathematics/topics/same-matrix-new-view">
              matrix factorization
            </Link>{' '}
            becomes a practical numerical tool. Graphics lets me see a model
            move, while formal verification asks which assumptions support a
            claim about a program. I want this corner to hold both the things I
            make and the reasoning behind them.
          </p>
        </>
      }
    />
  )
}
