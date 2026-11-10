// Adapted with the author’s permission from the collaborative CS 4620 fireworks project.
// Lichen Huang: infrastructure and initial implementation; ideas shared with a collaborator.
export interface Point {
  x: number
  y: number
}

export type PulseMaterial =
  | 'peony'
  | 'chrysanthemum'
  | 'willow'
  | 'palm'
  | 'brocade'
  | 'dahlia'
  | 'customPulse'
export type SparkMaterial =
  | 'gold'
  | 'silver'
  | 'white'
  | 'red'
  | 'orange'
  | 'amber'
  | 'lemon'
  | 'lime'
  | 'emerald'
  | 'mint'
  | 'cyan'
  | 'blue'
  | 'violet'
  | 'magenta'
  | 'rose'
  | 'customColor'

export type Material = PulseMaterial | SparkMaterial | 'empty' | 'marker'

export interface Cell extends Point {
  material: Material
}

export interface PulseProfile {
  width: number
  duration: number
  gain: number
  horizontal: number
  vertical: number
}

/** Up to fine adjustment for better visualization, including changing of names. */
export const PULSE_PROFILES: Record<PulseMaterial, PulseProfile> = {
  peony: { width: 0.36, duration: 0.42, gain: 1, horizontal: 1, vertical: 1 },
  chrysanthemum: {
    width: 0.22,
    duration: 0.3,
    gain: 1.65,
    horizontal: 1,
    vertical: 1,
  },
  willow: {
    width: 0.46,
    duration: 0.8,
    gain: 0.6,
    horizontal: 1.25,
    vertical: 0.55,
  },
  palm: {
    width: 0.32,
    duration: 0.5,
    gain: 1.1,
    horizontal: 0.55,
    vertical: 1.65,
  },
  brocade: {
    width: 0.55,
    duration: 0.65,
    gain: 0.85,
    horizontal: 1.15,
    vertical: 0.9,
  },
  dahlia: {
    width: 0.48,
    duration: 0.23,
    gain: 1.8,
    horizontal: 1,
    vertical: 1,
  },
  customPulse: { width: 4, duration: 4, gain: 4, horizontal: 4, vertical: 4 },
}

/** Coloring Scheme */
export const PALETTE: Record<Material, string> = {
  peony: '#dac9a6',
  chrysanthemum: '#faf0d2',
  willow: '#ad8762',
  palm: '#c1b5a0',
  brocade: '#9c7959',
  dahlia: '#ede0c5',
  customPulse: '#000000',
  gold: '#ffd477',
  silver: '#c5d5e7',
  white: '#ffffff',
  red: '#ff344b',
  orange: '#ff873e',
  amber: '#ffb52e',
  lemon: '#f4f56a',
  lime: '#b1f74c',
  emerald: '#29d68d',
  mint: '#77efc1',
  cyan: '#4ee8f5',
  blue: '#73beff',
  violet: '#c49aff',
  magenta: '#f05ede',
  rose: '#ff7797',
  customColor: '#000000',
  empty: '#182335',
  marker: '#ffffff',
}

/** Labellings */
export const MATERIAL_LABELS: Record<Material, string> = {
  peony: 'Peony',
  chrysanthemum: 'Chrysanthemum',
  willow: 'Willow',
  palm: 'Palm',
  brocade: 'Brocade',
  dahlia: 'Dahlia',
  customPulse: 'Custom',
  gold: 'Gold',
  silver: 'Silver',
  white: 'Pearl white',
  red: 'Ruby red',
  orange: 'Tangerine',
  amber: 'Amber',
  lemon: 'Lemon yellow',
  lime: 'Lime',
  emerald: 'Emerald',
  mint: 'Mint',
  cyan: 'Cyan',
  blue: 'Sapphire blue',
  violet: 'Violet',
  magenta: 'Magenta',
  rose: 'Rose pink',
  customColor: 'Custom Color',
  empty: 'Empty',
  marker: 'Timing marker',
}

export const MATERIALS = Object.keys(PALETTE) as Material[]

/** Type guards */
export const isPulse = (material: Material): material is PulseMaterial =>
  material in PULSE_PROFILES
export const isSpark = (material: Material): material is SparkMaterial =>
  !isPulse(material) && material !== 'empty' && material !== 'marker'
export const PULSE_MATERIALS = MATERIALS.filter(isPulse)
export const SPARK_MATERIALS = MATERIALS.filter(isSpark)

/** Return the nearest Center .*/
export function nearest(cells: readonly Cell[], p: Point): Cell {
  if (!cells.length) throw new Error('Pattern must contain at least one cell.')
  let best = cells[0],
    distance = Infinity
  for (const cell of cells) {
    const d = (cell.x - p.x) ** 2 + (cell.y - p.y) ** 2
    if (d < distance) {
      best = cell
      distance = d
    }
  }
  return best
}

/** Distance froma  cell center to sstroke segment including zero-length click */
export function segmentDistance(p: Point, a: Point, b: Point): number {
  const dx = b.x - a.x,
    dy = b.y - a.y
  const length2 = dx * dx + dy * dy
  const t = length2
    ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / length2))
    : 0
  return Math.hypot(p.x - a.x - t * dx, p.y - a.y - t * dy)
}

/** The wheel pattern class */
export class WheelPattern {
  cells: Cell[] = []
  rings = 4

  get cellRadius(): number {
    return 0.39 / this.rings
  }

  constructor(rings = 4) {
    this.resize(rings)
    this.preset('Aurora')
  }

  resize(rings: number): void {
    const old = this.snapshot()
    this.rings = Math.max(2, Math.min(6, Math.round(rings)))
    this.cells = [{ x: 0, y: 0, material: 'peony' }]

    for (let ring = 1; ring <= this.rings; ring++) {
      const radius = ring / (this.rings + 0.5)
      for (let i = 0; i < ring * 6; i++) {
        const angle = (2 * Math.PI * i) / (ring * 6)
        this.cells.push({
          x: radius * Math.cos(angle),
          y: radius * Math.sin(angle),
          material: 'gold',
        })
      }
    }

    if (old.length)
      this.cells.forEach((c) => {
        c.material = nearest(old, c).material
      })

    let marked = false
    for (const c of this.cells)
      if (c.material === 'marker') {
        if (marked) c.material = 'empty'
        marked = true
      }
  }

  /** Data copy saved for already launched cells */
  snapshot(): Cell[] {
    return this.cells.map((c) => ({ ...c }))
  }

  paint(a: Point, b: Point, material: Material): void {
    const touched = this.cells.filter(
      (c) => segmentDistance(c, a, b) <= this.cellRadius,
    )
    if (material === 'marker') {
      // Marker indicates a single movable scheduling handle
      if (!touched.length) return
      this.cells.forEach((c) => {
        if (c.material === 'marker') c.material = 'empty'
      })
      nearest(touched, b).material = 'marker'
    } else
      touched.forEach((c) => {
        c.material = material
      })
  }

  /** Browser presets seed both colored particles and force-producing regions. */
  preset(name: string): void {
    for (const c of this.cells) {
      const r = Math.hypot(c.x, c.y)
      c.material =
        name === 'Blank'
          ? 'empty'
          : r < 0.28
            ? name === 'Golden willow'
              ? 'willow'
              : 'peony'
            : name === 'Split'
              ? c.x < 0
                ? 'rose'
                : 'blue'
              : name === 'Golden willow'
                ? 'gold'
                : c.y > 0
                  ? 'mint'
                  : 'violet'
    }
  }
}
