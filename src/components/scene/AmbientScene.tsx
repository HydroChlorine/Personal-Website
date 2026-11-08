import { useState } from 'react'
import type { CampusScene } from '../../content/scenes'

export function AmbientScene({
  scene,
  motion,
  onNext,
}: {
  scene: CampusScene
  motion: boolean
  onNext: () => void
}) {
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const source = motion ? scene.gif : scene.still
  // A missing GIF falls back to that scene's still; the original SVG remains
  // available as a final fallback rather than leaving an empty image region.
  const displaySource = failedSource === source ? scene.still : source
  return (
    <figure
      className={`scene campus-scene ${motion ? '' : 'still'}`}
      data-scene-id={scene.id}
    >
      <img
        src={displaySource}
        alt={scene.description}
        className="scene-art"
        width={1152}
        height={384}
        onError={(event) => {
          if (displaySource === scene.still)
            event.currentTarget.src = '/art/night-workshop.svg'
          else setFailedSource(source)
        }}
      />
      <button
        className="scene-portal"
        type="button"
        aria-label="Next seasonal scene"
        title="A little change of season"
        onClick={onNext}
      >
        <span className="scene-touch-cue" aria-hidden="true">
          ✧
        </span>
      </button>
      <div className="scene-copy">
        <span className="scene-kicker">LICHEN HUANG / HYDROCHLORINE</span>
        <p>
          A small corner
          <br />
          of the internet<span className="cursor">_</span>
        </p>
        <p className="scene-subtitle">
          Chemistry, mathematics & things I make.
        </p>
      </div>
      <figcaption className="scene-caption">
        <span>
          <span className="lit-dot" /> Baker Lab + PSB · Cornell
        </span>
        <span>{scene.label}</span>
      </figcaption>
    </figure>
  )
}
