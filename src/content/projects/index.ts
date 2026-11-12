import type { Project } from '../types'
import { catalystWorkflow } from './catalyst-workflow.ts'
import { metathesis } from './metathesis.ts'
import { algebraDiscussion } from './algebra-discussion.ts'
import { csProjects } from '../computer-science/index.ts'
// Add entries here when actual projects have been selected.
export const projects: Project[] = [
  catalystWorkflow,
  algebraDiscussion,
  metathesis,
  ...csProjects,
]
