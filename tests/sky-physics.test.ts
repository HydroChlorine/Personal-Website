import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { defaultWeatherForMonth, palettes } from '../src/content/appearance.ts'
import {
  createPrecipitation,
  createRocketFlight,
  flightPoint,
  gaussianSample,
  layerCounts,
  precipitationLayers,
  stepPrecipitation,
  weatherExposure,
  windAt,
  WEATHER_SETTLE_CAP,
  WEATHER_SETTLE_DELAY,
} from '../src/lib/skyPhysics.ts'
function seeded(seed = 8147) {
  let value = seed
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0
    return value / 4294967296
  }
}

test('only Moonrise and Ion remain available', () => {
  assert.deepEqual(
    palettes.map((p) => p.id),
    ['moonrise', 'ion'],
  )
})
test('weather calendar forces winter snow and June/July rain, with both fair-coin outcomes elsewhere', () => {
  for (let month = 0; month < 12; month++) {
    if (month <= 2 || month >= 10) {
      assert.equal(
        defaultWeatherForMonth(month, () => 0),
        'snow',
      )
      assert.equal(
        defaultWeatherForMonth(month, () => 0.999),
        'snow',
      )
    } else if (month === 5 || month === 6) {
      assert.equal(
        defaultWeatherForMonth(month, () => 0),
        'rain',
      )
      assert.equal(
        defaultWeatherForMonth(month, () => 0.999),
        'rain',
      )
    } else {
      assert.equal(
        defaultWeatherForMonth(month, () => 0.499),
        'off',
      )
      assert.equal(
        defaultWeatherForMonth(month, () => 0.5),
        'rain',
      )
    }
  }
})
test('four depth layers get sparser, faster, brighter and no smaller toward the viewer', () => {
  assert.equal(precipitationLayers.length, 4)
  for (let i = 1; i < 4; i++) {
    const back = precipitationLayers[i - 1]!,
      front = precipitationLayers[i]!
    assert.ok(
      front.weight < back.weight &&
        front.rainSpeed > back.rainSpeed &&
        front.snowSpeed > back.snowSpeed &&
        front.alpha > back.alpha &&
        front.size >= back.size,
    )
  }
  for (const total of [64, 109, 160]) {
    const counts = layerCounts(total)
    assert.equal(
      counts.reduce((a, b) => a + b, 0),
      total,
    )
    for (let i = 1; i < 4; i++) assert.ok(counts[i]! < counts[i - 1]!)
  }
})
test('precipitation varies within layers and remains finite and bounded when recycled', () => {
  for (const kind of ['snow', 'rain'] as const) {
    const random = seeded(),
      particles = createPrecipitation(400, 240, kind, random)
    assert.notEqual(particles[0]!.speed, particles[1]!.speed)
    assert.notEqual(particles[0]!.alpha, particles[1]!.alpha)
    for (let frame = 0; frame < 500; frame++)
      for (const p of particles)
        stepPrecipitation(p, kind, 0.04, frame * 0.04, 400, 240, random)
    assert.ok(
      particles.every(
        (p) =>
          Number.isFinite(p.x) &&
          Number.isFinite(p.y) &&
          p.x >= -12 &&
          p.x <= 412 &&
          p.y >= -20 &&
          p.y <= 252,
      ),
    )
  }
})
test('Gaussian launch samples stay in the central region with their average at the center', () => {
  const random = seeded(),
    origins = Array.from(
      { length: 4000 },
      () => createRocketFlight({ x: 10, y: 30 }, 400, 240, random).origin.x,
    )
  assert.ok(origins.every((x) => x >= 128 && x <= 272))
  assert.ok(
    Math.abs(origins.reduce((a, b) => a + b, 0) / origins.length - 200) < 2,
  )
  assert.ok(Number.isFinite(gaussianSample(() => 0)))
})
test('ballistic arcs reach side and low click targets exactly, including under shared wind', () => {
  for (const target of [
    { x: 12, y: 40 },
    { x: 388, y: 80 },
    { x: 15, y: 225 },
    { x: 200, y: 30 },
  ]) {
    const flight = createRocketFlight(target, 400, 240, seeded())
    for (const time of [0, 15, 80]) {
      const start = flightPoint(flight, 0, time),
        end = flightPoint(flight, flight.duration, time)
      assert.ok(
        Math.hypot(start.x - flight.origin.x, start.y - flight.origin.y) < 1e-8,
      )
      assert.ok(Math.hypot(end.x - target.x, end.y - target.y) < 1e-8)
    }
    const mid = flightPoint(flight, flight.duration / 2, 20)
    assert.ok(
      mid.y < (flight.origin.y + target.y) / 2 - 5,
      'gravity must produce a real arc above its chord',
    )
  }
})
test('shared wind is smooth and bounded, including in clear weather', () => {
  for (let i = 0; i < 100; i++) {
    const first = windAt(i, 123, 41),
      next = windAt(i + 0.001, 123.001, 41)
    assert.ok(Math.abs(first.x) <= 1.001 && Math.abs(first.y) <= 0.201)
    assert.ok(
      Math.abs(first.x - next.x) < 0.01 && Math.abs(first.y - next.y) < 0.01,
    )
  }
})
test('surface response grows through twenty 15-second steps and caps at five minutes', () => {
  assert.equal(WEATHER_SETTLE_DELAY, 15)
  assert.equal(WEATHER_SETTLE_CAP, 300)
  for (const age of [0, 5, 12, 14.99]) assert.equal(weatherExposure(age), 0)
  for (let level = 1; level <= 20; level++) {
    assert.equal(weatherExposure(level * 15), level / 20)
    assert.equal(weatherExposure(level * 15 + 14), level / 20)
  }
  assert.equal(weatherExposure(150), 0.5)
  for (const age of [300, 360, 10000]) assert.equal(weatherExposure(age), 1)
  assert.equal(weatherExposure(-10), 0)
  assert.equal(weatherExposure(NaN), 0)
})

test('automatic weather uses the visitor local month at a timezone boundary', () => {
  const moduleUrl = new URL('../src/content/appearance.ts', import.meta.url)
    .href
  const script = `import {initialWeather} from ${JSON.stringify(moduleUrl)};console.log(initialWeather(new Date('2026-10-31T12:30:00Z'),()=>0))`
  for (const [timezone, expected] of [
    ['Pacific/Kiritimati', 'snow'],
    ['Pacific/Honolulu', 'off'],
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
