import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  parseProgram,
  evaluate,
  presets,
} from '../src/playground/critters/language.ts'
import { CritterWorld, key } from '../src/playground/critters/world.ts'
import { WheelPattern } from '../src/playground/fireworks/pattern.ts'
import {
  FireworkSimulation,
  DEFAULTS,
} from '../src/playground/fireworks/simulation.ts'

test('critter parser handles precedence, memory, safe arithmetic and rejects invalid or expensive input', () => {
  const p = parseProgram(
    'energy > 100 and (ahead = food or random[2] = 1) --> eat; true --> mem[0] := mem[0] + 1; true --> wait;',
  )
  assert.equal(p.rules.length, 3)
  assert.equal(
    evaluate(
      p.rules[0].condition,
      (n) => ({ energy: 200, ahead: 2, random: 0 })[n] ?? 0,
    ),
    1,
  )
  assert.equal(
    evaluate(
      parseProgram('6 + 2 * 3 = 12 --> wait;').rules[0].condition,
      () => 0,
    ),
    1,
  )
  assert.equal(
    evaluate(parseProgram('8 / 0 --> wait;').rules[0].condition, () => 0),
    0,
  )
  for (const text of [
    'while(true){}',
    'constructor --> wait;',
    '__proto__ --> wait;',
    'true --> launch;',
    'random --> wait;',
    'true --> forward',
    '('.repeat(40) + '1' + ')'.repeat(40) + ' --> wait;',
    'x'.repeat(9000),
  ])
    assert.throws(() => parseProgram(text))
})
test('seeded worlds are repeatable, keep one critter per open hex and respect population limits', () => {
  const a = new CritterWorld(31),
    b = new CritterWorld(31)
  for (let i = 0; i < 450; i++) {
    a.step()
    b.step()
  }
  assert.deepEqual(a.critters, b.critters)
  assert.equal(a.tick, 450)
  assert.ok(a.critters.length <= a.capacity)
  assert.equal(new Set(a.critters.map(key)).size, a.critters.length)
  assert.ok(
    a.critters.every(
      (c) =>
        a.at(c) === c &&
        !a.cells.get(key(c))!.rock &&
        Number.isFinite(c.energy) &&
        c.energy > 0,
    ),
  )
  assert.ok([...a.cells.values()].every((c) => c.food >= 0 && c.food <= 500))
})
test('program copies, rule order, world tools and inherited mutations remain coherent', () => {
  const w = new CritterWorld(4, true),
    p = parseProgram(presets.Forager)
  const free = [...w.cells.values()].find((c) => !c.rock && !w.at(c))!
  const c = w.spawn(p, 'Visitor', '#ffffff', free)!
  p.rules[0].action = 'attack'
  assert.equal(c.program.rules[0].action, 'bud')
  assert.equal(w.edit(c, 'rock'), false)
  w.step()
  assert.ok(c.last !== 'attack')
  for (let i = 0; i < 300; i++) w.step()
  for (const child of w.critters)
    assert.doesNotThrow(() => parseProgram(child.program.source))
})
test('fireworks snapshot patterns and settings, enforce bounds, pause and reclaim the particle pool', () => {
  const sim = new FireworkSimulation(200),
    p = new WheelPattern()
  const settings = { ...DEFAULTS, count: 100, delay: 0.25, gust: 0 }
  assert.equal(sim.launch(p.snapshot(), settings, { x: 0, y: 6 }), true)
  const material = sim.shells[0].cells[0].material
  p.cells[0].material = 'empty'
  settings.gravity = 0
  assert.equal(sim.shells[0].cells[0].material, material)
  assert.equal(sim.shells[0].settings.gravity, DEFAULTS.gravity)
  sim.paused = true
  sim.advance(0.1)
  assert.equal(sim.shells[0].age, 0)
  sim.paused = false
  for (let i = 0; i < 100; i++) sim.advance(0.05)
  assert.equal(sim.activeCount, 0)
  assert.equal(sim.shells.length, 0)
  p.preset('Blank')
  assert.equal(sim.launch(p.snapshot(), DEFAULTS, { x: 0, y: 5 }), false)
  p.preset('Aurora')
  for (let i = 0; i < 6; i++)
    assert.equal(sim.launch(p.snapshot(), DEFAULTS, { x: 0, y: 5 }), true)
  assert.equal(sim.launch(p.snapshot(), DEFAULTS, { x: 0, y: 5 }), false)
  sim.reset()
  assert.equal(sim.activeCount, 0)
})
