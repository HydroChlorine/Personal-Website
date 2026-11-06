export type SubjectId = 'chemistry' | 'mathematics' | 'computer-science'
export interface Subject {
  id: SubjectId
  name: string
  number: string
  tagline: string
  introduction: string
  interests: string[]
  shelves: { title: string; description: string }[]
}
export interface Project {
  slug: string
  title: string
  subjects: SubjectId[]
  kind: string
  summary: string
  body: string[]
  // Content readiness, not a claim about the status of the underlying work.
  readiness: 'outline' | 'published'
  media?: { src: string; alt: string; caption?: string }
  links: { label: string; href: string }[]
}
export interface Note {
  slug: string
  title: string
  date: string
  subjects: SubjectId[]
  summary: string
  paragraphs: string[]
}
export interface PlaygroundEntry {
  title: string
  description: string
  href: string
  subjects: SubjectId[]
}
export interface GalleryEntry {
  src: string
  alt: string
  caption: string
}
export interface CollectedLink {
  title: string
  href: string
  note: string
}
