export const mathematicsScenes = [
  {
    id: 'interpolation',
    label: 'Interpolation / Runge → Chebyshev',
    title: ['Mind the', 'edges.'],
    subtitle: 'Same degree. Better-placed points. A calmer curve.',
    description:
      'A pixel study desk shows degree-ten interpolation of the Runge function, first with equally spaced nodes and large edge oscillations, then with Chebyshev-spaced nodes and smaller error.',
    topic: 'Where you sample matters',
    explanation:
      'A curve can pass through every sample and still wander between them. Here, moving the sample points closer to the ends settles much of that wobble.',
  },
  {
    id: 'legendre',
    label: 'Legendre / curves → angular modes',
    title: ['Different curves.', 'Shared order.'],
    subtitle: 'A family of polynomials, with a connection to quantum shapes.',
    description:
      'Legendre polynomials P0 through P5 appear in colored pixel curves. Signed areas of P2 times P3 cancel, followed by a signed polar sketch of P2(cos theta), an m-zero spherical-harmonic angular factor.',
    topic: 'Curves that leave room for one another',
    explanation:
      'These curves have a useful kind of independence: different Legendre polynomials have zero overlap when multiplied and integrated on [-1, 1]. Their angular relatives also turn up in quantum mechanics.',
  },
  {
    id: 'matrices',
    label: 'Matrices / QR → Schur',
    title: ['Same matrix.', 'A new view.'],
    subtitle: 'Change coordinates. Let the structure come into focus.',
    description:
      'Pixel heatmaps show a real matrix factored into Q and R, then successive QR iterations approaching an upper-triangular real Schur form for this example.',
    topic: 'A better way to look at a matrix',
    explanation:
      'QR separates a matrix into an orthogonal part and a triangular part. Repeating the idea can reveal its eigenvalues through a Schur form—without changing the underlying linear map.',
  },
  {
    id: 'algebra',
    label: 'Algebra / symmetry → polynomial ideals',
    title: ['Patterns', 'have rules.'],
    subtitle: 'From a rotating square to equations we can work with.',
    description:
      'A square turns through its rotational symmetries. A separate polynomial-ring example shows a circle intersecting a diagonal line, then a lexicographic Groebner basis describing the same two intersection points.',
    topic: 'From a shape to an algebraic question',
    explanation:
      'Symmetry groups describe moves that preserve a crystal or molecule. Polynomial rings give us another language for patterns; a Gröbner basis can turn a system of polynomial equations into a more manageable one. These are connected interests, not the same structure.',
  },
  {
    id: 'lorenz',
    label: 'Dynamics / the Lorenz butterfly',
    title: ['A few rules.', 'Endless turns.'],
    subtitle:
      'A trajectory winds between two wings, never tracing a simple loop.',
    description:
      'A numerically integrated Lorenz trajectory traces its butterfly in an x-z projection, with a bright moving head and markers at the two nonzero equilibria.',
    topic: 'A butterfly made of motion',
    explanation:
      'Three coupled ordinary differential equations produce this winding trajectory. The two marked equilibria sit inside its wings; the path circles nearby rather than settling into them. It is a small window into dynamics, with roots in a model of convection.',
  },
  {
    id: 'fourier',
    label: 'Fourier / signal → spectrum → waves',
    title: ['A signal,', 'unfolded.'],
    subtitle: 'Hidden rhythms become peaks. The same idea reaches the lab.',
    description:
      'A synthetic decaying NMR-like signal is drawn in time, its FFT reveals three frequency peaks, the damped cosine components are shown separately, and an inverse FFT reconstructs the signal.',
    topic: 'What is hiding inside a signal?',
    explanation:
      'A Fourier transform trades a tangled signal for its frequency ingredients; the FFT is a fast way to compute the discrete version. NMR uses this idea to turn a free-induction decay into a spectrum. FTIR starts with an interferogram instead. This sketch uses a made-up signal, not experimental data.',
  },
].map((scene) => ({
  ...scene,
  gif: `/art/mathematics/v1/${scene.id}.gif`,
  still: `/art/mathematics/v1/${scene.id}.png`,
  mobileGif: `/art/mathematics/v1/${scene.id}-mobile.gif`,
  mobileStill: `/art/mathematics/v1/${scene.id}-mobile.png`,
  study: `/art/mathematics/v1/${scene.id}-study.png`,
}))
export type MathematicsScene = (typeof mathematicsScenes)[number]
