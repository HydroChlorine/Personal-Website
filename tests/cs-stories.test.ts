import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { csProjects, csTopics } from '../src/content/computer-science/index.ts'
import { sceneContext } from '../src/content/sceneContext.ts'
import { figureSources } from '../src/components/articles/figureSources.ts'

const publicRoot = fileURLToPath(new URL('../public', import.meta.url))
const manifest = JSON.parse(
  readFileSync(
    `${publicRoot}/media/computer-science/stories/manifest.json`,
    'utf8',
  ),
).figures

test('five project stories and a CS topic have real sections, unique anchors, and correct banner context', () => {
  assert.equal(csProjects.length, 5)
  assert.equal(csTopics.length, 1)
  assert.equal(new Set(csProjects.map((p) => p.slug)).size, 5)
  for (const project of csProjects) {
    assert.equal(
      sceneContext(`/projects/${project.slug}`, '', csProjects, []),
      'computer-science',
    )
    assert.ok(project.article && project.article.sections.length >= 3)
    assert.equal(
      new Set(project.article.sections.map((s) => s.id)).size,
      project.article.sections.length,
    )
  }
  assert.ok(csProjects.find((p) => p.slug === 'four-dimensions')?.progress)
  assert.equal(csTopics[0]!.article.subject, 'computer-science')
  assert.equal(
    sceneContext(
      `/computer-science/topics/${csTopics[0]!.slug}`,
      '',
      csProjects,
      [],
    ),
    'computer-science',
  )
})
test('all 23 CS figure concepts ship eight correctly sized variants and obey the shared motion policy', () => {
  const articles = [...csProjects.map((p) => p.article!), csTopics[0]!.article]
  const names = new Set<string>()
  for (const article of articles)
    for (const section of article.sections)
      for (const figure of [section.figure, ...(section.figures ?? [])].filter(
        (f) => !!f,
      )) {
        const name = figure.src.split('/').pop()!.replace('.svg', '')
        names.add(name)
        for (const src of [
          figure.src,
          figure.mobileSrc,
          figure.pixel?.gif,
          figure.pixel?.still,
          figure.pixel?.mobileGif,
          figure.pixel?.mobileStill,
          figure.crisp?.gif,
          figure.crisp?.mobileGif,
        ]) {
          assert.ok(src)
          assert.ok(existsSync(publicRoot + src), src)
        }
        assert.deepEqual(manifest[name].wide.size, [
          figure.width,
          figure.height,
        ])
        assert.deepEqual(manifest[name].mobile.size, [450, figure.mobileHeight])
        for (const pixel of [true, false]) {
          assert.ok(figureSources(figure, pixel, true).source.endsWith('.gif'))
          assert.ok(
            !figureSources(figure, pixel, false).source.endsWith('.gif'),
          )
        }
      }
  assert.equal(names.size, 23)
  assert.deepEqual([...names].sort(), Object.keys(manifest).sort())
})
test('the website demo is local, its assets are shipped, and hosting preserves its static route', () => {
  assert.equal(
    csProjects.find((p) => p.slug === 'this-website')?.interactiveDemo,
    'site-miniature',
  )
  for (const name of ['index.html'])
    assert.ok(existsSync(`${publicRoot}/demos/site-miniature/${name}`))
  const config = JSON.parse(
    readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'),
  )
  const route = new RegExp('^' + config.rewrites[0].source + '$')
  assert.ok(!route.test('/demos/site-miniature/'))
  assert.ok(route.test('/miniature'))
  assert.ok(route.test('/projects/this-website'))
  assert.ok(route.test('/computer-science/topics/proofs-as-programs'))
})
