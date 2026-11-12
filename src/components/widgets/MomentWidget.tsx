import { useId, useState } from 'react'
import { currentCheckIn } from '../../content/now'
import {
  attentionPicture,
  boundedLevel,
  displayLevel,
  energyLever,
  moodNeedle,
} from './momentState'

const metrics = [
  { key: 'mood', label: 'Mood profile' },
  { key: 'energy', label: 'Energy configuration' },
  { key: 'attention', label: 'Attention level' },
] as const
const colors = [
  '#bd8b94',
  '#cda38e',
  '#d5bd91',
  '#aec7a2',
  '#91c5bc',
  '#9bcddd',
]
function MoodDial({ value }: { value: number }) {
  const needle = moodNeedle(value)
  return (
    <svg
      className="moment-instrument"
      viewBox="0 0 180 83"
      role="img"
      aria-label={`Mood profile ${displayLevel(value)}, from minus one to plus one`}
      shapeRendering="crispEdges"
    >
      {Array.from({ length: 18 }, (_, i) => {
        const a = -Math.PI + (i * Math.PI) / 18,
          b = a + (Math.PI / 18) * 0.87
        const point = (r: number, angle: number) =>
          `${Math.round((90 + r * Math.cos(angle)) / 2) * 2},${Math.round((63 + r * Math.sin(angle)) / 2) * 2}`
        return (
          <polygon
            key={i}
            points={`${point(57, a)} ${point(57, b)} ${point(47, b)} ${point(47, a)}`}
            fill={colors[Math.floor(i / 3)]}
          />
        )
      })}
      <path d="M34 68H146" stroke="var(--line)" />
      <path
        d={`M90 63L${needle.x} ${needle.y}`}
        stroke="var(--text)"
        strokeWidth="2"
      />
      <rect
        x={needle.x - 2}
        y={needle.y - 2}
        width="4"
        height="4"
        fill="var(--gold)"
      />
      <rect x="87" y="60" width="6" height="6" fill="var(--gold)" />
      <g fill="var(--muted)" fontSize="8" fontFamily="monospace">
        <text x="19" y="72">
          −1
        </text>
        <text x="87" y="4">
          0
        </text>
        <text x="151" y="72">
          +1
        </text>
      </g>
    </svg>
  )
}
function EnergyLever({ value }: { value: number }) {
  const lever = energyLever(value)
  return (
    <svg
      className="moment-instrument energy-instrument"
      viewBox="0 0 180 96"
      role="img"
      aria-label={`Energy configuration ${displayLevel(value)}, from minus one to plus one`}
      shapeRendering="crispEdges"
    >
      <path
        d="M50 12H71V86H50V71H43V26H50Z"
        fill="var(--line)"
        stroke="var(--accent)"
      />
      <path d="M55 16H66V82H55Z" fill="var(--selected)" />
      <rect x="58" y="19" width="4" height="4" fill="var(--accent)" />
      <rect x="58" y="76" width="4" height="4" fill="var(--accent)" />
      <path
        d={`M58 48L${lever.x} ${lever.y}`}
        stroke="var(--shadow)"
        strokeWidth="10"
      />
      <path
        d={`M58 48L${lever.x} ${lever.y}`}
        stroke="var(--gold)"
        strokeWidth="5"
      />
      <rect
        x={lever.x - 4}
        y={lever.y - 5}
        width="9"
        height="11"
        fill="var(--gold)"
        stroke="var(--text)"
      />
      <rect x="54" y="44" width="8" height="8" fill="var(--text-soft)" />
      <path
        d={`M72 48H91V${lever.pointerY}H112`}
        stroke="var(--line-bright)"
        fill="none"
        strokeDasharray="2 3"
      />
      <path
        d={`M110 ${lever.pointerY - 3}H118V${lever.pointerY - 6}L125 ${lever.pointerY}L118 ${lever.pointerY + 6}V${lever.pointerY + 3}H110Z`}
        fill="var(--gold)"
      />
      <path d="M136 15V81" stroke="var(--accent)" />
      {[-1, -0.5, 0, 0.5, 1].map((level) => (
        <path
          key={level}
          d={`M132 ${48 - level * 31}H141`}
          stroke="var(--muted)"
        />
      ))}
      <g fill="var(--muted)" fontSize="8" fontFamily="monospace">
        <text x="148" y="20">
          +1
        </text>
        <text x="148" y="51">
          0
        </text>
        <text x="148" y="82">
          −1
        </text>
      </g>
    </svg>
  )
}

export function MomentWidget({ motion }: { motion: boolean }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const initial = {
    mood: boundedLevel(currentCheckIn.mood),
    energy: boundedLevel(currentCheckIn.energy),
    attention: boundedLevel(currentCheckIn.attention),
  }
  const [levels, setLevels] = useState(initial)
  const picture = attentionPicture(levels.attention)
  return (
    <section
      className={`sidebar-panel moment-widget ${motion ? '' : 'moment-still'}`}
      aria-label="Feelings"
    >
      <h2 className="moment-heading">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-instruments`}
          onClick={() => setOpen((value) => !value)}
        >
          Feelings <span aria-hidden="true">{open ? '−' : '+'}</span>
        </button>
      </h2>
      <p className="feelings-values" aria-label="Mood, energy, attention">
        {metrics
          .map((metric) => displayLevel(levels[metric.key]).replace('−', '-'))
          .join(' / ')}
      </p>
      <div id={`${id}-instruments`} hidden={!open}>
        <p className="moment-note">{currentCheckIn.note}</p>
        <div className="moment-metrics">
          {metrics.map((metric) => (
            <div className="moment-metric" key={metric.key}>
              <div className="moment-label">
                <span>{metric.label}</span>
                <output>{displayLevel(levels[metric.key])}</output>
              </div>
              {metric.key === 'mood' ? (
                <MoodDial value={levels.mood} />
              ) : metric.key === 'energy' ? (
                <EnergyLever value={levels.energy} />
              ) : (
                <div className="attention-window">
                  <img
                    className={`${picture.crisp ? 'attention-crisp' : 'attention-pixel'} ${motion ? 'attention-drift' : ''}`}
                    src={picture.src}
                    alt="Nyan Cat with a rainbow trail; the scene becomes clearer as attention rises."
                    width="180"
                    height="80"
                    style={{ filter: `blur(${picture.blur}px)` }}
                  />
                  <span className="attention-scale" aria-hidden="true">
                    −1 ········· 0 ········· +1
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="moment-baseline">−1 low · 0 usual · +1 high</p>
        <div className="moment-tuner">
          {metrics.map((metric) => (
            <label key={metric.key}>
              <span>{metric.label}</span>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.01"
                value={levels[metric.key]}
                onChange={(event) =>
                  setLevels((values) => ({
                    ...values,
                    [metric.key]: boundedLevel(Number(event.target.value)),
                  }))
                }
              />
            </label>
          ))}
          <button
            type="button"
            className="moment-reset"
            onClick={() => setLevels(initial)}
          >
            Reset to my check-in ↺
          </button>
        </div>
      </div>
    </section>
  )
}
