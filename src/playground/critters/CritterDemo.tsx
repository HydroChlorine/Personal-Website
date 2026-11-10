import { useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { DemoFrame } from '../DemoFrame'
import { CritterWorld, speciesColors } from './world.ts'
import type { Hex } from './world.ts'
import { parseProgram, presets } from './language.ts'

const W = 1000,
  H = 760,
  S = 15.9
function xy(q: number, r: number) {
  return { x: W / 2 + Math.sqrt(3) * S * (q + r / 2), y: H / 2 + 1.5 * S * r }
}
/** Inverse pointy-hex projection, rounded in cube coordinates. */
function hexAt(x: number, y: number): Hex {
  const a = ((Math.sqrt(3) / 3) * (x - W / 2) - (y - H / 2) / 3) / S,
    b = ((2 / 3) * (y - H / 2)) / S,
    c = -a - b
  let q = Math.round(a),
    r = Math.round(b)
  const z = Math.round(c)
  const dq = Math.abs(q - a),
    dr = Math.abs(r - b),
    dz = Math.abs(z - c)
  if (dq > dr && dq > dz) q = -r - z
  else if (dr > dz) r = -q - z
  return { q, r }
}
/** An independent browser edition: editable programs and a shared hex ecosystem. */
export function CritterDemo() {
  const [world, setWorld] = useState(() => new CritterWorld()),
    [running, setRunning] = useState(false),
    [speed, setSpeed] = useState(12),
    [revision, redraw] = useState(0)
  const [view, setView] = useState(0),
    [selected, setSelected] = useState<number | null>(null),
    [tool, setTool] = useState('inspect')
  const [source, setSource] = useState<string>(presets.Forager),
    [name, setName] = useState('Visitor'),
    [count, setCount] = useState(5),
    [message, setMessage] = useState(
      'Choose Run to wake the world, or Step to follow one turn.',
    )
  const [q, setQ] = useState(0),
    [r, setR] = useState(0),
    [seed, setSeed] = useState(2112),
    [sparse, setSparse] = useState(false)
  const canvas = useRef<HTMLCanvasElement>(null)
  const critter = world.critters.find((c) => c.id === selected)
  useEffect(() => {
    const ctx = canvas.current?.getContext('2d')
    if (!ctx) return
    let frame = 0,
      last = 0,
      accumulator = 0,
      lastReport = 0
    function draw(now: number) {
      if (running && !document.hidden) {
        if (last) accumulator += Math.min(0.12, (now - last) / 1000) * speed
        let steps = 0
        while (accumulator >= 1 && steps++ < 8) {
          world.step()
          accumulator--
        }
      }
      last = now
      const c = ctx!
      c.fillStyle = '#080f1c'
      c.fillRect(0, 0, W, H)
      for (const tile of world.cells.values()) {
        const p = xy(tile.q, tile.r)
        c.beginPath()
        for (let k = 0; k < 6; k++) {
          const a = ((30 + k * 60) * Math.PI) / 180,
            x = p.x + S * 0.96 * Math.cos(a),
            y = p.y + S * 0.96 * Math.sin(a)
          if (!k) c.moveTo(x, y)
          else c.lineTo(x, y)
        }
        c.closePath()
        c.fillStyle = tile.rock ? '#344154' : '#101c2b'
        c.fill()
        c.strokeStyle = '#203247'
        c.lineWidth = 1
        c.stroke()
        if (tile.food) {
          const size = 3 + Math.min(7, tile.food / 45)
          c.fillStyle = '#679c66'
          c.fillRect(p.x - size / 2, p.y - size / 2, size, size)
        }
      }
      for (const animal of world.critters) {
        const p = xy(animal.q, animal.r),
          a = (animal.direction * Math.PI) / 3,
          rad = 7 + animal.size
        c.save()
        c.translate(p.x, p.y)
        c.rotate(a)
        c.fillStyle = animal.color
        c.beginPath()
        c.moveTo(rad + 3, 0)
        c.lineTo(-rad, rad * 0.7)
        c.lineTo(-rad, -rad * 0.7)
        c.closePath()
        c.fill()
        c.fillStyle = '#07101b'
        c.fillRect(0, -2, 3, 3)
        c.restore()
        if (animal.id === selected) {
          c.strokeStyle = '#ffffff'
          c.lineWidth = 2
          c.beginPath()
          c.arc(p.x, p.y, S * 0.95, 0, Math.PI * 2)
          c.stroke()
        }
      }
      if (now - lastReport > 200) {
        setView((v) => v + 1)
        lastReport = now
      }
      if (running) frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [world, running, speed, selected, revision])
  function apply(p: Hex) {
    setQ(p.q)
    setR(p.r)
    if (tool === 'inspect') {
      const c = world.at(p)
      setSelected(c?.id ?? null)
      setMessage(
        c
          ? `Following ${c.name} #${c.id}.`
          : `Hex (${p.q}, ${p.r}) is ${world.cells.get(`${p.q},${p.r}`)?.rock ? 'rock' : 'unoccupied'}.`,
      )
    } else if (tool === 'spawn') {
      try {
        const c = world.spawn(parseProgram(source), name, speciesColors[3], p)
        setMessage(
          c
            ? 'Your critter entered the world.'
            : 'Choose an empty, non-rock hex.',
        )
        if (c) setSelected(c.id)
      } catch (e) {
        setMessage((e as Error).message)
      }
    } else
      setMessage(
        world.edit(p, tool as 'food' | 'rock' | 'erase')
          ? 'World updated.'
          : 'Choose an unoccupied hex inside the world.',
      )
    redraw((v) => v + 1)
  }
  function click(event: PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    apply(
      hexAt(
        ((event.clientX - rect.left) / rect.width) * W,
        ((event.clientY - rect.top) / rect.height) * H,
      ),
    )
  }
  function spawn() {
    try {
      const program = parseProgram(source)
      let n = 0
      for (let i = 0; i < count; i++)
        if (world.spawn(program, name, speciesColors[3])) n++
      setMessage(
        n
          ? `${n} critters spawned with a copy of your program.`
          : 'The world is full.',
      )
      redraw((v) => v + 1)
    } catch (e) {
      setMessage((e as Error).message)
    }
  }
  function reset() {
    setRunning(false)
    const next = new CritterWorld(seed, sparse)
    next.mutation = world.mutation
    setWorld(next)
    setSelected(null)
    setMessage('New world ready. Press Run when you are ready.')
  }
  return (
    <DemoFrame
      title="CritterWorld / browser edition"
      subtitle="Give a creature a program. See what happens when it meets everyone else."
      story="/projects/critterworld"
    >
      <div className="demo-workspace critter-workspace">
        <section className="demo-stage" aria-label="Critter world">
          <div className="demo-stage-heading">
            <h2>A small world, many little decisions</h2>
            <span>Turn {world.tick}</span>
          </div>
          <canvas
            ref={canvas}
            width={W}
            height={H}
            className="critter-canvas"
            aria-label="Hexagonal critter world. Click to inspect or apply a tool. Coordinates and the critter selector offer keyboard alternatives."
            onPointerDown={click}
          />
          <div className="demo-toolbar">
            <button
              className="demo-primary"
              onClick={() => setRunning((x) => !x)}
            >
              {running ? 'Pause' : 'Run'}
            </button>
            <button
              disabled={running}
              onClick={() => {
                world.step()
                redraw((x) => x + 1)
              }}
            >
              Step
            </button>
            <label>
              Turns / second
              <input
                aria-label="Turns per second"
                type="range"
                min={1}
                max={60}
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
              <output>{speed}</output>
            </label>
          </div>
          <div className="world-stats" aria-label="World statistics">
            <span>
              <strong>{world.critters.length}</strong> alive
            </span>
            <span>
              <strong>{world.births}</strong> born
            </span>
            <span>
              <strong>{world.deaths}</strong> died
            </span>
            <span>
              <strong>{world.mutations}</strong> mutated
            </span>
          </div>
          <p className="demo-status" role="status">
            {message}
          </p>
          <div className="demo-toolbar">
            <label>
              World tool
              <select value={tool} onChange={(e) => setTool(e.target.value)}>
                <option value="inspect">Inspect</option>
                <option value="food">Add food</option>
                <option value="rock">Place rock</option>
                <option value="erase">Clear hex</option>
                <option value="spawn">Place your critter</option>
              </select>
            </label>
            <label>
              Q
              <input
                aria-label="Hex Q coordinate"
                type="number"
                min={-14}
                max={14}
                value={q}
                onChange={(e) => setQ(Number(e.target.value))}
              />
            </label>
            <label>
              R
              <input
                aria-label="Hex R coordinate"
                type="number"
                min={-14}
                max={14}
                value={r}
                onChange={(e) => setR(Number(e.target.value))}
              />
            </label>
            <button onClick={() => apply({ q, r })}>Apply at hex</button>
          </div>
          <p className="demo-help">
            Triangles are critters; green squares are food; slate hexes are
            rocks. Select a critter to see its energy, ancestry and the program
            choosing its next action.
          </p>
          <details className="demo-notes">
            <summary>About this browser edition</summary>
            <p>
              An original, smaller browser implementation inspired by our
              four-person Cornell CS 2112 project, created by Ibrahim Ahmed,
              Lichen Huang, John Karaca and Michael Zhang. It preserves
              programmable behavior, hex movement, energy, food, combat, budding
              and inherited mutations. Its language and rules are simplified; it
              does not bundle the original Java parser, course source or JavaFX
              application.
            </p>
          </details>
        </section>
        <aside
          className="demo-controls"
          aria-label="Critter programs and inspector"
        >
          <h2>Write a little behavior</h2>
          <label>
            Start from a program
            <select
              aria-label="Critter program preset"
              onChange={(e) => {
                setSource(presets[e.target.value as keyof typeof presets])
                setName(e.target.value)
              }}
              defaultValue="Forager"
            >
              {Object.keys(presets).map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            Species name
            <input
              value={name}
              maxLength={24}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Program
            <textarea
              aria-label="Critter program"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              spellCheck={false}
              rows={11}
            />
          </label>
          <div className="demo-button-row">
            <label>
              How many
              <select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              >
                {[1, 5, 10, 20].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </label>
            <button className="demo-primary" onClick={spawn}>
              Spawn critters
            </button>
          </div>
          <details>
            <summary>Language guide</summary>
            <p>
              Rules run from top to bottom. The first true action wins;
              otherwise the critter waits. Each turn starts with an energy cost.
            </p>
            <code>condition --&gt; action;</code>
            <p>
              Values:{' '}
              <code>
                energy, size, age, ahead, nearby[0..5], random[n], mem[0..7]
              </code>
              . Ahead can look up to three hexes with <code>ahead[2]</code>.
              Nearby directions are relative to the critter.
            </p>
            <p>
              Tile values:{' '}
              <code>empty = 0, rock = 1, food = 2, friend = 3, enemy = 4</code>.
              The board edge is rock; friends share the same species name.
            </p>
            <p>
              Combine comparisons with <code>and, or, not</code> and
              parentheses. Arithmetic: <code>+ - * / mod</code>. Division is
              integer division. Use <code>//</code> for comments.
            </p>
            <p>
              Actions:{' '}
              <code>
                forward, backward, left, right, eat, attack, bud, grow, wait
              </code>
              . Eat and attack target the hex ahead. Bud needs energy and space;
              each child inherits its parent’s program. An occasional mutation
              changes one action.
            </p>
            <p>
              Memory updates such as{' '}
              <code>true --&gt; mem[0] := mem[0] + 1;</code> continue to the
              next rule. Eight memory slots are available. This teaching
              language is not compatible with original course files.
            </p>
          </details>
          <section className="critter-inspector" aria-label="Critter inspector">
            <h2>Follow a critter</h2>
            <label>
              Living critter
              <select
                value={critter?.id ?? ''}
                onChange={(e) => setSelected(Number(e.target.value) || null)}
              >
                <option value="">Choose a critter…</option>
                {world.critters.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} #{c.id}
                  </option>
                ))}
              </select>
            </label>
            {critter ? (
              <>
                <dl>
                  <div>
                    <dt>Energy</dt>
                    <dd>{Math.round(critter.energy)}</dd>
                  </div>
                  <div>
                    <dt>Size / age</dt>
                    <dd>
                      {critter.size} / {critter.age}
                    </dd>
                  </div>
                  <div>
                    <dt>Generation</dt>
                    <dd>{critter.generation}</dd>
                  </div>
                  <div>
                    <dt>Last action</dt>
                    <dd>{critter.last}</dd>
                  </div>
                  <div>
                    <dt>Hex</dt>
                    <dd>
                      {critter.q}, {critter.r}
                    </dd>
                  </div>
                </dl>
                <details>
                  <summary>Inherited program</summary>
                  <pre>{critter.program.source}</pre>
                  <p>Memory: {critter.memory.join(', ')}</p>
                </details>
                <button
                  onClick={() => {
                    try {
                      critter.program = structuredClone(parseProgram(source))
                      critter.name = name
                      critter.color = speciesColors[3]
                      setMessage('Selected critter now uses your program.')
                      redraw((v) => v + 1)
                    } catch (e) {
                      setMessage((e as Error).message)
                    }
                  }}
                >
                  Give it this program
                </button>
              </>
            ) : (
              <p className="demo-help">
                Choose from the list or click a creature. A dead critter leaves
                food behind.
              </p>
            )}
          </section>
          <details>
            <summary>New world & evolution</summary>
            <label className="check-label">
              <input
                type="checkbox"
                checked={world.mutation}
                onChange={(e) => {
                  world.mutation = e.target.checked
                  redraw((v) => v + 1)
                }}
              />
              Allow inherited mutations
            </label>
            <label>
              World seed
              <input
                type="number"
                value={seed}
                min={0}
                max={999999}
                onChange={(e) =>
                  setSeed(
                    Math.max(0, Math.min(999999, Number(e.target.value) || 0)),
                  )
                }
              />
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                checked={sparse}
                onChange={(e) => setSparse(e.target.checked)}
              />
              Start with fewer critters
            </label>
            <button onClick={reset}>Create new world</button>
            <p className="demo-help">
              Reset pauses the world. Population is capped at {world.capacity};
              turn order is sequential. Seed and settings make experiments
              repeatable.
            </p>
          </details>
          <span className="sr-only">Display update {view}</span>
        </aside>
      </div>
    </DemoFrame>
  )
}
