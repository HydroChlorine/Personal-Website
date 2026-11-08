import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import {
  initialSeasonState,
  nextSeasonState,
  seasonForMonth,
  SCENE_INTERVAL_MS,
} from '../src/content/scenes.ts'

test('all twelve local calendar months follow the requested ranges', () => {
  assert.deepEqual(
    Array.from({ length: 12 }, (_, month) => seasonForMonth(month)),
    [
      'winter',
      'winter',
      'winter',
      'spring',
      'spring',
      'spring',
      'summer',
      'summer',
      'autumn',
      'autumn',
      'winter',
      'winter',
    ],
  )
  for (let month = 0; month < 12; month++)
    assert.equal(
      initialSeasonState(new Date(2026, month, 15)).season,
      seasonForMonth(month),
    )
})
test('both summer starts finish summer before both autumn scenes, then winter and spring', () => {
  for (const roll of [0, 0.999]) {
    let state = initialSeasonState(new Date(2026, 6, 1), () => roll)
    const order = []
    for (let i = 0; i < 8; i++) {
      order.push(state.scene)
      state = nextSeasonState(state, () => roll)
    }
    assert.deepEqual(
      order.map((scene) => scene.season),
      [
        'summer',
        'summer',
        'autumn',
        'autumn',
        'winter',
        'spring',
        'summer',
        'summer',
      ],
    )
    assert.equal(new Set(order.slice(0, 2).map((scene) => scene.id)).size, 2)
    assert.equal(new Set(order.slice(2, 4).map((scene) => scene.id)).size, 2)
    assert.equal(new Set(order.slice(0, 6).map((scene) => scene.id)).size, 6)
    assert.equal(order[0]!.id, roll === 0 ? 'summer-dawn' : 'summer-rain')
  }
})
test('autumn ordering is randomized on each entry; winter and spring each appear once', () => {
  let state = initialSeasonState(new Date(2026, 8, 1), () => 0)
  assert.equal(state.scene.id, 'autumn-wind')
  state = nextSeasonState(state, () => 0.999)
  assert.equal(state.scene.id, 'autumn-rain')
  state = nextSeasonState(state)
  assert.equal(state.scene.id, 'winter-snow')
  state = nextSeasonState(state)
  assert.equal(state.scene.id, 'spring-night')
  state = nextSeasonState(state, () => 0)
  state = nextSeasonState(state)
  state = nextSeasonState(state, () => 0.999)
  assert.equal(state.scene.id, 'autumn-rain')
})
test('manual and timed advances share the same transition and do not mutate the old state', () => {
  const first = initialSeasonState(new Date(2026, 7, 1), () => 0)
  const second = nextSeasonState(first)
  assert.equal(first.remaining.length, 1)
  assert.equal(second.remaining.length, 0)
  assert.notEqual(first.scene.id, second.scene.id)
  assert.equal(SCENE_INTERVAL_MS, 30_000)
})

test('initial season uses the visitor timezone across a UTC month boundary', () => {
  const moduleUrl = new URL('../src/content/scenes.ts', import.meta.url).href
  const script = `import { initialSeasonState } from ${JSON.stringify(moduleUrl)}; console.log(initialSeasonState(new Date('2026-10-31T12:30:00Z')).season)`
  for (const [timezone, expected] of [
    ['Pacific/Kiritimati', 'winter'],
    ['Pacific/Honolulu', 'autumn'],
  ]) {
    const result = spawnSync(
      process.execPath,
      ['--input-type=module', '-e', script],
      { env: { ...process.env, TZ: timezone }, encoding: 'utf8' },
    )
    assert.equal(result.status, 0, result.stderr)
    assert.equal(result.stdout.trim(), expected)
  }
})
