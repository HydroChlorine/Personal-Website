import { interpolationArticle } from './interpolation.ts'
import { legendreArticle } from './legendre.ts'
import { matricesArticle } from './matrices.ts'
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
]
