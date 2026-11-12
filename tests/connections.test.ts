import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  ideaNodes,
  ideaConnections,
  connectedIdeas,
} from '../src/content/connections.ts'

test('curated connections resolve to real entries, are reciprocal, and cover every story', () => {
  assert.equal(new Set(ideaNodes.map((n) => n.id)).size, ideaNodes.length)
  const pairs = new Set<string>()
  for (const [a, b, reason] of ideaConnections) {
    assert.ok(
      ideaNodes.some((n) => n.id === a),
      `Missing source: ${a}`,
    )
    assert.ok(
      ideaNodes.some((n) => n.id === b),
      `Missing target: ${b}`,
    )
    assert.notEqual(a, b)
    assert.ok(reason.length > 30)
    const key = [a, b].sort().join(':')
    assert.ok(!pairs.has(key), `Duplicate pair: ${key}`)
    pairs.add(key)
    assert.ok(connectedIdeas(b).some((n) => n.id === a))
  }
  for (const node of ideaNodes)
    assert.ok(connectedIdeas(node.id).length >= 1, `No connections: ${node.id}`)
  assert.deepEqual(connectedIdeas('not-a-story'), [])
})
