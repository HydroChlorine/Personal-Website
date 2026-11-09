import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isChemistryContext } from '../src/content/chemistryScenes.ts'
const projects = ['catalyst-workflow', 'metal-free-metathesis']
const notes = ['a-chemistry-note']

test('chemistry banners follow chemistry context across subjects, shared projects, filters and notes', () => {
  for (const [path, search] of [
    ['/chemistry', ''],
    ['/chemistry/', ''],
    ['/chemistry/future-story', ''],
    ['/projects/catalyst-workflow', ''],
    ['/projects/metal-free-metathesis', ''],
    ['/projects', '?subject=chemistry'],
    ['/projects/', '?subject=chemistry&sort=new'],
    ['/notebook/a-chemistry-note', ''],
  ])
    assert.equal(
      isChemistryContext(path!, search!, projects, notes),
      true,
      path,
    )
})
test('unrelated and unknown pages retain the campus banner', () => {
  for (const [path, search] of [
    ['/', ''],
    ['/about', ''],
    ['/mathematics', ''],
    ['/computer-science', ''],
    ['/chemistry-similar-name', ''],
    ['/projects', ''],
    ['/projects', '?subject=mathematics'],
    ['/projects/unrecognized-project', ''],
    ['/projects/catalyst-workflow/unknown', ''],
    ['/notebook', ''],
    ['/notebook/unrelated-note', ''],
  ])
    assert.equal(
      isChemistryContext(path!, search!, projects, notes),
      false,
      path,
    )
})
