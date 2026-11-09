import { mathematics } from '../../content/subjects/mathematics'
import { SubjectPage } from './SubjectPage'
import { mathematicsScenes } from '../../content/mathematicsScenes'
import { Link } from 'react-router'
import { mathematicsReferences } from '../../content/mathematicsReferences'
export function MathematicsPage() {
  return (
    <SubjectPage
      subject={mathematics}
      explore={
        <>
          <p>
            Some ideas from numerical analysis, computational algebra, and
            dynamics that I want to keep playing with. The little desk above
            cycles through these sketches; here’s what you’re looking at.
          </p>
          <div className="math-sketch-grid">
            {mathematicsScenes.map((scene) => (
              <article className="math-sketch" key={scene.id}>
                <img
                  src={scene.study}
                  width={582}
                  height={288}
                  alt={scene.description}
                  loading="lazy"
                />
                <h3>{scene.topic}</h3>
                <p>{scene.explanation}</p>
              </article>
            ))}
          </div>
          <aside className="math-paper-note">
            <p className="eyebrow">A PAPER TAKING SHAPE</p>
            <h3>Another thread in algebra</h3>
            <p>
              I’m planning an individual paper on algebraic structures this
              semester. There’s room here for its question, examples, and the
              pictures that make the idea click, once the topic takes shape.
            </p>
          </aside>
          <details className="math-sources">
            <summary>Behind the sketches / further reading</summary>
            <p>
              Original numerical illustrations, drawn for this site. These
              references helped check the ideas behind them.
            </p>
            <ul>
              {mathematicsReferences.map((reference) => (
                <li key={reference.href}>
                  <a href={reference.href}>{reference.label} ↗</a>
                </li>
              ))}
            </ul>
          </details>
        </>
      }
      overlap={
        <>
          <p>
            I like the moments when an abstract idea suddenly has somewhere to
            go: orthogonal functions become angular shapes in quantum mechanics,
            a transform turns an instrument signal into a spectrum, or a
            numerical method becomes a small piece of software.
          </p>
          <p>
            One early attempt to connect these threads is{' '}
            <Link to="/projects/catalyst-workflow">
              Molecules, meet computation
            </Link>
            . It starts with chemistry and asks what computation can help us
            explore.
          </p>
        </>
      }
    />
  )
}
