import { isChemistryContext } from './chemistryScenes.ts'
import type { SubjectId } from './types'

type TaggedEntry = { slug: string; subjects: SubjectId[] }
export function sceneContext(
  pathname: string,
  search: string,
  projects: readonly TaggedEntry[],
  notes: readonly TaggedEntry[],
): 'chemistry' | 'mathematics' | 'campus' {
  const slugs = (entries: readonly TaggedEntry[], subject: SubjectId) =>
    entries
      .filter((entry) => entry.subjects.includes(subject))
      .map((entry) => entry.slug)
  // Chemistry takes precedence for shared projects, including Catalyst Discovery.
  if (
    isChemistryContext(
      pathname,
      search,
      slugs(projects, 'chemistry'),
      slugs(notes, 'chemistry'),
    )
  )
    return 'chemistry'
  const parts = pathname.split('/').filter(Boolean)
  if (parts[0] === 'mathematics') return 'mathematics'
  if (parts[0] === 'projects') {
    if (
      parts.length === 1 &&
      new URLSearchParams(search).get('subject') === 'mathematics'
    )
      return 'mathematics'
    if (
      parts.length === 2 &&
      slugs(projects, 'mathematics').includes(parts[1]!)
    )
      return 'mathematics'
  }
  if (
    parts[0] === 'notebook' &&
    parts.length === 2 &&
    slugs(notes, 'mathematics').includes(parts[1]!)
  )
    return 'mathematics'
  return 'campus'
}
