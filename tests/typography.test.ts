import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  parseTextStyle,
  splitLetterAccent,
} from '../src/components/typography/textStyleState.ts'

test('text preference defaults to pixel and accepts only the explicit sharp preference', () => {
  for (const value of [null, '', 'pixel', 'invalid'])
    assert.equal(parseTextStyle(value), 'pixel')
  assert.equal(parseTextStyle('sharp'), 'sharp')
})
test('editorial letter accents preserve exact text and never match part of another word', () => {
  for (const [text, word, index] of [
    ['I love the moon.', 'love', 0],
    ['Hello, world!', 'Hello', 2],
    ['unlikely, like, likely', 'like', 0],
  ] as const) {
    const parts = splitLetterAccent(text, word, index)!
    assert.equal(parts.before + parts.letter + parts.after, text)
    assert.equal(parts.letter, word[index])
  }
  assert.equal(splitLetterAccent('unlikely and likelihood', 'like'), null)
  assert.equal(splitLetterAccent('word', '', 0), null)
  assert.equal(splitLetterAccent('word', 'word', -1), null)
  assert.equal(splitLetterAccent('word', 'word', 4), null)
})
