import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { chemistryExperienceCards } from '../src/content/chemistry/experiences/index.ts'
import { chemistryExperiences } from '../src/content/chemistry/experiences/articles.ts'
import { figureSources } from '../src/components/articles/figureSources.ts'
import { sceneContext } from '../src/content/sceneContext.ts'
const root = fileURLToPath(new URL('../public', import.meta.url))
const manifest = JSON.parse(
  readFileSync(`${root}/media/chemistry/experiences/manifest.json`, 'utf8'),
)
test('all 15 laboratory experiences have unique routes, real sections, previews, and chemistry banners', () => {
  assert.equal(chemistryExperiences.length, 15)
  assert.equal(new Set(chemistryExperiences.map((x) => x.slug)).size, 15)
  for (const item of chemistryExperiences) {
    assert.ok(existsSync(root + item.preview))
    assert.equal(item.article.kind, 'snippet')
    assert.equal(item.article.subject, 'chemistry')
    assert.ok(item.article.sections.length >= 3)
    assert.equal(
      new Set(item.article.sections.map((s) => s.id)).size,
      item.article.sections.length,
    )
    assert.equal(
      sceneContext(`/chemistry/snippets/${item.slug}`, '', [], []),
      'chemistry',
    )
  }
})
test('48 figure concepts ship paired moving styles, phone layouts, and motion-free companions', () => {
  const names = new Set<string>()
  for (const item of chemistryExperiences)
    for (const section of item.article.sections) {
      const f = section.figure!
      assert.ok(f?.pixel && f.crisp)
      const name = f.src.split('/').pop()!.replace('.svg', '')
      names.add(name)
      for (const src of [
        f.src,
        f.mobileSrc,
        f.pixel.gif,
        f.pixel.still,
        f.pixel.mobileGif,
        f.pixel.mobileStill,
        f.crisp.gif,
        f.crisp.mobileGif,
      ])
        assert.ok(src && existsSync(root + src), src)
      assert.deepEqual(manifest.figures[name].wide.size, [f.width, f.height])
      assert.deepEqual(manifest.figures[name].mobile.size, [
        450,
        f.mobileHeight,
      ])
      for (const pixel of [true, false]) {
        assert.ok(figureSources(f, pixel, true).source.endsWith('.gif'))
        assert.ok(!figureSources(f, pixel, false).source.endsWith('.gif'))
        assert.ok(figureSources(f, pixel, true).mobileSource?.endsWith('.gif'))
        assert.ok(
          !figureSources(f, pixel, false).mobileSource?.endsWith('.gif'),
        )
      }
    }
  assert.equal(names.size, 48)
  assert.deepEqual([...names].sort(), Object.keys(manifest.figures).sort())
})
test('recorded points remain distinct from illustrative teaching data', () => {
  assert.equal(manifest.numericalChecks.tonicPointCount, 7)
  assert.equal(manifest.numericalChecks.chlorophyllPointCount, 8)
  const tonic = chemistryExperiences[0]!.article
  assert.match(
    tonic.sections.find((x) => x.id === 'ranges')!.paragraphs.join(' '),
    /different calibrations/,
  )
  assert.match(
    tonic.sections
      .find((x) => x.id === 'readings')!
      .detailParagraphs!.join(' '),
    /search bound/,
  )
  assert.ok(
    chemistryExperiences.every(
      (x) => !/ring-closing|molecules-in-pictures/.test(x.slug),
    ),
  )
})

test('each collection card has its own animated teaser and matching pause companion', () => {
  const previews = JSON.parse(
    readFileSync(
      `${root}/media/chemistry/experiences/previews-manifest.json`,
      'utf8',
    ),
  )
  assert.deepEqual(
    Object.keys(previews).sort(),
    chemistryExperienceCards.map((item) => item.slug).sort(),
  )
  for (const item of chemistryExperienceCards) {
    assert.ok(existsSync(root + item.previewGif), item.slug)
    assert.ok(existsSync(root + item.preview), item.slug)
    assert.ok(item.previewGif.endsWith('-preview.gif'))
    assert.ok(item.preview.endsWith('-preview.png'))
    assert.equal(previews[item.slug].durationMs, 12000)
    assert.deepEqual(previews[item.slug].size, [768, 432])
  }
})

test('snippets explain actual questions and methods without course labels', () => {
  for (const item of chemistryExperiences) {
    const copy = [
      item.article.kicker,
      ...item.article.introduction,
      ...item.article.sections.flatMap((s) => [
        s.title,
        ...s.paragraphs,
        ...(s.detailParagraphs ?? []),
      ]),
    ].join(' ')
    assert.ok(!/CHEM 30[23]0|lab section|course summary/i.test(copy), item.slug)
    assert.equal(item.article.kind, 'snippet')
    assert.ok(item.article.introduction.join(' ').length > 120, item.slug)
  }
  assert.match(
    chemistryExperiences[0]!.article.sections
      .find((s) => s.id === 'stern-volmer')!
      .paragraphs.join(' '),
    /Stern–Volmer/,
  )
  const radio = chemistryExperiences.find(
    (s) => s.slug === 'a-half-life-in-noisy-counts',
  )!.article
  assert.match(
    radio.sections.find((s) => s.id === 'decay')!.paragraphs.join(' '),
    /Stephanie Chen/,
  )
  assert.match(
    radio.sections.find((s) => s.id === 'gamma')!.paragraphs.join(' '),
    /calibration anchor/,
  )
})
