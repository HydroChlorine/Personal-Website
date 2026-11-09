import type { Project } from '../types'
import { catalystWorkflow } from './catalyst-workflow'
import { metathesis } from './metathesis'
import { algebraDiscussion } from './algebra-discussion'
// Add entries here when actual projects have been selected.
export const projects: Project[] = [
  catalystWorkflow,
  algebraDiscussion,
  metathesis,
]
