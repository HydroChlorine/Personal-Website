import type { Project } from '../types'
export const catalystWorkflow: Project = {
  slug: 'catalyst-workflow',
  title: 'Molecules, meet computation',
  subjects: ['chemistry', 'mathematics', 'computer-science'],
  kind: 'Research software',
  readiness: 'outline',
  summary:
    'Generating catalyst candidates, preparing molecular geometries, and exploring energy prediction.',
  body: [
    'An exploratory research workflow combining molecular structure generation, geometry preparation before DFT, and random forest models for energy properties. The work was early-stage and later set aside to focus on experimental projects.',
    'A closer look at the implementation, example structures, and lessons learned will be added here.',
  ],
  links: [],
}
