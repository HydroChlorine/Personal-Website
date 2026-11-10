import { useEffect, useRef, useState } from 'react'
import type { PointerEvent, CSSProperties } from 'react'
import { DemoFrame } from '../DemoFrame'
import {
  WheelPattern,
  PALETTE,
  MATERIAL_LABELS,
  PULSE_MATERIALS,
  SPARK_MATERIALS,
} from './pattern.ts'
import type { Material, Point } from './pattern.ts'
import {
  FireworkSimulation,
  DEFAULTS,
  trailIndex,
  trailOpacity,
} from './simulation.ts'
import type { Settings } from './simulation.ts'

/** Canvas adapter for the original pattern/snapshot/force-field simulation. */
export function FireworksDemo() {
  const [pattern] = useState(() => new WheelPattern(4)),
    [sim] = useState(() => new FireworkSimulation())
  const editor = useRef<HTMLCanvasElement>(null),
    sky = useRef<HTMLCanvasElement>(null),
    stroke = useRef<Point | null>(null)
  const [material, setMaterial] = useState<Material>('rose'),
    [revision, redraw] = useState(0),
    [settings, setSettings] = useState<Settings>({ ...DEFAULTS })
  const [skyRevision, refreshSky] = useState(0)
  const [paused, setPaused] = useState(false),
    [trails, setTrails] = useState(true),
    [message, setMessage] = useState(
      'Paint the wheel. Click the sky to launch it.',
    ),
    [active, setActive] = useState(0)
  function setting<K extends keyof Settings>(name: K, value: Settings[K]) {
    setSettings((s) => ({ ...s, [name]: value }))
  }
  useEffect(() => {
    const canvas = editor.current,
      ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, 400, 400)
    ctx.fillStyle = '#080e1b'
    ctx.fillRect(0, 0, 400, 400)
    ctx.strokeStyle = '#30485d'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(200, 200, 183, 0, Math.PI * 2)
    ctx.stroke()
    for (const cell of pattern.cells) {
      ctx.beginPath()
      ctx.arc(
        200 + cell.x * 180,
        200 - cell.y * 180,
        pattern.cellRadius * 174,
        0,
        Math.PI * 2,
      )
      ctx.fillStyle = PALETTE[cell.material]
      ctx.fill()
      ctx.strokeStyle = cell.material === 'marker' ? '#ffffff' : '#526478'
      ctx.stroke()
      if (cell.material === 'marker') {
        ctx.fillStyle = '#080e1b'
        ctx.fillRect(200 + cell.x * 180 - 3, 200 - cell.y * 180 - 3, 6, 6)
      }
    }
  }, [pattern, revision])
  useEffect(() => {
    const canvas = sky.current,
      ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let frame = 0,
      last = 0,
      lastReport = 0
    function draw(now: number) {
      const context = ctx!,
        w = 1000,
        h = 680,
        scale = w / 16
      sim.paused = paused
      if (last && !document.hidden) sim.advance((now - last) / 1000)
      last = now
      context.fillStyle = '#060b16'
      context.fillRect(0, 0, w, h)
      for (let i = 0; i < 48; i++) {
        context.fillStyle = i % 5 ? '#223045' : '#5a728b'
        context.fillRect(
          (i * 137 + 43) % w,
          (i * 83 + 37) % (h - 40),
          i % 5 ? 1 : 2,
          1,
        )
      }
      const xy = (x: number, y: number) => [
        w / 2 + x * scale,
        h - (y + 4.5) * scale,
      ]
      context.strokeStyle = '#253c53'
      context.lineWidth = 1
      context.beginPath()
      context.moveTo(0, h - 12)
      context.lineTo(w, h - 12)
      context.stroke()
      context.globalCompositeOperation = 'lighter'
      for (const shell of sim.shells) {
        if (shell.burstAge >= 0) continue
        const [x, y] = xy(shell.x, shell.y)
        context.fillStyle = '#ffe2a8'
        context.fillRect(x - 2, y - 4, 4, 8)
        context.strokeStyle = '#d9a365'
        context.beginPath()
        context.moveTo(x, y + 4)
        context.lineTo(x - shell.vx * 2, y + 15)
        context.stroke()
      }
      for (const p of sim.sparks) {
        if (!p.active) continue
        const color = PALETTE[p.material]
        context.strokeStyle = color
        context.fillStyle = color
        if (trails) {
          for (let j = 1; j < p.trailCount; j++) {
            const a = trailIndex(p, j - 1),
              b = trailIndex(p, j)
            const opacity = trailOpacity(p.trailAge[b])
            if (opacity < 0.025) continue
            context.globalAlpha = opacity * 0.6
            context.lineWidth = 1.5
            context.beginPath()
            context.moveTo(
              ...(xy(p.trailX[a], p.trailY[a]) as [number, number]),
            )
            context.lineTo(
              ...(xy(p.trailX[b], p.trailY[b]) as [number, number]),
            )
            context.stroke()
          }
        }
        if (p.headVisible) {
          const [x, y] = xy(p.x, p.y)
          context.globalAlpha = Math.min(1, (p.life - p.age) * 1.5)
          context.beginPath()
          context.arc(x, y, Math.max(1, p.size * scale * 0.45), 0, Math.PI * 2)
          context.fill()
        }
      }
      context.globalAlpha = 1
      context.globalCompositeOperation = 'source-over'
      if (now - lastReport > 250) {
        setActive(sim.activeCount)
        lastReport = now
      }
      if (!paused && (sim.shells.length || sim.activeCount))
        frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [sim, paused, trails, skyRevision])
  function paint(event: PointerEvent<HTMLCanvasElement>, start = false) {
    if (!start && !stroke.current) return
    const rect = event.currentTarget.getBoundingClientRect(),
      p = {
        x: (((event.clientX - rect.left) / rect.width) * 400 - 200) / 180,
        y: (200 - ((event.clientY - rect.top) / rect.height) * 400) / 180,
      }
    if (start) {
      event.currentTarget.setPointerCapture(event.pointerId)
      stroke.current = p
    }
    if (Math.hypot(p.x, p.y) < 1.15) {
      pattern.paint(stroke.current ?? p, p, material)
      redraw((r) => r + 1)
    }
    stroke.current = p
  }
  function launch(cursor: Point = { x: 0, y: 6 }) {
    if (paused) {
      setMessage('Resume the sky before launching.')
      return
    }
    sim.launch(pattern.snapshot(), settings, cursor)
    setMessage(sim.message)
    refreshSky((v) => v + 1)
  }
  function slider(
    name: keyof Settings,
    label: string,
    min: number,
    max: number,
    step: number,
  ) {
    return (
      <label className="demo-slider" key={name}>
        <span>
          {label}
          <output>{settings[name]}</output>
        </span>
        <input
          aria-label={label}
          type="range"
          min={min}
          max={max}
          step={step}
          value={Number(settings[name])}
          onChange={(e) => setting(name, Number(e.target.value))}
        />
      </label>
    )
  }
  return (
    <DemoFrame
      title="Paint a firework"
      subtitle="A little color, a little force, a sky of your own."
      story="/projects/paint-a-firework"
    >
      <div className="demo-workspace firework-workspace">
        <aside className="demo-controls" aria-label="Firework design">
          <h2>Paint the wheel</h2>
          <p className="demo-help">
            Drag over the cells. Colored cells become sparks; pulse cells push
            them outward.
          </p>
          <canvas
            ref={editor}
            width={400}
            height={400}
            className="pattern-canvas"
            aria-label="Firework pattern editor. Drag to paint cells; use Fill wheel for keyboard painting."
            onPointerDown={(e) => paint(e, true)}
            onPointerMove={(e) => paint(e)}
            onPointerUp={() => (stroke.current = null)}
            onPointerCancel={() => (stroke.current = null)}
          />
          <label>
            Preset
            <select
              aria-label="Pattern preset"
              defaultValue="Aurora"
              onChange={(e) => {
                pattern.preset(e.target.value)
                redraw((r) => r + 1)
              }}
            >
              {['Aurora', 'Split', 'Golden willow', 'Blank'].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <div className="material-swatches" aria-label="Spark colors">
            {SPARK_MATERIALS.filter((m) => m !== 'customColor').map((m) => (
              <button
                key={m}
                title={MATERIAL_LABELS[m]}
                aria-label={`Paint ${MATERIAL_LABELS[m]}`}
                aria-pressed={material === m}
                style={{ '--swatch': PALETTE[m] } as CSSProperties}
                onClick={() => setMaterial(m)}
              />
            ))}
          </div>
          <label>
            Brush
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value as Material)}
            >
              {[
                ...SPARK_MATERIALS.filter((m) => m !== 'customColor'),
                ...PULSE_MATERIALS,
                'marker',
                'empty',
              ].map((m) => (
                <option key={m} value={m}>
                  {PULSE_MATERIALS.includes(m as never) ? 'Pulse / ' : ''}
                  {MATERIAL_LABELS[m as Material]}
                </option>
              ))}
            </select>
          </label>
          <div className="demo-button-row">
            <button
              onClick={() => {
                pattern.cells.forEach(
                  (c) =>
                    (c.material = material === 'marker' ? 'empty' : material),
                )
                if (material === 'marker') pattern.cells[0].material = 'marker'
                redraw((r) => r + 1)
              }}
            >
              Fill wheel
            </button>
            <button
              onClick={() => {
                pattern.preset('Blank')
                redraw((r) => r + 1)
              }}
            >
              Clear pattern
            </button>
          </div>
          <label>
            Wheel rings
            <select
              value={pattern.rings}
              onChange={(e) => {
                pattern.resize(Number(e.target.value))
                redraw((r) => r + 1)
              }}
            >
              {[2, 3, 4, 5, 6].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </label>
          <details>
            <summary>Flight & motion</summary>
            {slider('count', 'Particle samples', 100, 2400, 100)}
            {slider('gravity', 'Gravity', 0, 20, 0.5)}
            {slider('drag', 'Air drag', 0, 2, 0.1)}
            {slider('wind', 'Wind', -8, 8, 0.2)}
            {slider('gust', 'Wandering wind', 0, 12, 0.5)}
            <label>
              Detonate by
              <select
                value={settings.trigger}
                onChange={(e) =>
                  setting('trigger', e.target.value as 'Time' | 'Height')
                }
              >
                <option>Time</option>
                <option>Height</option>
              </select>
            </label>
            {settings.trigger === 'Time'
              ? slider('delay', 'Fuse (seconds)', 0.2, 2.5, 0.05)
              : slider('height', 'Burst height', 0, 6, 0.1)}
            <label>
              Seed
              <input
                type="number"
                min={0}
                max={999999}
                value={settings.seed}
                onChange={(e) =>
                  setting(
                    'seed',
                    Math.max(0, Math.min(999999, Number(e.target.value) || 0)),
                  )
                }
              />
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                checked={settings.stagger}
                onChange={(e) => setting('stagger', e.target.checked)}
              />
              Stagger pulses from timing marker
            </label>
            {settings.stagger &&
              slider('staggerConstant', 'Pulse spacing', 0, 2, 0.1)}
          </details>
          <details>
            <summary>Custom pulse</summary>
            {slider('customWidth', 'Pulse width', 0.1, 2, 0.1)}
            {slider('customDuration', 'Pulse duration', 0.05, 1, 0.05)}
            {slider('customGain', 'Pulse strength', 0.1, 3, 0.1)}
            {slider('customHorizontal', 'Horizontal spread', 0.1, 3, 0.1)}
            {slider('customVertical', 'Vertical spread', 0.1, 3, 0.1)}
          </details>
        </aside>
        <section className="demo-stage" aria-label="Firework sky">
          <div className="demo-stage-heading">
            <h2>Send it into the sky</h2>
            <span>{active} sparks</span>
          </div>
          <canvas
            ref={sky}
            width={1000}
            height={680}
            className="firework-sky"
            role="button"
            tabIndex={0}
            aria-label="Firework sky. Click to aim, or press Enter to launch in the center."
            aria-disabled={paused}
            onPointerDown={(e) => {
              const r = e.currentTarget.getBoundingClientRect()
              launch({
                x: ((e.clientX - r.left) / r.width) * 16 - 8,
                y: (1 - (e.clientY - r.top) / r.height) * 10.88 - 4.5,
              })
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                launch()
              }
            }}
          />
          <div className="demo-toolbar">
            <button
              className="demo-primary"
              disabled={paused}
              onClick={() => launch()}
            >
              Launch firework
            </button>
            <button onClick={() => setPaused((p) => !p)}>
              {paused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={() => {
                sim.reset()
                refreshSky((v) => v + 1)
                setMessage(sim.message)
              }}
            >
              Clear sky
            </button>
            <label className="check-label">
              <input
                type="checkbox"
                checked={trails}
                onChange={(e) => setTrails(e.target.checked)}
              />
              Trails
            </label>
          </div>
          <p role="status" className="demo-status">
            {message}
          </p>
          <p className="demo-help">
            Click higher for a longer flight. Each launch freezes your current
            design, so you can keep painting the next one. Up to six shells can
            share the sky.
          </p>
          <details className="demo-notes">
            <summary>About this browser edition</summary>
            <p>
              Adapted from our collaborative CS 4620 project. I built the
              infrastructure and initial working version; the ideas came from
              both collaborators. This edition keeps the wheel, material-driven
              pulses, snapshots, gravity, wind and trails, with a new canvas
              interface and smooth wind implementation. The course rendering
              framework and assets are not included.
            </p>
          </details>
        </section>
      </div>
    </DemoFrame>
  )
}
