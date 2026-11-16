import type { Project } from '../types'
import { catalystArticle } from './catalyst-article.ts'
export const catalystWorkflow: Project = {
  slug: 'catalyst-workflow',
  title: 'Molecules, meet computation',
  subjects: ['chemistry', 'mathematics', 'computer-science'],
  kind: 'Research software',
  readiness: 'published',
  summary:
    'A first-year Python project connecting molecular generation, calculation inputs, and a small energy-prediction model.',
  preview: {
    gif: '/media/project-previews/catalyst-discovery.gif',
    still: '/media/project-previews/catalyst-discovery.png',
    width: 1000,
    height: 600,
    alt: 'A catalyst scaffold branches into candidate molecules, flows through a predictor, and returns a ranked candidate to the search loop.',
    pixelated: true,
  },
  body: [],
  article: catalystArticle,
  links: [
    {
      label: 'Catalyst Discovery on GitHub',
      href: 'https://github.com/HydroChlorine/Catalyst-Discovery',
    },
  ],
}
