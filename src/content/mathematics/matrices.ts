import type { ProjectArticle } from '../types'
import { mathFigure as fig } from './figure.ts'
import { mathSources as s } from './sources.ts'
export const matricesArticle: ProjectArticle = {
  kind: 'topic',
  kicker: 'Change coordinates. Reuse the work. Approximate with a purpose.',
  reviewed: '2026-11-08',
  introduction: [
    'A matrix can stand for a stack of measurements, a discretized physical operator, or the local behavior of an optimization problem. Writing it down is often easy. Computing with it repeatedly is where the bill arrives.',
    'There are two different ways to make that bill smaller. We can reorganize an essentially exact computation so useful work is reused, or deliberately replace the problem with a smaller approximation. Factorization is often the bridge between the two, but it is important to know which step actually discards information.',
    'This article assumes some linear algebra: vectors, matrix multiplication, and eigenvalues. The examples are synthetic and the work counts are scaling illustrations, not timing benchmarks or reported quantum-chemistry results.',
  ],
  sections: [
    {
      id: 'cost',
      title: '01 / Large changes what “just compute it” means',
      paragraphs: [
        'For a dense n×n matrix, storage grows like n². Standard direct factorizations typically require work of order n³. Doubling n means roughly four times the storage and eight times the leading arithmetic—not necessarily eight times the wall-clock time, since hardware and memory behavior also matter.',
        'Precision is only part of the cost. A well-conditioned small problem can be inexpensive at high accuracy, while a huge sparse problem can be expensive even at modest tolerance. Sparsity, conditioning, available matrix-vector products, and the requested output all change which method makes sense.',
        '“Exact” is also shorthand here. Floating-point factorizations introduce rounding error. Stable algorithms control that error; they do not produce infinitely precise arithmetic. We should distinguish rounding, iterative convergence, model approximation, and deliberate rank truncation.',
      ],
      figure: fig(
        'matrix-cost',
        'Matrix tiles demonstrate quadratic storage growth while labeled bars demonstrate cubic leading operation growth as the dimension doubles.',
        'Relative dense-problem scaling: n, 2n, 4n. These bars count asymptotic work, not seconds on a particular computer.',
        520,
        1000,
      ),
    },
    {
      id: 'factor',
      title: '02 / Factor once, answer many questions',
      paragraphs: [
        'Suppose A stays fixed while the right-hand side b changes. Solving Ax=b from scratch every time repeats much of the same work. A factorization rearranges the map into pieces that are easier to apply or solve with.',
        'For a square nonsingular matrix, A=QR gives an orthogonal Q and upper-triangular R. Multiply the equation by Qᵀ, then solve Rx=Qᵀb by back substitution. The expensive factorization is paid once; each additional dense right-hand side is usually handled with order-n² work. In a rectangular full-column-rank problem, QR is also a standard route to least squares.',
        'This is a new representation of the same problem, not a low-rank approximation. We can keep every direction. We also usually solve systems directly instead of forming A⁻¹: the explicit inverse is often unnecessary work and storage.',
      ],
      equations: [
        {
          label: 'An orthogonal change followed by a triangular solve',
          expression: 'A = QR,   QᵀQ = I\nAx=b  →  Rx=Qᵀb',
        },
      ],
      figure: fig(
        'factor-once',
        'A computed QR factorization is reused to solve the same three-by-three matrix against several right-hand sides, with a residual check.',
        'Same A, different b. The diagram uses actual QR factors and solutions; factorization changes the route, not the answer.',
      ),
      detailParagraphs: [
        'For least squares, forming normal equations AᵀAx=Aᵀb squares the 2-norm condition number of a full-column-rank A. QR avoids that particular loss of conditioning. It does not make a fundamentally ill-conditioned inverse problem well-conditioned. Regularization is a separate modeling or estimation decision.',
      ],
      sources: [s.qr],
    },
    {
      id: 'schur',
      title: '03 / Let eigenvalue structure emerge',
      paragraphs: [
        'QR also appears in eigenvalue algorithms. Starting with Aₖ=QₖRₖ, form Aₖ₊₁=RₖQₖ. Because this is an orthogonal similarity transformation, the eigenvalues are preserved. Repeated steps can expose a Schur form.',
        'For a real matrix, real Schur form is upper quasi-triangular: one-by-one blocks for real eigenvalues and possible two-by-two blocks for complex-conjugate pairs. Our small example has three real eigenvalues, so its endpoint is triangular. Production algorithms use reductions, shifts, and deflation; the simple unshifted loop is here to show the idea, not to compete with LAPACK.',
        'Why not always diagonalize? Some matrices do not have a full set of eigenvectors, and an eigenvector basis can be badly conditioned. Orthogonal Schur coordinates are often a more reliable general tool. For a real symmetric matrix, we have the especially useful orthogonal eigendecomposition.',
      ],
      equations: [
        {
          label: 'The same eigenvalues in changing coordinates',
          expression: 'Aₖ₊₁ = QₖᵀAₖQₖ = RₖQₖ\nA = ZTZᵀ,   ZᵀZ=I',
        },
      ],
      figure: fig(
        'schur-steps',
        'Successive computed QR iterations reduce a nonsymmetric three-by-three matrix toward triangular Schur form while a lower-triangle norm decreases.',
        'No rank is removed. The invariant is the similarity relation; the disappearing lower entries reveal structure rather than erase eigenvalues.',
      ),
      sources: [s.schur],
    },
    {
      id: 'rank',
      title: '04 / Keep the directions that matter—for this task',
      paragraphs: [
        'Now we deliberately approximate. The singular value decomposition writes A=UΣVᵀ. Each singular value measures the strength of a paired input-output direction. If the values decay quickly, keeping only the first k can capture much of the matrix using far fewer numbers.',
        'For an arbitrary matrix, singular directions are the safer starting point than “the largest eigenvalues.” For a symmetric positive-semidefinite covariance matrix, the two stories align. For a nonsymmetric matrix, eigenvalue size alone does not rank the importance of its action.',
        'Truncated SVD is the best rank-k approximation in the spectral and Frobenius norms. The first omitted singular value gives its spectral-norm error; the squared discarded singular values add up to its squared Frobenius error. That makes the tradeoff inspectable rather than purely visual.',
        'But the norm must match the purpose. A small component could encode a rare event, a weak chemical signal, or a direction that matters to a downstream prediction. Keeping most of the variance is not a guarantee that every scientifically important feature survived.',
      ],
      equations: [
        {
          label: 'A controlled loss of information',
          expression:
            'Aₖ = Σᵢ₌₁ᵏ σᵢuᵢvᵢᵀ\n‖A−Aₖ‖₂ = σₖ₊₁\n‖A−Aₖ‖F² = Σᵢ₌ₖ₊₁ʳ σᵢ²',
        },
      ],
      figure: fig(
        'low-rank',
        'A synthetic measurement matrix, its rank-k SVD reconstruction, and its singular-value spectrum change together as k increases.',
        'Every reconstruction and error label is calculated from the same matrix. Structured variation dominates this made-up dataset; real data may have a much less convenient spectrum.',
        520,
        1000,
      ),
      sources: [s.svd],
      detailParagraphs: [
        'Here A is real m×n, the singular values are ordered σ₁≥σ₂≥…≥0, and r=min(m,n). Complex matrices use conjugate transposes. Singular values measure directional amplification in the Euclidean norm; their importance to a physical observable is a separate question.',
      ],
    },
    {
      id: 'scale',
      title: '05 / Sometimes we should not compute the whole factorization',
      paragraphs: [
        'A full SVD can itself be expensive. If we only need a small subspace, iterative or randomized methods can aim at that subspace directly. Krylov methods build information through repeated matrix-vector products; sparse problems may allow those products without storing a dense matrix.',
        'A randomized sketch starts with a small test matrix Ω. Multiplying Y=AΩ samples a set of output directions. Orthogonalize them to get Q, then work on the smaller B=QᵀA. An SVD of B can be lifted back to an approximate factorization of A. Oversampling and, when appropriate, power iterations improve the capture of a useful subspace.',
        'This is useful in machine learning and experimental-data analysis: reduce a measurement matrix, obtain a compact embedding, or repeatedly apply an approximate operator. It helps when the effective rank is small enough and the cost of reading the data or applying A makes the sketch worthwhile. A slowly decaying spectrum or a requirement for tiny errors can erase the advantage.',
        'Approximation is something to verify. Check a residual on additional test directions, assess downstream predictions, and use held-out data where the task calls for it. A fast picture of a matrix is not automatically a trustworthy scientific conclusion.',
      ],
      equations: [
        {
          label: 'A smaller problem built from sampled directions',
          expression: 'Y=AΩ  →  Q=orth(Y)\nB=QᵀA  →  B≈ŨΣVᵀ\nA≈(QŨ)ΣVᵀ',
        },
      ],
      figure: fig(
        'random-sketch',
        'A synthetic twenty-four by thirty-two matrix is multiplied by a thirty-two by eight random test matrix; QR produces an eight-dimensional basis and a reduced eight by thirty-two matrix.',
        'A calculated sketch with a fixed seed. The final rank-four approximation is built from the small SVD, not by pretending the large matrix has disappeared.',
        520,
        1100,
      ),
      sources: [s.randomized],
    },
    {
      id: 'electrons',
      title: '06 / Back to molecules: a cheaper start, then a careful finish',
      paragraphs: [
        'Electronic-structure calculations make the cost question concrete. At fixed nuclear geometry, many common Kohn–Sham DFT methods solve a self-consistent sequence of discretized electronic problems. Relaxing a geometry repeats electronic work as the nuclei move. The expense depends on the representation, system size, solver, and accuracy goals.',
        'This is not a task where we simply keep the largest few eigenvalues. Occupied low-energy states matter, along with enough additional states for the physical problem. Nonorthogonal bases can produce generalized eigenproblems. Iterative eigensolvers, suitable preconditioners, sparsity, and reuse of a previous electronic guess can be more relevant than a generic truncated data-matrix SVD.',
        'There is another practical idea: use a less expensive model or looser numerical settings to obtain a reasonable starting geometry, then refine and verify with the chosen final method. A classical force field or semiempirical method may be helpful when appropriate for the chemistry; a smaller basis or other carefully chosen settings can also reduce intermediate cost. The handoff needs care because two models can prefer different structures.',
        'Our animation uses two toy energy surfaces to illustrate that handoff. It is not a DFT calculation, and it does not claim a speedup. A cheap model can point toward the wrong basin; a loose calculation can give unreliable forces. Final energies and gradients need convergence checks at the intended level, and competing conformers may still need examination.',
      ],
      figure: fig(
        'preopt',
        'A path descends a cheap quadratic toy energy surface, then its endpoint initializes descent on a different target surface with a shifted minimum.',
        'Warm starts can be useful, but the target model gets the final say. These are analytic toy surfaces, not molecular energies, measured performance, or a proof that two methods share a minimum.',
        520,
        1000,
      ),
      detailParagraphs: [
        'The Kohn–Sham framework is not equivalent to low-rank compression of a measurement matrix. Practical density functionals approximate exchange-correlation effects; basis, pseudopotential, discretization, SCF, eigensolver, and geometry errors are separate choices. A small linear-algebra residual need not imply a chemically accurate energy difference. Preconditioning aims to make a solve converge faster while preserving its target; changing the electronic model changes that target.',
      ],
      sources: [s.dft, s.qe],
    },
    {
      id: 'enough',
      title: '07 / Decide what “good enough” must preserve',
      paragraphs: [
        'The question is not always “can I calculate every entry more precisely?” It might be “can I reuse this factorization?”, “which observable needs accuracy?”, or “is there a smaller representation that preserves the answer I care about?”',
        'A good computation has an explicit bargain. We identify the expensive step, choose a representation or approximation for a reason, and measure the error in something relevant. That habit connects a small least-squares fit, a large machine-learning dataset, and a molecular calculation—even though the algorithms and the acceptable errors can be very different.',
      ],
      aside: {
        title: 'Three questions before taking a shortcut',
        text: 'What structure am I using? What information or accuracy am I giving up? What independent check would reveal that the shortcut changed the conclusion?',
      },
    },
  ],
}
