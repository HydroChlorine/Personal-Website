import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sceneContext } from '../src/content/sceneContext.ts'
import type { SubjectId } from '../src/content/types.ts'
const projects = [
  {
    slug: 'catalyst-workflow',
    subjects: ['chemistry', 'mathematics', 'computer-science'] as SubjectId[],
  },
  { slug: 'algebra-paper', subjects: ['mathematics'] as SubjectId[] },
  { slug: 'graphics-demo', subjects: ['computer-science'] as SubjectId[] },
  {
    slug: 'numerical-tool',
    subjects: ['mathematics', 'computer-science'] as SubjectId[],
  },
]
const notes = [
  { slug: 'math-note', subjects: ['mathematics'] as SubjectId[] },
  { slug: 'cs-note', subjects: ['computer-science'] as SubjectId[] },
]

test('mathematics banners cover subject pages, filters, and catalogued math projects and notes', () => {
  for (const [path, search] of [
    ['/mathematics', ''],
    ['/mathematics/', ''],
    ['/mathematics/future', ''],
    ['/projects/', '?subject=mathematics'],
    ['/projects/algebra-paper', ''],
    ['/notebook/math-note', ''],
  ])
    assert.equal(
      sceneContext(path!, search!, projects, notes),
      'mathematics',
      path,
    )
})
test('shared chemistry projects retain laboratory scenes, regardless of query filters', () => {
  for (const search of [
    '',
    '?subject=mathematics',
    '?subject=computer-science',
  ])
    assert.equal(
      sceneContext('/projects/catalyst-workflow', search, projects, notes),
      'chemistry',
    )
  assert.equal(sceneContext('/chemistry', '', projects, notes), 'chemistry')
})
test('CS banners cover CS routes, project filters, and exclusively CS details without changing shared-subject precedence', () => {
  for (const [path, search] of [
    ['/computer-science', ''],
    ['/computer-science/future', ''],
    ['/projects', '?subject=computer-science'],
    ['/projects/graphics-demo', ''],
    ['/notebook/cs-note', ''],
  ])
    assert.equal(
      sceneContext(path!, search!, projects, notes),
      'computer-science',
    )
  assert.equal(
    sceneContext('/projects/numerical-tool', '', projects, notes),
    'mathematics',
  )
})
test('unknown details and unrelated routes keep campus scenes', () => {
  for (const path of [
    '/',
    '/about',
    '/computer-science-extra',
    '/mathematics-extra',
    '/notebook',
    '/notebook/unknown',
    '/projects/unknown',
    '/projects/algebra-paper/unknown',
    '/projects/graphics-demo/unknown',
  ])
    assert.equal(sceneContext(path, '', projects, notes), 'campus', path)
})
