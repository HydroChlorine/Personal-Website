export type TextStyle = 'pixel' | 'sharp'
export const textStyleKey = 'site-text-style'
export function parseTextStyle(value: string | null): TextStyle {
  return value === 'sharp' ? 'sharp' : 'pixel'
}
export function splitLetterAccent(text: string, word: string, letterIndex = 0) {
  // Editorial opt-in only: never search/transform an entire document.
  if (!word || letterIndex < 0 || letterIndex >= word.length) return null
  let start = text.indexOf(word)
  while (start >= 0) {
    const before = text[start - 1] ?? '',
      after = text[start + word.length] ?? ''
    if (!/[\p{L}\p{N}_]/u.test(before) && !/[\p{L}\p{N}_]/u.test(after)) {
      const i = start + letterIndex
      return {
        before: text.slice(0, i),
        letter: text[i],
        after: text.slice(i + 1),
      }
    }
    start = text.indexOf(word, start + word.length)
  }
  return null
}
