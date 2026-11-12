import type { Note } from '../types.ts'
import { helloWorld } from './2026-11-07-hello-world.ts'

// Import each new entry here. The notebook lists newest entries first.
export const notes: Note[] = [helloWorld].sort((a, b) =>
  b.date.localeCompare(a.date),
)
