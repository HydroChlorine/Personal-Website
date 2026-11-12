import { mathematics } from '../../content/subjects/mathematics'
import { SubjectPage } from './SubjectPage'
import { mathematicsScenes } from '../../content/mathematicsScenes'
import { Link } from 'react-router'
import { mathematicsReferences } from '../../content/mathematicsReferences'
import { mathTopics } from '../../content/mathematics'
export function MathematicsPage() {
  return (
    <SubjectPage
      subject={mathematics}
      explore={
        <>
          <p>
            Some ideas from numerical analysis, computational algebra, and
            dynamics that I want to keep playing with. Start with interpolation:
            a small curve opens a bigger question about how we design
            experiments. Each picture leads into a longer illustrated story.
          </p>
          <div className="math-sketch-grid">
            {mathematicsScenes.map((scene) => {
              const topic = mathTopics.find(
                (topic) => topic.sceneId === scene.id,
              )
              const contents = (
                <>
                  <img
                    src={scene.study}
                    width={582}
                    height={288}
                    alt={scene.description}
                    loading="lazy"
                  />
                  <div className="math-sketch-copy">
                    {topic && (
                      <span className="small-label">
                        {scene.id === 'interpolation'
                          ? 'START HERE / FROM CURVES TO EXPERIMENTS'
                          : scene.id === 'lorenz'
                            ? 'FEATURED CONNECTION / CHAOS & CHIRALITY'
                            : 'FOLLOW THE IDEA'}
                      </span>
                    )}
                    <h3>{scene.topic}</h3>
                    <p>{topic?.summary ?? scene.explanation}</p>
                    {topic && (
                      <span className="math-read-more">
                        {scene.id === 'interpolation'
                          ? 'Where should the next experiment go? ↗'
                          : 'Read the illustrated story ↗'}
                      </span>
                    )}
                  </div>
                </>
              )
              return topic ? (
                <Link
                  className={`math-sketch math-sketch-link ${scene.id === 'interpolation' ? 'math-featured' : ''}`}
                  to={`/mathematics/topics/${topic.slug}`}
                  key={scene.id}
                >
                  {contents}
                </Link>
              ) : (
                <article className="math-sketch" key={scene.id}>
                  {contents}
                </article>
              )
            })}
          </div>
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
          <p>
            For a view from the bench, try{' '}
            <Link to="/chemistry/snippets/five-dyes-one-spectrum">
              five dyes in one spectrum
            </Link>{' '}
            or{' '}
            <Link to="/chemistry/snippets/the-empty-cell-spectrum">
              an empty cell with its own signal
            </Link>
            . For a view from software,{' '}
            <Link to="/computer-science/topics/proofs-as-programs">
              formal verification
            </Link>{' '}
            makes logical structure executable, and{' '}
            <Link to="/projects/four-dimensions">the 4D game</Link> makes a
            change of coordinates visible.
          </p>
        </>
      }
    />
  )
}
