import type { Note } from '../types.ts'

export const helloWorld: Note = {
  slug: 'hello-world',
  title: 'Hello, world!',
  date: '2026-11-07',
  subjects: [],
  summary:
    'Bring in the first greeting',
  paragraphs: [
    'Hello, world! It felt wrong to start a notebook any other way.',
    'I wanted somewhere to keep the things that usually end up in loose notes: a question I haven’t answered yet, something neat I noticed, or an idea that seemed worth trying. Some of those things become projects. Most just need a paragraph and a place to stay.',
    'I’m still figuring out what this place will become. For now, the lights are on, the notebook has its first page, and you’re here. Thanks for stopping by.',
    '— Me',
  ],
}
