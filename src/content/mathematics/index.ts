import { interpolationArticle } from './interpolation.ts'
import { legendreArticle } from './legendre.ts'
import { matricesArticle } from './matrices.ts'
import { symmetryArticle } from './symmetry.ts'
import { dynamicsArticle } from './dynamics.ts'
import { fourierArticle } from './fourier.ts'
export const mathTopics = [
  {
    slug: 'mind-the-edges',
    sceneId: 'interpolation',
    title: 'Mind the edges',
    summary:
      'From Runge’s phenomenon to a question about designing better experiments: where should the next point go?',
    article: interpolationArticle,
  },
  {
    slug: 'a-family-of-curves',
    sceneId: 'legendre',
    title: 'A family of curves',
    summary:
      'Orthogonal polynomials, angular modes, and the assumptions behind the quantum pictures we draw.',
    article: legendreArticle,
  },
  {
    slug: 'same-matrix-new-view',
    sceneId: 'matrices',
    title: 'Same matrix, a new view',
    summary:
      'Factorization, low-rank approximation, and why choosing what to compute matters for data and molecules.',
    article: matricesArticle,
  },
  {
    slug: 'patterns-into-rules',
    sceneId: 'algebra',
    title: 'Patterns into rules',
    summary:
      'Symmetry becomes algebra, then leads into crystal patterns, molecular handedness, and chiral amplification.',
    article: symmetryArticle,
  },
  {
    slug: 'a-butterfly-made-of-motion',
    sceneId: 'lorenz',
    title: 'A butterfly made of motion',
    summary:
      'From an apple’s fall to chaotic forecasts—and a featured connection between feedback and biological handedness.',
    article: dynamicsArticle,
  },
  {
    slug: 'a-signal-unfolded',
    sceneId: 'fourier',
    title: 'A signal, unfolded',
    summary:
      'Roots of unity, fast transforms, NMR and FTIR: what a spectrum reveals, and what more scans actually change.',
    article: fourierArticle,
  },
]
