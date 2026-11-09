import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { mathTopics } from '../src/content/mathematics/index.ts'
import { sceneContext } from '../src/content/sceneContext.ts'
import { figureSources } from '../src/components/articles/figureSources.ts'

const publicRoot = fileURLToPath(new URL('../public', import.meta.url))
const manifest = JSON.parse(
  readFileSync(`${publicRoot}/media/mathematics/topics/manifest.json`, 'utf8'),
).figures
test('six distinct mathematics topic routes have complete stories and unique section anchors', () => {
  assert.equal(mathTopics.length, 6)
  assert.equal(new Set(mathTopics.map((topic) => topic.slug)).size, 6)
  for (const topic of mathTopics) {
    assert.equal(
      sceneContext(`/mathematics/topics/${topic.slug}`, '', [], []),
      'mathematics',
    )
    assert.equal(topic.article.kind, 'topic')
    assert.ok(topic.article.sections.length >= 7)
    assert.equal(
      new Set(topic.article.sections.map((section) => section.id)).size,
      topic.article.sections.length,
    )
    assert.ok(
      topic.article.sections.every((section) => section.paragraphs.length > 0),
    )
  }
})
test('all 46 article figures have pixel and crisp animations, static vectors, and mobile variants with matching metadata', () => {
  let count = 0
  for (const topic of mathTopics)
    for (const section of topic.article.sections) {
      for (const figure of [section.figure, ...(section.figures ?? [])].filter(
        (figure) => !!figure,
      )) {
        count++
        for (const path of [
          figure.src,
          figure.mobileSrc,
          figure.pixel?.gif,
          figure.pixel?.still,
          figure.pixel?.mobileGif,
          figure.pixel?.mobileStill,
          figure.crisp?.gif,
          figure.crisp?.mobileGif,
        ]) {
          assert.ok(path)
          assert.ok(existsSync(publicRoot + path), path)
        }
        const name = figure.src.split('/').pop()!.replace('.svg', '')
        assert.deepEqual(manifest[name].wide.size, [
          figure.width,
          figure.height,
        ])
        assert.deepEqual(manifest[name].mobile.size, [450, figure.mobileHeight])
        assert.deepEqual(manifest[name].wide.crispSize, [
          figure.width! * 2,
          figure.height! * 2,
        ])
        assert.deepEqual(manifest[name].mobile.crispSize, [
          900,
          figure.mobileHeight! * 2,
        ])
        assert.match(
          readFileSync(publicRoot + figure.src, 'utf8'),
          new RegExp(`height="${figure.height}"`),
        )
      }
    }
  assert.equal(count, 46)
})

test('math styles both animate when playing, and both become static when motion is paused', () => {
  const figure = mathTopics[0]!.article.sections[0]!.figure!
  for (const pixel of [true, false]) {
    const playing = figureSources(figure, pixel, true)
    assert.ok(playing.source.endsWith('.gif'))
    assert.ok(playing.mobileSource?.endsWith('.gif'))
    const paused = figureSources(figure, pixel, false)
    assert.ok(!paused.source.endsWith('.gif'))
    assert.ok(!paused.mobileSource?.endsWith('.gif'))
    assert.ok(!paused.fullSize.endsWith('.gif'))
  }
  assert.equal(figureSources(figure, false, false).source, figure.src)
  assert.equal(figureSources(figure, false, true).fullSize, figure.crisp!.gif)
})

test('older static diagrams remain static without an animated crisp companion', () => {
  const legacy = {
    src: '/figure.svg',
    mobileSrc: '/figure-mobile.svg',
    alt: 'Diagram',
    caption: 'Legacy illustration',
  }
  assert.equal(figureSources(legacy, false, true).source, legacy.src)
  assert.equal(
    figureSources(legacy, false, true).mobileSource,
    legacy.mobileSrc,
  )
})
