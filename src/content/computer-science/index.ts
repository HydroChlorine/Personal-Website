import type { Project } from '../types'
import { critterArticle } from './critterworld.ts'
import { fireworksArticle } from './fireworks.ts'
import { dimensionsArticle } from './four-dimensions.ts'
import { backendArticle } from './backend.ts'
import { websiteArticle } from './website.ts'
import { verificationArticle } from './verification.ts'
import { csSources as s } from './sources.ts'

export const csProjects: Project[] = [
  {
    slug: 'critterworld',
    title: 'CritterWorld',
    subjects: ['computer-science'],
    kind: 'Collaborative language & simulation',
    readiness: 'published',
    summary:
      'A small language becomes the behavior of an evolving hexagonal world. A four-person CS 2112 project.',
    body: [],
    article: critterArticle,
    links: [s.critter],
  },
  {
    slug: 'paint-a-firework',
    title: 'Paint a firework',
    subjects: ['computer-science'],
    kind: 'Interactive graphics',
    readiness: 'published',
    summary:
      'Paint a burst, launch a copy, and explore how color, motion, and trails change its feel.',
    body: [],
    article: fireworksArticle,
    links: [],
  },
  {
    slug: 'four-dimensions',
    title: 'Finding a way through four dimensions',
    subjects: ['computer-science', 'mathematics'],
    bannerSubject: 'computer-science',
    kind: 'Game prototype',
    readiness: 'published',
    progress: {},
    summary:
      'An ongoing collaborative Godot game about slices, spatial puzzles, and another direction to move.',
    body: [],
    article: dimensionsArticle,
    links: [s.game, s.upstream],
  },
  {
    slug: 'backend-internship',
    title: 'From a filter to a response',
    subjects: ['computer-science'],
    kind: 'Industry experience / Summer 2025',
    readiness: 'published',
    summary:
      'Backend work at Global InfoTech: Java, Spring Boot, DTOs, SQL, and useful interfaces for a frontend team.',
    body: [],
    article: backendArticle,
    links: [],
  },
  {
    slug: 'this-website',
    title: 'This website',
    subjects: ['computer-science'],
    kind: 'A personal place on the web',
    readiness: 'published',
    summary:
      'Three subjects, one growing home. A little night sky with room to wander.',
    interactiveDemo: 'site-miniature',
    body: [],
    article: websiteArticle,
    links: [s.repository],
  },
]
export const csTopics = [
  {
    slug: 'proofs-as-programs',
    title: 'Proofs as programs',
    summary:
      'From a precise claim to checked evidence, through my red-black-tree proofs in Rocq.',
    article: verificationArticle,
  },
]
export const csProjectOrder = [
  'critterworld',
  'paint-a-firework',
  'four-dimensions',
  'backend-internship',
  'catalyst-workflow',
  'this-website',
]
