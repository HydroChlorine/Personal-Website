import type { ChemistryScene as Scene } from '../../content/chemistryScenes'
import { useState } from 'react'
export function ChemistryScene({
  scene,
  motion,
  onNext,
}: {
  scene: Scene
  motion: boolean
  onNext: () => void
}) {
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const source = motion ? scene.gif : scene.still
  const displaySource = source === failedSource ? scene.still : source
  return (
    <figure
      className={`scene chemistry-scene ${motion ? '' : 'still'}`}
      data-scene-id={scene.id}
    >
      <img
        src={displaySource}
        alt={scene.description}
        className="scene-art"
        width={1152}
        height={384}
        onError={() => {
          if (displaySource !== scene.still) setFailedSource(source)
        }}
      />
      <button
        className="scene-portal"
        type="button"
        aria-label="Next laboratory scene"
        title="Another moment at the bench"
        onClick={onNext}
      >
        <span className="scene-touch-cue" aria-hidden="true">
          ✧
        </span>
      </button>
      <div className="scene-copy">
        <span className="scene-kicker">LICHEN HUANG / AT THE BENCH</span>
        <p>
          {scene.title[0]}
          <br />
          {scene.title[1]}
          <span className="cursor">_</span>
        </p>
        <p className="scene-subtitle">{scene.subtitle}</p>
      </div>
      <figcaption className="scene-caption">
        <span>
          <span className="lit-dot" /> A few moments in chemistry
        </span>
        <span>{scene.label}</span>
      </figcaption>
    </figure>
  )
}
