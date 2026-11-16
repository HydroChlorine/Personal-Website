import type { Project } from '../types'
import { metathesisArticle } from './metathesis-article.ts'
export const metathesis: Project = {
  slug: 'metal-free-metathesis',
  title: 'Metal-Free Ring Closing Metathesis',
  subjects: ['chemistry'],
  kind: 'From the laboratory / collaborative research',
  readiness: 'published',
  publication: {
    status: 'Research manuscript · preparing for journal submission',
  },
  summary:
    'A hydrazine-mediated route to metal-free olefin ring closure: a new activation platform, useful ring families, and a designed catalytic example.',
  preview: {
    gif: '/media/project-previews/metal-free-rcm-dot-overlay.gif',
    still: '/media/project-previews/metal-free-rcm-source.png',
    width: 1898,
    height: 700,
    alt: 'Metal-free ring-closing olefin metathesis: an aryl diene and bicyclic hydrazine proceed through a pyrazolidinium intermediate to a fused cyclic alkene.',
    pixelated: false,
    overlay: true,
  },
  body: [],
  article: metathesisArticle,
  links: [],
}
