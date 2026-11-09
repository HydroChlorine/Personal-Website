import { useState } from 'react'
import type { MathematicsScene as Scene } from '../../content/mathematicsScenes'

export function MathematicsScene({
  scene,
  motion,
  onNext,
}: {
  scene: Scene
  motion: boolean
  onNext: () => void
}) {
  const [failedScene, setFailedScene] = useState<string | null>(null)
  const animated = motion && failedScene !== scene.id
  return (
    <figure
      className={`scene mathematics-scene ${motion ? '' : 'still'}`}
      data-scene-id={scene.id}
    >
      <picture>
        <source
          media="(max-width: 540px)"
          srcSet={animated ? scene.mobileGif : scene.mobileStill}
        />
        <img
          src={animated ? scene.gif : scene.still}
          alt={scene.description}
          className="scene-art"
          width={1152}
          height={384}
          onError={() => {
            if (animated) setFailedScene(scene.id)
          }}
        />
      </picture>
      <button
        className="scene-portal"
        type="button"
        aria-label="Next mathematics scene"
        title="Another thought at the desk"
        onClick={onNext}
      >
        <span className="scene-touch-cue" aria-hidden="true">
          ✧
        </span>
      </button>
      <div className="scene-copy">
        <span className="scene-kicker">LICHEN HUANG / AFTER HOURS</span>
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
          <span className="lit-dot" /> A few thoughts in mathematics
        </span>
        <span>{scene.label}</span>
      </figcaption>
    </figure>
  )
}
