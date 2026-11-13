import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  boundedLevel,
  displayLevel,
  moodNeedle,
  energyLever,
  attentionPicture,
} from '../src/components/widgets/momentState.ts'
import { currentCheckIn } from '../src/content/now.ts'
import { notes } from '../src/content/notes/index.ts'
import { site } from '../src/config/site.ts'
import { profile } from '../src/content/profile.ts'
import { sceneContext } from '../src/content/sceneContext.ts'
const publicRoot = fileURLToPath(new URL('../public', import.meta.url))
test('mood and energy graphics map negative, neutral and positive values in the requested directions', () => {
  assert.equal(boundedLevel(Infinity), 0)
  assert.equal(boundedLevel(NaN), 0)
  assert.equal(boundedLevel(-10), -1)
  assert.equal(boundedLevel(10), 1)
  assert.equal(displayLevel(0.3), '+0.30')
  assert.equal(displayLevel(-0.5), '−0.50')
  assert.equal(displayLevel(-0), '0.00')
  const left = moodNeedle(-1),
    middle = moodNeedle(0),
    right = moodNeedle(1)
  assert.ok(left.x < middle.x && middle.x < right.x)
  assert.ok(middle.y < left.y && middle.y < right.y)
  const low = energyLever(-1),
    normal = energyLever(0),
    high = energyLever(1)
  assert.ok(high.y < normal.y && normal.y < low.y)
  assert.ok(high.pointerY < normal.pointerY && normal.pointerY < low.pointerY)
  for (let n = -1; n <= 1; n += 0.01) {
    const needle = moodNeedle(n),
      lever = energyLever(n)
    assert.ok(
      needle.x >= 0 && needle.x <= 180 && needle.y >= 0 && needle.y <= 83,
    )
    assert.ok(
      lever.y >= 0 &&
        lever.y <= 96 &&
        lever.pointerY >= 0 &&
        lever.pointerY <= 96,
    )
  }
})
test('attention moves from unrecognizable pixels to a sharp Nyan Cat SVG, with every companion shipped', () => {
  const levels = [-1, -0.7, -0.4, 0, 0.5, 1]
  assert.equal(new Set(levels.map((v) => attentionPicture(v).src)).size, 6)
  assert.ok(attentionPicture(1).src.endsWith('.svg'))
  assert.ok(attentionPicture(-1).src.endsWith('nyan-chaos.png'))
  assert.ok(attentionPicture(-1).blur > attentionPicture(-0.2).blur)
  assert.equal(attentionPicture(1).blur, 0)
  for (const level of levels)
    assert.ok(existsSync(publicRoot + attentionPicture(level).src))
})
test('the author can update the dated check-in while preserving the value contract', () => {
  for (const level of [
    currentCheckIn.mood,
    currentCheckIn.energy,
    currentCheckIn.attention,
  ]) {
    assert.ok(Number.isFinite(level) && level >= -1 && level <= 1)
  }
  if (currentCheckIn.updated)
    assert.match(currentCheckIn.updated, /^\d{4}-\d{2}-\d{2}$/)
})
test('hello world is a real general notebook entry; personal corner is absent from navigation', () => {
  const hello = notes.find((note) => note.slug === 'hello-world')!
  assert.equal(hello.title, 'Hello, world!')
  assert.ok(hello.paragraphs.length >= 3)
  assert.equal(new Set(notes.map((n) => n.slug)).size, notes.length)
  assert.ok(!site.navigation.some((item) => String(item.href) === '/personal'))
  assert.equal(sceneContext('/notebook/hello-world', '', [], notes), 'campus')
})
test('the configured public CV is an actual PDF', () => {
  assert.equal(profile.cvUrl, '/documents/lichen-huang-cv.pdf')
  const bytes = readFileSync(publicRoot + profile.cvUrl)
  assert.equal(bytes.subarray(0, 5).toString(), '%PDF-')
})

test('moon readings stay in Ithaca and its daylight-saving-aware clock', async () => {
  const { moonLocation, moonReading, moonPixels } =
    await import('../src/components/widgets/moonState.ts')
  assert.equal(moonLocation.latitude, 42.4444)
  assert.equal(moonLocation.longitude, -76.4926)
  assert.equal(moonReading(new Date('2026-07-01T16:00:00Z')).clock, '12:00:00')
  assert.equal(moonReading(new Date('2026-12-01T16:00:00Z')).clock, '11:00:00')
  const current = moonReading(new Date('2026-11-11T20:00:00Z'))
  assert.ok(current.azimuth >= 0 && current.azimuth < 360)
  assert.ok(current.altitude >= -90 && current.altitude <= 90)
  assert.ok(current.fraction >= 0 && current.fraction <= 1)
  assert.ok(
    moonPixels(1, 0).every((cell) =>
      ['#b5b8ae', '#e5e3c9'].includes(cell.fill),
    ),
  )
  assert.ok(
    moonPixels(0, 0).every((cell) =>
      ['#263346', '#344155'].includes(cell.fill),
    ),
  )
})
test('attention gets visibly sharper across the positive range', () => {
  const levels = [0, 0.2, 0.5, 0.7, 1]
  for (let i = 1; i < levels.length; i++)
    assert.ok(
      attentionPicture(levels[i]).blur < attentionPicture(levels[i - 1]).blur,
    )
  assert.ok(attentionPicture(0).blur > 0)
  assert.ok(attentionPicture(0).src.endsWith('nyan-pixel.png'))
  assert.ok(attentionPicture(0.2).src.endsWith('nyan-fine.png'))
  assert.ok(attentionPicture(0.7).src.endsWith('nyan.svg'))
})
