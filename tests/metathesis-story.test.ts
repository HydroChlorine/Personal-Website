import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { metathesis } from '../src/content/projects/metathesis.ts'
import { figureSources } from '../src/components/articles/figureSources.ts'
import { sceneContext } from '../src/content/sceneContext.ts'
const root = fileURLToPath(new URL('../public', import.meta.url))

test('the ring-closing project is an illustrated chemistry story with submission status and distinct experimental claims', () => {
  assert.equal(metathesis.readiness, 'published') // Website story readiness, not publication status.
  assert.equal(
    sceneContext('/projects/metal-free-metathesis', '', [metathesis], []),
    'chemistry',
  )
  const article = metathesis.article!
  assert.equal(article.subject, 'chemistry')
  assert.equal(article.sections.length, 8)
  assert.equal(new Set(article.sections.map((s) => s.id)).size, 8)
  assert.ok(
    article.introduction.join(' ').includes('prepared for journal submission'),
  )
  const optimization = article.sections.find(
    (s) => s.id === 'reaction-development',
  )!
  assert.match(optimization.paragraphs.join(' '), /NMR yield from 44% to 77%/)
  const catalytic = article.sections.find((s) => s.id === 'designed-turnover')!
  assert.match(
    catalytic.paragraphs.join(' '),
    /20 mol% hydrazine gave 78% isolated yield/,
  )
  assert.match(
    catalytic.paragraphs.join(' '),
    /aldehyde is still used at one equivalent/,
  )
  assert.equal(metathesis.links.length, 0) // No invented DOI or public manuscript download.
})
test('all eight RCM figures ship matching animated styles, responsive layouts and static pause views', () => {
  const figures = metathesis.article!.sections.map((s) => s.figure!)
  const manifest = JSON.parse(
    readFileSync(root + '/media/metathesis/manifest.json', 'utf8'),
  ).figures
  assert.equal(figures.length, 8)
  for (const f of figures) {
    const name = f.src.split('/').pop()!.replace('.svg', '')
    const entry = manifest[name]
    for (const path of [
      f.src,
      f.mobileSrc,
      f.pixel?.gif,
      f.pixel?.still,
      f.pixel?.mobileGif,
      f.pixel?.mobileStill,
      f.crisp?.gif,
      f.crisp?.mobileGif,
    ]) {
      assert.ok(path)
      assert.ok(existsSync(root + path), path)
    }
    assert.deepEqual(entry.wide.size, [f.width, f.height])
    assert.deepEqual(entry.mobile.size, [450, f.mobileHeight])
    for (const mode of ['wide', 'mobile']) {
      assert.ok(entry[mode].pixelFrames > 1)
      assert.ok(entry[mode].crispFrames > 1)
      assert.equal(entry[mode].durationMs, 5760)
    }
    assert.match(entry.wide.frameContentSha256, /^[a-f0-9]{64}$/)
    assert.equal(figureSources(f, true, true).source, f.pixel!.gif)
    assert.equal(figureSources(f, false, true).source, f.crisp!.gif)
    assert.equal(figureSources(f, true, false).source, f.pixel!.still)
    assert.equal(figureSources(f, false, false).source, f.src)
  }
})

test('molecular art preserves the cage and checks the bond-exchange endpoints', () => {
  const checks = JSON.parse(
    readFileSync(root + '/media/metathesis/manifest.json', 'utf8'),
  ).numericalChecks
  assert.equal(checks.cageHeavyAtoms, 8)
  assert.equal(checks.cageBonds, 9)
  assert.equal(checks.metalCycleAtomCount, 10)
  assert.equal(checks.relayStatesChecked, 6)
  assert.equal(checks.phenanthreneCarbons, 14)
  assert.equal(checks.areneWaveCarbons, 22)
  assert.deepEqual(checks.couplingAlkeneAnglesDegrees, [120, 120, 120])
  const scope = metathesis.article!.sections.find(
    (s) => s.id === 'rings-we-made',
  )!
  assert.match(scope.figure!.caption, /arene oligomer\/polymer \(70\)/)
  assert.doesNotMatch(scope.figure!.caption, /76%/)
  assert.equal(checks.molecularValenceChecks, 'passed')
  assert.equal(checks.exchangeEndpointChecks, 'passed')
  const opening = metathesis.article!.sections[0]
  assert.match(opening.figure!.caption, /conventional metal/)
  assert.match(opening.figure!.caption, /regenerate the carrier/)
  const ending = metathesis.article!.sections.at(-1)!
  assert.match(ending.paragraphs.join(' '), /first-generation Grubbs protocol/)
})
