import type { ProjectArticle } from '../types'
import { mathFigure as fig } from './figure.ts'
import { mathSources as s } from './sources.ts'
export const legendreArticle: ProjectArticle = {
  kind: 'topic',
  kicker: 'Why these curves keep appearing in physics',
  reviewed: '2026-11-08',
  introduction: [
    'The first few Legendre polynomials look almost like a collection of increasingly elaborate doodles. One is flat, one is a line, the next bends into a bowl. Why would this particular family have anything to do with quantum mechanics?',
    'The connection is not that someone chose attractive curves to decorate a theory. Geometry, boundary conditions, and a useful notion of independence lead us to special functions. Once we recognize the structure, the same tools become useful in approximation, classical fields, and quantum angular momentum.',
    'This is a walk from curves to quantum shapes, with a pause at the end to ask which parts come from the mathematical language and which parts are physical assumptions. The figures are calculated illustrations, not measured electron clouds.',
  ],
  sections: [
    {
      id: 'family',
      title: '01 / Start with a family, not six unrelated formulas',
      paragraphs: [
        'Legendre polynomials begin with P₀(x)=1 and P₁(x)=x. A recurrence generates the rest. Their degrees increase one at a time, and a conventional normalization makes every Pₗ(1)=1. That is why the curves meet at the right-hand endpoint of the banner.',
        'The first few already tell a story. Even-degree members are even functions; odd-degree members are odd. As the degree grows, more zeros and sign changes fit into the same interval. They give us progressively finer patterns without abandoning the same basic rules.',
      ],
      equations: [
        {
          label: 'A recurrence instead of a long table',
          expression:
            'P₀(x)=1,   P₁(x)=x\n(ℓ+1)Pℓ₊₁(x) = (2ℓ+1)xPℓ(x) − ℓPℓ₋₁(x)',
        },
      ],
      figure: fig(
        'legendre-family',
        'The first six Legendre polynomials are revealed in order on the interval minus one to one, with labels identifying their degree.',
        'Different shapes, one recurrence. The interval and the normalization are part of the definition.',
      ),
      sources: [s.legendre],
    },
    {
      id: 'orthogonality',
      title: '02 / Independence can mean an integral',
      paragraphs: [
        'For ordinary vectors, perpendicular directions have zero dot product. For functions, we can define a related overlap by multiplying the functions and integrating. Legendre polynomials of different degrees have zero overlap on [-1,1] with uniform weight.',
        'Zero overlap does not mean they never cross or never share a nonzero value. Their positive and negative contributions cancel over the whole interval. The product P₁P₃ makes that visible: it has both signs, even though neither factor is zero almost everywhere.',
        'The word “orthogonal” depends on the inner product. Change the interval or the weighting of its regions, and a family that was orthogonal may stop being so. Other familiar polynomial families are adapted to different domains and weights.',
      ],
      equations: [
        {
          label: 'The function-space version of a dot product',
          expression:
            '⟨f,g⟩ = ∫₋₁¹ f(x)g(x) dx\n⟨Pₘ,Pₙ⟩ = 0 for m≠n;   ⟨Pₙ,Pₙ⟩ = 2/(2n+1)',
        },
      ],
      figure: fig(
        'orthogonality',
        'The product of P1 and P3 is shaded by sign beside the normalized Legendre Gram matrix, whose off-diagonal entries are zero.',
        'The colored areas cancel. In the matrix, each entry is an overlap integral; normalizing the functions makes the diagonal equal to one.',
      ),
      detailParagraphs: [
        'For complex functions the inner product conjugates the first factor: ⟨f,g⟩=∫f*(x)g(x)w(x)dx. For the real Legendre family w=1. A normalized member is φₙ=√((2n+1)/2)Pₙ. Orthogonality is not the same as statistical independence; it is a property of these vectors in a chosen function space.',
      ],
      sources: [s.orthogonal],
    },
    {
      id: 'expansion',
      title: '03 / Use the curves as coordinates',
      paragraphs: [
        'Once a family is orthogonal, we can use it to describe other functions. Instead of saying “move three units along x and two along y,” we give a coefficient for each curve. The coefficients say how much of each pattern is present.',
        'In the figure, the target is exp(x). Adding a few Legendre terms reconstructs it progressively. Each coefficient comes from a projection integral, not from forcing the approximation through chosen sample points. This is a different task from the interpolation story.',
        'Keeping finitely many terms gives an approximation. In the matching squared-integral norm, orthogonal projection is the best approximation within that finite span. That does not automatically make it best at every individual point, and finite truncations can behave differently near abrupt features.',
      ],
      equations: [
        {
          label: 'Coordinates in an orthogonal basis',
          expression: 'f(x) ≈ Σₙ₌₀ᴺ aₙPₙ(x)\naₙ = (2n+1)/2 · ∫₋₁¹ f(x)Pₙ(x) dx',
        },
      ],
      figure: fig(
        'projection',
        'A calculated Legendre expansion of exp(x) gains terms while the coefficient bars identify the retained modes.',
        'Projection adds independent patterns. Coefficients here are computed by numerical quadrature; the target is known exactly for comparison.',
      ),
      sources: [s.orthogonal],
    },
    {
      id: 'geometry',
      title: '04 / Geometry asks for particular modes',
      paragraphs: [
        'A stretched string with fixed ends cannot vibrate in just any shape. Its boundary conditions select a family of standing-wave patterns. This is a classical analogy, but it is a useful introduction to an eigenfunction: a shape that a differential operator acts on without mixing it into an entirely different shape.',
        'For spherical geometry, separating variables in equations such as Laplace’s equation leads to an angular equation related to the Legendre operator. Regularity at the poles selects the familiar polynomial solutions for the axisymmetric case. The allowed eigenvalues are ℓ(ℓ+1).',
        'This is why special functions recur across different subjects. Similar geometry and compatible operators can select the same mathematical patterns even when the physical interpretations are very different. A vibrating string is not a derivation of the quantum postulates; it is an example of the shared mathematics of modes.',
      ],
      equations: [
        {
          label: 'The Legendre eigenvalue equation',
          expression: '− d/dx [(1−x²) dPℓ/dx] = ℓ(ℓ+1)Pℓ',
        },
      ],
      figure: fig(
        'boundary-modes',
        'The first three fixed-end string modes vibrate with zero displacement at both ends, illustrating how boundary conditions select patterns.',
        'A classical mode analogy. The endpoints constrain the possible patterns; the quantum interpretation requires additional physical postulates.',
        520,
        1000,
      ),
      detailParagraphs: [
        'The Legendre problem is a Sturm–Liouville problem with weight 1. Boundary behavior makes the differential operator symmetric on the appropriate domain. For distinct eigenvalues, symmetry leads to orthogonality: (λₘ−λₙ)⟨Pₘ,Pₙ⟩=0. Endpoint regularity and the operator domain matter; an integration-by-parts slogan alone is not a complete spectral theorem.',
      ],
      sources: [s.spherical],
    },
    {
      id: 'angular',
      title: '05 / From Legendre curves to quantum angular shapes',
      paragraphs: [
        'For a particle in a spherically symmetric potential, angular momentum provides a natural way to organize states. The angular functions are spherical harmonics. The m=0 members are proportional to Pℓ(cos θ); the general family also uses associated Legendre functions and azimuthal dependence.',
        'In the hydrogenic problem, the full spatial wavefunction also contains a radial factor. An angular sketch alone cannot tell us the radial size or all the features of an atomic orbital. And the colored lobes represent signs or phases of amplitude, not differently charged pieces of an electron.',
        'Probabilities come from squared magnitudes. The distinction matters because amplitudes can interfere: opposite signs can cancel in a superposition even though probabilities themselves are nonnegative. Changing basis changes the description of a state, not the physical state we are describing.',
      ],
      equations: [
        {
          label: 'The axisymmetric member, and the missing radial part',
          expression:
            'Yℓ⁰(θ,φ) = √((2ℓ+1)/(4π)) Pℓ(cos θ)\nψ(r,θ,φ) = R(r)Yℓᵐ(θ,φ)\nL²Yℓᵐ = ℏ²ℓ(ℓ+1)Yℓᵐ',
        },
      ],
      figure: fig(
        'angular-modes',
        'Signed polar sketches of P0, P1 and P2 of cosine theta are paired with nonnegative squared angular magnitudes.',
        'Two-dimensional polar sketches of angular factors: radius encodes amplitude magnitude above and squared magnitude below. These are not full three-dimensional orbital isosurfaces or electron trajectories.',
        650,
        1300,
      ),
      figures: [
        fig(
          'born',
          'A normalized two-state amplitude changes continuously while two probability bars show the corresponding squared magnitudes and always sum to one.',
          'A separate two-state illustration of the Born rule. We vary the prepared state; these are predicted outcome probabilities, not a particle splitting into two little pieces.',
        ),
      ],
      sources: [s.spherical, s.quantum],
    },
    {
      id: 'assumptions',
      title: '06 / What the mathematics assumes—and what the calculation adds',
      paragraphs: [
        'The mathematical machinery does not choose the physical rules by itself. In the standard quantum framework, states are represented in a complex Hilbert space, observables are represented by suitable operators, and the Born rule connects the state to measurement probabilities. A closed system evolves unitarily. Those are physical commitments, tested through their predictions, rather than consequences of choosing Legendre polynomials.',
        'Then come assumptions for a particular problem. A nonrelativistic Schrödinger model has a domain where relativistic effects need separate treatment. An isolated-system description may leave out coupling to an environment. A central potential may be a useful idealization for an atom and a poor symmetry model for a general molecule.',
        'A practical chemistry calculation adds further layers: separating electronic and nuclear motion through a Born–Oppenheimer approximation, choosing an electronic-structure model, limiting a basis, and stopping an iterative solver at a tolerance. These choices have different error sources. Improving the solver tolerance cannot repair a poor physical model.',
        'There are also foundational questions about how to interpret quantum states and measurement. I find them interesting, but they should not be confused with a numerical truncation error or presented as evidence that a successful theory has simply failed. A finite basis, an approximate density functional, and a question about measurement are three different conversations.',
      ],
      figure: fig(
        'quantum-layers',
        'Four layers distinguish the quantum framework, a physical model for a system, a finite representation, and a numerical solution.',
        'Ask which layer a proposed limitation belongs to. Measurement uncertainty is not the same thing as an unconverged calculation.',
        520,
        1100,
      ),
      aside: {
        title: 'The question I want to keep asking',
        text: 'When a calculation and an experiment disagree, which assumption is responsible? The answer might be the physical model, missing environmental effects, an approximation, numerical error, or the measurement itself. Calling all of them “a limitation of quantum mechanics” would hide the useful question.',
      },
      sources: [s.quantum, s.dft, s.qe],
    },
    {
      id: 'connections',
      title: '07 / The same tools, several different jobs',
      paragraphs: [
        'For approximation, orthogonal functions are a way to represent a target compactly. For a differential equation, eigenfunctions can separate a complicated field into modes. In quantum mechanics, the Hilbert-space structure also participates in a physical theory of states, observables, and probabilities.',
        'Angular functions help organize atomic states and the angular structure of basis functions used in electronic-structure calculations. The same spherical harmonics also organize classical multipole fields. Seeing the same functions in both places is a clue about geometry, not evidence that a classical field and a quantum state mean the same thing.',
        'That is the part I like: the curves are not an isolated table to memorize. They are one visible example of a larger habit—choose a representation that respects the geometry and the operator, then ask what its coefficients actually mean. The meaning changes with the problem; the mathematical structure helps us make the change carefully.',
      ],
    },
  ],
}
