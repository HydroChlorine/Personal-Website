import { parseProgram, evaluate, presets, actions } from './language.ts'
import type { Program, Expr, Rule, Action } from './language.ts'
export interface Hex {
  q: number
  r: number
}
export interface Cell extends Hex {
  rock: boolean
  food: number
}
export interface Critter extends Hex {
  id: number
  name: string
  color: string
  direction: number
  energy: number
  size: number
  age: number
  generation: number
  program: Program
  memory: number[]
  last: string
}
export const directions: Hex[] = [
  { q: 1, r: 0 },
  { q: 0, r: 1 },
  { q: -1, r: 1 },
  { q: -1, r: 0 },
  { q: 0, r: -1 },
  { q: 1, r: -1 },
]
export const speciesColors = ['#73ded2', '#e8b97d', '#aeb9f1', '#ed92b2']
export const key = (p: Hex) => `${p.q},${p.r}`
function print(e: Expr): string {
  if (e.kind === 'number') return String(e.value)
  if (e.kind === 'sensor') return e.name + (e.arg ? `[${print(e.arg)}]` : '')
  if (e.kind === 'unary') return `${e.op} (${print(e.child)})`
  return `(${print(e.left)} ${e.op} ${print(e.right)})`
}
function ruleText(r: Rule) {
  return `${print(r.condition)} --> ${r.action === 'set' ? `mem[${print(r.slot!)}] := ${print(r.value!)}` : r.action};`
}
/** New browser simulation, written independently of the team's Java implementation. */
export class CritterWorld {
  readonly radius = 14
  cells = new Map<string, Cell>()
  critters: Critter[] = []
  tick = 0
  births = 0
  deaths = 0
  mutations = 0
  mutation = true
  readonly capacity = 240
  private nextId = 1
  private randomState: number
  private occupants = new Map<string, Critter>()
  constructor(seed = 2112, sparse = false) {
    this.randomState = seed >>> 0
    for (let q = -this.radius; q <= this.radius; q++)
      for (let r = -this.radius; r <= this.radius; r++)
        if (Math.abs(q + r) <= this.radius) {
          const rock = this.random() < 0.045,
            food =
              !rock && this.random() < 0.23
                ? 80 + Math.floor(this.random() * 130)
                : 0
          this.cells.set(key({ q, r }), { q, r, rock, food })
        }
    for (let i = 0; i < (sparse ? 15 : 48); i++) {
      const name = (['Forager', 'Defender', 'Wanderer'] as const)[i % 3]
      this.spawn(parseProgram(presets[name]), name, speciesColors[i % 3])
    }
  }
  random() {
    this.randomState = (this.randomState + 0x6d2b79f5) >>> 0
    let t = this.randomState
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  at(p: Hex) {
    return this.occupants.get(key(p))
  }
  private adjacent(c: Hex, d: number): Hex {
    const n = directions[((d % 6) + 6) % 6]
    return { q: c.q + n.q, r: c.r + n.r }
  }
  /** Copies the program: edits and mutations never change existing parents. */
  spawn(
    program: Program,
    name: string,
    color: string,
    position?: Hex,
    energy = 600,
    generation = 0,
  ): Critter | undefined {
    if (this.critters.length >= this.capacity) return
    const free = position
      ? ([this.cells.get(key(position))].filter(
          (c) => c && !c.rock && !this.at(c),
        ) as Cell[])
      : [...this.cells.values()].filter((c) => !c.rock && !this.at(c))
    if (!free.length) return
    const cell = free[Math.floor(this.random() * free.length)]
    const c: Critter = {
      q: cell.q,
      r: cell.r,
      id: this.nextId++,
      name: name.slice(0, 24) || 'Visitor',
      color,
      direction: Math.floor(this.random() * 6),
      energy,
      size: 1,
      age: 0,
      generation,
      program: structuredClone(program),
      memory: Array(8).fill(0),
      last: 'spawned',
    }
    this.critters.push(c)
    this.occupants.set(key(c), c)
    return c
  }
  private sense(c: Critter, name: string, arg = 0): number {
    if (name === 'energy' || name === 'size' || name === 'age') return c[name]
    if (name === 'mem') return c.memory[Math.abs(Math.trunc(arg)) % 8]
    if (name === 'random')
      return Math.floor(
        this.random() * Math.max(1, Math.min(10000, Math.abs(Math.trunc(arg)))),
      )
    let p: Hex = c
    const direction =
      name === 'nearby' ? c.direction + Math.trunc(arg) : c.direction
    for (
      let k = 0;
      k <
      (name === 'nearby' ? 1 : Math.max(1, Math.min(3, Math.trunc(arg) || 1)));
      k++
    )
      p = this.adjacent(p, direction)
    const cell = this.cells.get(key(p)),
      other = this.at(p)
    return !cell || cell.rock
      ? 1
      : other
        ? other.name === c.name
          ? 3
          : 4
        : cell.food > 0
          ? 2
          : 0
  }
  private die(c: Critter) {
    if (this.at(c) !== c) return
    this.occupants.delete(key(c))
    const cell = this.cells.get(key(c))
    if (cell && !cell.rock) cell.food = Math.min(500, cell.food + 60 * c.size)
  }
  private act(c: Critter, action: Action) {
    c.last = action
    const front = this.adjacent(c, c.direction),
      cell = this.cells.get(key(front)),
      other = this.at(front)
    if (action === 'left') c.direction = (c.direction + 5) % 6
    if (action === 'right') c.direction = (c.direction + 1) % 6
    if (action === 'wait') c.energy = Math.min(1400, c.energy + 2.5)
    if (action === 'forward' || action === 'backward') {
      const p =
          action === 'forward' ? front : this.adjacent(c, c.direction + 3),
        tile = this.cells.get(key(p))
      if (tile && !tile.rock && !this.at(p)) {
        this.occupants.delete(key(c))
        c.q = p.q
        c.r = p.r
        this.occupants.set(key(c), c)
      }
      c.energy -= 3 * c.size
    }
    if (action === 'eat' && cell && !cell.rock && !other) {
      const portion = Math.min(cell.food, 100 * c.size, 1400 - c.energy)
      cell.food -= portion
      c.energy += portion
    }
    if (action === 'attack' && other) {
      c.energy -= 12 * c.size
      other.energy -= (85 * c.size) / (1 + 0.3 * other.size)
      if (other.energy <= 0) this.die(other)
    }
    if (action === 'grow' && c.size < 4 && c.energy > 180) {
      c.size++
      c.energy -= 130
    }
    if (
      action === 'bud' &&
      c.energy > 400 &&
      this.critters.length < this.capacity
    ) {
      const spots = directions
        .map((_, i) => this.adjacent(c, c.direction + i + 3))
        .filter(
          (p) =>
            this.cells.has(key(p)) &&
            !this.cells.get(key(p))!.rock &&
            !this.at(p),
        )
      if (spots.length) {
        let program = structuredClone(c.program),
          name = c.name,
          color = c.color
        if (this.mutation && this.random() < 0.1) {
          const index = Math.floor(this.random() * program.rules.length),
            r = program.rules[index]
          if (r.action !== 'set') {
            const alternatives = actions.filter((a) => a !== r.action)
            r.action =
              alternatives[Math.floor(this.random() * alternatives.length)]
            program = {
              ...program,
              source: program.rules.map(ruleText).join('\n'),
            }
            name = c.name.replace(/\*$/, '') + '*'
            color = speciesColors[3]
            this.mutations++
          }
        }
        if (this.spawn(program, name, color, spots[0], 220, c.generation + 1)) {
          c.energy -= 260
          this.births++
        }
      }
    }
  }
  /** Ordered turns, a population ceiling, and a bounded rule scan per critter. */
  step() {
    this.tick++
    const turn = [...this.critters]
    for (const c of turn) {
      if (c.energy <= 0) continue
      c.age++
      c.energy -= 0.75 * c.size
      if (c.energy <= 0) {
        this.die(c)
        continue
      }
      const sense = (name: string, arg?: number) => this.sense(c, name, arg)
      let action: Action = 'wait'
      for (const rule of c.program.rules) {
        if (!evaluate(rule.condition, sense)) continue
        if (rule.action === 'set') {
          const slot = Math.abs(Math.trunc(evaluate(rule.slot!, sense))) % 8
          c.memory[slot] = evaluate(rule.value!, sense)
          continue
        }
        action = rule.action
        break
      }
      this.act(c, action)
      if (c.age > 2000) c.energy = 0
    }
    this.critters = this.critters.filter((c) => {
      if (c.energy > 0) return true
      this.die(c)
      this.deaths++
      return false
    })
    // Light sustains small food patches without unbounded growth.
    const cells = [...this.cells.values()]
    for (let i = 0; i < 5; i++) {
      const cell = cells[Math.floor(this.random() * cells.length)]
      if (!cell.rock && !this.at(cell))
        cell.food = Math.min(500, cell.food + 18)
    }
  }
  /** Pointer and keyboard tools use the same bounded world edit operation. */
  edit(p: Hex, tool: 'food' | 'rock' | 'erase') {
    const cell = this.cells.get(key(p))
    if (!cell || this.at(p)) return false
    cell.rock = tool === 'rock'
    cell.food = tool === 'food' ? Math.min(500, cell.food + 180) : 0
    return true
  }
}
