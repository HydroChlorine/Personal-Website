// Browser adaptation of the collaborative fireworks core; course rendering code is not included.
import { makeNoise2D } from './noise.ts'
import { nearest, isPulse, isSpark, PULSE_PROFILES } from './pattern.ts'
import type { Cell, Point, Material } from './pattern.ts'
const MAX_ACTIVE_SHELLS = 6

const CLICK_SENSITIVITY = 1.25
export const TRAIL_HANDLES = 20 // more the betterr
export const TRAIL_LIFETIME = 0.75 // originally 0.35
export const TRAIL_SAMPLE_DISTANCE = 0.05
export const TRAIL_MAX_SAMPLE_TIME = 0.05
export const TRAIL_SUBDIVISIONS = 3

/** Measure World time in seconds */
export interface Settings {
  count: number
  seed: number
  gravity: number
  drag: number
  wind: number
  gust: number
  noiseScale: number
  noiseSpeed: number
  trigger: 'Time' | 'Height'
  delay: number
  height: number
  stagger: boolean
  customWidth: number
  customDuration: number
  customGain: number
  customHorizontal: number
  customVertical: number
  staggerConstant: number
}

export const DEFAULTS: Settings = {
  count: 900,
  seed: 4620,
  gravity: 9.8,
  drag: 0.2,
  wind: 0.3,
  gust: 2,
  noiseScale: 0.65,
  noiseSpeed: 0.5,
  trigger: 'Time',
  delay: 1.25,
  height: 2,
  stagger: false,
  customWidth: 0.4,
  customDuration: 0.3,
  customGain: 1,
  customHorizontal: 1,
  customVertical: 1,
  staggerConstant: 0.5,
}

export interface Spark extends Point {
  vx: number
  vy: number
  age: number
  life: number
  size: number
  material: Material
  shell: number
  active: boolean

  trailX: Float32Array
  trailY: Float32Array
  trailAge: Float32Array
  trailParticleAge: Float32Array

  trailHead: number
  trailCount: number
  trailTimer: number

  headVisible: boolean
}

interface Source extends Point {
  strength: number
  width: number
  duration: number
  delay: number
  horizontal: number
  vertical: number
}

interface Shell extends Point {
  id: number
  vx: number
  vy: number
  age: number
  burstAge: number
  cells: Cell[]
  settings: Settings
  sources: Source[]
  random: () => number
  noise: (x: number, y: number) => number
}

/** Small deterministic integer PRNG, ensuring different launches makes use of different random state. */
export function seeded(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Uniform Area Sampling */
export function diskSample(random: () => number): Point {
  const r = Math.sqrt(random()),
    theta = random() * Math.PI * 2
  return { x: r * Math.cos(theta), y: r * Math.sin(theta) }
}

export function trailIndex(spark: Spark, index: number): number {
  const oldest =
    (spark.trailHead - spark.trailCount + 1 + TRAIL_HANDLES) % TRAIL_HANDLES

  return (oldest + index) % TRAIL_HANDLES
}

export function trailOpacity(age: number): number {
  //if (age >= TRAIL_LIFETIME) {return 0}
  const remaining = Math.max(0, 1 - age / TRAIL_LIFETIME)
  return remaining * remaining
}

export class FireworkSimulation {
  readonly stepSize = 1 / 120
  sparks: Spark[]
  shells: Shell[] = []
  paused = false
  message = 'Paint a pattern, then launch.'
  private accumulator = 0
  private nextId = 1
  private free: number[] = []

  constructor(capacity = 6000) {
    this.sparks = Array.from({ length: capacity }, () => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      age: 0,
      life: 1,
      size: 0,
      material: 'gold',
      shell: 0,
      active: false,
      trailX: new Float32Array(TRAIL_HANDLES),
      trailY: new Float32Array(TRAIL_HANDLES),
      trailParticleAge: new Float32Array(TRAIL_HANDLES),
      trailAge: new Float32Array(TRAIL_HANDLES),
      trailHead: 0,
      trailCount: 0,
      trailTimer: 0,
      headVisible: false,
    }))
    this.reset()
  }

  get activeCount(): number {
    return this.sparks.length - this.free.length
  }

  /** Reset Both simulation time bookkeeping & pool ownership */
  reset(): void {
    this.shells = []
    this.accumulator = 0
    this.nextId = 1
    this.free = this.sparks.map((p, i) => {
      p.active = false
      p.headVisible = false
      p.trailCount = 0
      p.trailHead = 0
      p.trailTimer = 0
      return i
    })
    this.message = 'Sky cleared. Your pattern is preserved.'
  }

  /** Launch current snapshot */
  launch(cells: readonly Cell[], settings: Settings, cursor: Point): boolean {
    if (!cells.some((c) => isSpark(c.material))) {
      this.message = 'Add a colored spark cell before launching.'
      return false
    }
    if (this.shells.length >= MAX_ACTIVE_SHELLS) {
      this.message = 'Six shells are active. Wait for one to fade.'
      return false
    }
    const copy = {
      ...settings,
      count: Math.max(
        1,
        Math.min(this.sparks.length, Math.round(settings.count)),
      ),
    }
    this.shells.push({
      id: this.nextId++,
      x: 0,
      y: -4.3,
      vx: CLICK_SENSITIVITY * cursor.x,
      vy: CLICK_SENSITIVITY * (cursor.y + 4.3),
      age: 0,
      burstAge: -1,
      cells: cells.map((c) => ({ ...c })),
      settings: copy,
      sources: [],
      random: seeded(copy.seed),
      noise: makeNoise2D(seeded(copy.seed + 1)),
    })
    this.message = 'Launched a snapshot. Keep painting the next one.'
    return true
  }

  advance(realSeconds: number): void {
    if (this.paused || !Number.isFinite(realSeconds)) return
    this.accumulator += Math.max(0, Math.min(0.1, realSeconds))
    while (this.accumulator + 1e-10 >= this.stepSize) {
      this.step(this.stepSize)
      this.accumulator -= this.stepSize
    }
  }

  /** Construct at most 16 regional sources using equal area quadrature */
  private makeSources(shell: Shell): Source[] {
    const bins = new Map<
      number,
      {
        x: number
        y: number
        n: number
        width: number
        duration: number
        gain: number
        horizontal: number
        vertical: number
      }
    >()
    let samples = 0

    for (let y = -0.95; y < 1; y += 0.1)
      for (let x = -0.95; x < 1; x += 0.1) {
        if (x * x + y * y > 1) continue
        samples++
        const material = nearest(shell.cells, { x, y }).material
        if (!isPulse(material)) continue
        const profile =
          material === 'customPulse'
            ? {
                width: shell.settings.customWidth,
                duration: shell.settings.customDuration,
                gain: shell.settings.customGain,
                horizontal: shell.settings.customHorizontal,
                vertical: shell.settings.customVertical,
              }
            : PULSE_PROFILES[material]
        const key = Math.floor((x + 1) * 2) + 4 * Math.floor((y + 1) * 2)
        const bin = bins.get(key) ?? {
          x: 0,
          y: 0,
          n: 0,
          width: 0,
          duration: 0,
          gain: 0,
          horizontal: 0,
          vertical: 0,
        }
        bin.x += x
        bin.y += y
        bin.n++
        bin.width += profile.width
        bin.duration += profile.duration
        bin.gain += profile.gain
        bin.horizontal += profile.horizontal
        bin.vertical += profile.vertical
        bins.set(key, bin)
      }

    const marker = shell.cells.find((c) => c.material === 'marker') ?? {
      x: 0,
      y: 0,
    }
    const sourceBins = Array.from(bins.values()).map((bin) => ({
      bin,
      distance: Math.hypot(bin.x / bin.n - marker.x, bin.y / bin.n - marker.y),
    }))

    let closestDistance = Infinity
    for (const source of sourceBins) {
      if (source.distance < closestDistance) {
        closestDistance = source.distance
      }
    }

    return sourceBins.map(({ bin: b, distance }) => ({
      x: (b.x / b.n) * 0.7,
      y: (b.y / b.n) * 0.7,
      strength: (90 * b.gain) / samples,
      width: b.width / b.n,
      duration: b.duration / b.n,
      horizontal: b.horizontal / b.n,
      vertical: b.vertical / b.n,
      delay: shell.settings.stagger
        ? Math.max(0, distance - closestDistance) *
          shell.settings.staggerConstant
        : 0,
    }))
  }

  private burst(shell: Shell): void {
    shell.burstAge = 0
    shell.sources = this.makeSources(shell)
    let emitted = 0

    for (let i = 0; i < shell.settings.count; i++) {
      const p = diskSample(shell.random),
        material = nearest(shell.cells, p).material
      if (!isSpark(material)) continue
      const index = this.free.pop()
      if (index === undefined) {
        this.message = 'Particle pool full; this burst was reduced.'
        break
      }
      const spark = this.sparks[index],
        variation = 0.85 + shell.random() * 0.3
      Object.assign(spark, {
        x: shell.x + p.x * 0.7,
        y: shell.y + p.y * 0.7,
        vx: shell.vx + p.x * 1.3 * variation,
        vy: shell.vy + p.y * 1.3 * variation,
        age: 0,
        life: 2 + shell.random() * 1.6,
        size: 0.045 + shell.random() * 0.055,
        material,
        shell: shell.id,
        active: true,
      })

      spark.trailHead = 0
      spark.trailCount = 1
      spark.trailTimer = 0
      spark.headVisible = true
      spark.trailX[0] = spark.x
      spark.trailY[0] = spark.y
      spark.trailAge[0] = 0
      spark.trailParticleAge[0] = 0

      emitted++
    }
    if (!emitted)
      this.message =
        'No colored samples in this burst. Paint a larger spark region.'
  }

  private addTrailHandle(spark: Spark): void {
    const next = (spark.trailHead + 1) % TRAIL_HANDLES
    spark.trailHead = next
    spark.trailX[next] = spark.x
    spark.trailY[next] = spark.y
    spark.trailAge[next] = 0
    spark.trailParticleAge[next] = spark.age

    spark.trailCount = Math.min(spark.trailCount + 1, TRAIL_HANDLES)
    spark.trailTimer = 0
  }

  acceleration(shell: Shell, x: number, y: number): Point {
    let ax = 0,
      ay = 0
    for (const s of shell.sources) {
      const age = shell.burstAge - s.delay
      if (age < 0 || age > s.duration) continue
      const width = s.width + age * 1.7,
        dx = x - shell.x - s.x,
        dy = y - shell.y - s.y
      const factor =
        s.strength *
        (1 - age / s.duration) ** 2 *
        Math.exp(-(dx * dx + dy * dy) / (2 * width * width))
      ax += dx * factor * s.horizontal
      ay += dy * factor * s.vertical
    }
    return { x: ax, y: ay }
  }

  /** Semi implicit Euler Step*/
  private step(dt: number): void {
    for (const shell of this.shells) {
      shell.age += dt
      if (shell.burstAge < 0) {
        shell.vy -= shell.settings.gravity * dt
        shell.x += shell.vx * dt
        shell.y += shell.vy * dt
        const trigger =
          shell.settings.trigger === 'Time'
            ? shell.age >= shell.settings.delay
            : shell.y >= shell.settings.height
        // A finite timeout also handles gravity=0 with an unreachable height.
        if (trigger || shell.vy <= 0 || shell.age >= 5) this.burst(shell)
      } else {
        shell.burstAge += dt
        // Field frame do allow initial shell velocity
        shell.vy -= shell.settings.gravity * dt
        shell.x += shell.vx * dt
        shell.y += shell.vy * dt
      }
      const s = shell.settings
      for (let i = 0; i < this.sparks.length; i++) {
        const p = this.sparks[i]
        if (!p.active || p.shell !== shell.id) continue

        for (let j = 0; j < p.trailCount; j++) {
          const index = trailIndex(p, j)
          p.trailAge[index] += dt
        }

        if (p.headVisible) {
          p.age += dt
          if (p.age >= p.life) {
            p.headVisible = false
          } else {
            const phase = shell.age * s.noiseSpeed
            const ux =
              s.wind +
              s.gust *
                shell.noise(p.x * s.noiseScale + phase, p.y * s.noiseScale)
            const uy =
              s.gust *
              0.4 *
              shell.noise(p.x * s.noiseScale + 31, p.y * s.noiseScale + phase)
            const force = this.acceleration(shell, p.x, p.y)
            p.vx += (s.drag * (ux - p.vx) + force.x) * dt
            p.vy += (-s.gravity + s.drag * (uy - p.vy) + force.y) * dt
            p.x += p.vx * dt
            p.y += p.vy * dt

            p.trailTimer += dt
            const dx = p.x - p.trailX[p.trailHead]
            const dy = p.y - p.trailY[p.trailHead]
            const distance2 = dx * dx + dy * dy

            if (
              distance2 >= TRAIL_SAMPLE_DISTANCE * TRAIL_SAMPLE_DISTANCE ||
              p.trailTimer >= TRAIL_MAX_SAMPLE_TIME
            ) {
              this.addTrailHandle(p)
            }
          }
        }

        const newestTrailAge =
          p.trailCount > 0 ? p.trailAge[p.trailHead] : Infinity
        if (!p.headVisible && trailOpacity(newestTrailAge) === 0) {
          p.active = false
          p.trailCount = 0
          this.free.push(i)
        }
      }
    }
    this.shells = this.shells.filter(
      (s) =>
        s.burstAge < 0 || this.sparks.some((p) => p.active && p.shell === s.id),
    )
  }
}
