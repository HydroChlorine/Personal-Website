import type { ProjectArticle } from '../types'
import { mathFigure } from './figure.ts'
import { mathSources as s } from './sources.ts'
const fig = (
  name: string,
  alt: string,
  caption: string,
  height = 600,
  mobileHeight = 1000,
) => mathFigure(name, alt, caption, height, mobileHeight)
export const symmetryArticle: ProjectArticle = {
  kind: 'topic',
  kicker: 'From a familiar shape to rules we can calculate with',
  reviewed: '2026-11-09',
  introduction: [
    'Turn a square by a quarter-turn. It still occupies the same outline. Turn it again, or reflect it, and something interesting happens: we can stop tracking every corner through space and start calculating with the moves themselves.',
    'That is a useful way into algebra. We choose definitions that capture a structure we care about, then see how far their rules can take us. Symmetry is one particularly visible meeting point between abstract operations, crystals, and molecules. The mathematical language can travel much further than the first shape that suggested it.',
    'This story follows that connection into handedness and reaction geometry. The pictures are idealized constructions, not crystal measurements or predictions of a reaction mechanism. The final question—how a small handed preference becomes a larger one—continues in the dynamics article.',
  ],
  sections: [
    {
      id: 'moves',
      title: '01 / Let the moves become the objects',
      paragraphs: [
        'The symmetries of an object are operations that leave the whole object indistinguishable from where it started. For a square, quarter-turns and certain reflections qualify. A random thirty-degree turn does not. Composition means doing one allowed operation after another.',
        'These operations form a group: they are closed under composition, composition is associative, there is an identity move, and every move has an inverse. Those rules capture the bookkeeping without requiring us to redraw the square each time.',
        'A colored corner in the animation is a tracking marker. It lets us see where a move sends a vertex; it is not a chemically distinct atom that the symmetry is permitted to swap with a different species. Real molecular symmetry must preserve atom identities as well as positions.',
      ],
      equations: [
        {
          label:
            'A quarter-turn R and a reflection M generate the square group',
          expression: 'R⁴=I,   M²=I,   MRM=R⁻¹\nD₄ = {I,R,R²,R³,M,MR,MR²,MR³}',
        },
      ],
      figure: fig(
        'd4-actions',
        'A square and a tracked vertex undergo rotations and reflections while a composition table highlights the resulting operation.',
        'Eight moves, one composition rule. The marker distinguishes operations for the viewer; the underlying square has identical vertices.',
      ),
      detailParagraphs: [
        'With column vectors, AB means apply B first, then A. Rotations of a planar square commute with each other, but a rotation and a reflection generally do not. The notation D₄ here means the order-eight symmetry group of a square; some texts call it D₈.',
      ],
      sources: [s.symmetry],
    },
    {
      id: 'elements',
      title: '02 / An axis is not the same thing as a move',
      paragraphs: [
        'A symmetry element is the geometric place associated with an operation: an axis, a plane, or a center. The operation is what we do about or through it. A Cₙ axis permits a rotation by 360°/n. In molecular point-group notation, σ denotes a mirror plane, while i denotes inversion through a center.',
        'Choose coordinates and these moves become matrices. A rotation around z mixes x and y while preserving z. A reflection across the xy plane reverses z. Inversion reverses all three coordinates. Matrix multiplication then composes the geometric moves.',
        'This is a representation of the group: composition of operations is carried into multiplication of matrices. A faithful representation keeps distinct operations distinct. The point is not just that a computer can store the matrices; algebraic identities now express real equivalences between sequences of moves.',
      ],
      equations: [
        {
          label: 'Three operations in three-dimensional coordinates',
          expression:
            'C₂(z)=diag(−1,−1,1)\nσ(xy)=diag(1,1,−1),   i=−I\nC₂(z) σ(xy)=i',
        },
      ],
      figure: fig(
        'symmetry-elements',
        'A labeled point is transformed by a two-fold rotation, a mirror-plane reflection, and inversion; the coordinate sign changes are displayed.',
        'Cₙ is an axis label; σ is a plane, and i is a center. Endpoints show the named operations; intermediate frames only illustrate the mapping.',
        600,
        1300,
      ),
      sources: [s.elements, s.symmetry],
    },
    {
      id: 'crystals',
      title: '03 / A crystal adds translations',
      paragraphs: [
        'An isolated molecule can have a point group: its symmetry operations leave at least one point fixed. A repeating crystal pattern also has translations. A motif is carried from one unit cell to another, and rotations or reflections can be combined with translations.',
        'An affine operation writes this as x′=Rx+t. Compose two such operations and both the matrix and translation have to be updated. Space groups organize this richer structure; screw axes and glide planes are examples that do not occur as ordinary point-group operations of a finite molecule.',
        'The figure uses a two-dimensional square lattice so the bookkeeping stays visible. It is not a particular crystal structure. The same idea, with actual lattice vectors and atom positions, is what makes symmetry so useful in crystallography.',
      ],
      equations: [
        {
          label: 'Translations participate in composition',
          expression: '(R₁,t₁) ∘ (R₂,t₂)\n= (R₁R₂, R₁t₂+t₁)',
        },
      ],
      figure: fig(
        'crystal-tiles',
        'An identical motif translates across a square lattice while an affine matrix-and-translation composition is illustrated.',
        'A toy periodic pattern. A lattice, its motif, and the allowed operations together determine the symmetry—not the grid alone.',
      ),
      sources: [s.symmetry],
    },
    {
      id: 'invariants',
      title: '04 / What stays unchanged can have an algebra too',
      paragraphs: [
        'Instead of asking where a point moves, ask which quantities keep the same value. A square rotation or reflection preserves x²+y². It also preserves x²y². These are examples of invariant polynomials.',
        'If two polynomials are invariant under the same group, their sum and product are invariant too. That closure gives us a ring of invariant polynomials. The group describes moves; the ring describes algebraic quantities unchanged by those moves. They are related structures with different jobs.',
        'Polynomial equations can impose constraints as well. Ideals and Gröbner bases help reorganize such constraints for elimination or solving. They do not automatically tell us the energy of a molecule or whether a proposed reaction happens. A useful representation needs a physical model to connect its symbols to those questions.',
      ],
      figure: fig(
        'polynomial-invariants',
        'A point moves through square symmetries while its coordinates change and the values of x squared plus y squared and x squared times y squared remain constant.',
        'The coordinates move; the displayed invariants do not. This is a concrete bridge from a symmetry group to a polynomial ring.',
      ),
      sources: [s.symmetry],
    },
    {
      id: 'handedness',
      title: '05 / Handedness survives a proper rotation',
      paragraphs: [
        'A rigid chiral object cannot be superimposed on its mirror image using translations and proper rotations alone. For a rigid molecular geometry, the absence of every improper rotation is the relevant symmetry criterion; lacking one obvious mirror plane is not, by itself, a complete test.',
        'For four distinct labeled points, a signed tetrahedral volume is a useful orientation measure. A proper rotation preserves its sign. A reflection reverses it. The determinant gives us a compact algebraic way to see why turning a model in our hands does not turn one enantiomer into the other.',
        'R and S add a chemical naming rule: the CIP sequence rules rank the substituents, then assign a descriptor to the resulting arrangement. The determinant sign in our arbitrary labeling is not itself an R/S assignment. Nor are R/S interchangeable with D/L or with the sign of optical rotation.',
      ],
      equations: [
        {
          label: 'Orientation of a labeled tetrahedron',
          expression:
            'χ = det[a−d, b−d, c−d]\nχ′ = det(Q) χ\ndet(Q)=+1: proper rotation;   det(Q)=−1: orientation reversal',
        },
      ],
      figure: fig(
        'orientation',
        'A tetrahedron with four differently labeled vertices is rotated and mirrored; the computed signed volume is preserved by rotation and reversed by reflection.',
        'Labels are fixed when computing the sign. This is an orientation test, not an unranked shortcut for assigning R or S.',
      ),
      detailParagraphs: [
        'For a centered rigid point object, proper and improper orthogonal operations have determinants +1 and −1 respectively. Inversion in three dimensions is improper. Molecular chirality also includes axial, planar, and other cases without a tetrahedral stereocenter; a single signed tetrahedron is only our introductory example. Flexible conformations and racemization require more than one frozen geometry.',
      ],
      sources: [s.chirality, s.stereochemistry],
    },
    {
      id: 'sn2',
      title:
        '06 / A reaction can change orientation—but it is not just a rotation',
      paragraphs: [
        'An idealized stereospecific SN2 substitution at a tetrahedral carbon is a familiar example of inversion of configuration. The three spectator substituents change their umbrella-like orientation as the entering nucleophile replaces the leaving group.',
        'We can track that geometry with coordinates and an orientation sign. But the molecular graph changes too: a bond forms and another breaks. A geometric transformation is a useful description of the before-and-after relationship; it is not a complete dynamical law or a proof that the reaction pathway is favorable.',
        'An R label also need not simply become S when a reaction inverts geometry. Replacing a substituent can change the CIP ordering, so the descriptor must be reassigned. This is where an algebraic representation becomes interesting: it can enforce consistency, while chemical rules and energetics supply the missing physical content.',
      ],
      figure: fig(
        'sn2-inversion',
        'A nucleophile approaches vertically from below and a leaving group departs above, while three spectator bonds reverse their umbrella orientation along that same vertical axis.',
        'A geometric cartoon of an ideal SN2 inversion. No transition-state energy, actual bond lengths, or reaction-rate prediction is implied.',
      ),
      sources: [s.sn2, s.stereochemistry],
    },
    {
      id: 'amplification',
      title: '07 / A small preference can become a larger one',
      paragraphs: [
        'A different symmetry question concerns populations. If a catalyst mixture has a small excess of one enantiomer, must the product have exactly that excess? No. Competing active and inactive catalyst assemblies can make the relationship nonlinear.',
        'Our model supposes that like-handed pairs are active and mixed-handed pairs are inactive. If the active populations scale as the squares of the two catalyst fractions, a modest input excess gives a larger product excess. That is an illustrative mechanism, not a fit to a particular experiment; other mechanisms can give different curves, including negative nonlinear effects.',
        'The 2026 Chemistry Nobel was shared by Henri B. Kagan and Kensō Soai for nonlinear effects and autocatalysis in asymmetric synthesis. Kagan’s work made the nonlinear catalyst–product relationship vivid; Soai’s work showed asymmetric autocatalysis with amplification. These findings make a strong bridge to dynamics.',
        'Symmetry permits two mirror-related outcomes; kinetics can determine whether a small bias grows or shrinks. That is the question to carry into the butterfly story. It does not, by itself, establish how biological handedness originally arose.',
      ],
      equations: [
        {
          label: 'One deliberately simple active-pair model',
          expression:
            'ee=(L−D)/(L+D)\nee_out=(L²−D²)/(L²+D²)\n       =2 ee_in/(1+ee_in²)',
        },
      ],
      figure: fig(
        'nonlinear-ee',
        'A toy catalyst-pair model distinguishes like-handed active pairs from mixed inactive pairs and plots product excess against catalyst excess.',
        'An original model curve, not Kagan’s measured data. The diagonal is a linear-response reference.',
      ),
      aside: {
        title: 'The next question is dynamical',
        text: 'What kind of feedback could magnify a tiny imbalance, while leaving two mirror-related outcomes equally possible in the underlying equations? In the dynamics article we can make that question precise with a toy model—and keep its biological interpretation separate.',
      },
      sources: [s.kagan, s.soai, s.nobel2026],
    },
  ],
}
