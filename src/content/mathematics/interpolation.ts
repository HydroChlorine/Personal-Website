import type { ProjectArticle } from '../types'
import { mathFigure as fig } from './figure.ts'
import { mathSources as s } from './sources.ts'
export const interpolationArticle: ProjectArticle = {
  kind: 'topic',
  kicker: 'From a wobbly curve to a better next experiment',
  reviewed: '2026-11-08',
  introduction: [
    'Suppose every experiment gave us one pin on an invisible landscape. Temperature points in one direction, time in another, concentration in a third. The height might be a yield, a signal, a material property, or anything else we can measure. How much of that landscape could we learn without visiting every possible point?',
    'That question has been in the back of my mind for a while. A surprisingly good place to start is a much smaller puzzle: drawing one smooth curve through a handful of points. Even there, more data and a more complicated polynomial do not automatically give a better picture.',
    'The pictures below use synthetic functions so we can see the hidden answer. In a real experiment, that answer is exactly what we do not have. The interesting part is deciding what to measure next.',
  ],
  sections: [
    {
      id: 'runge',
      title: '01 / A curve can hit every point and still miss the story',
      paragraphs: [
        'Interpolation asks for a function that matches the observed values exactly. With n + 1 distinct points, there is one polynomial of degree at most n that does this. It sounds reassuring: every pin is in the right place. But the spaces between the pins still matter.',
        'For the Runge function, equally spaced nodes and increasingly high-degree global polynomials can produce large oscillations near the ends. The target itself is perfectly smooth. The trouble comes from the combination of function, node placement, and global polynomial model—not a physical ripple hiding in the data.',
        'Think of one long flexible strip constrained at several locations. Moving one pin can influence the shape far away. That is only an analogy, but it captures why a global polynomial can react in a surprisingly global way.',
      ],
      equations: [
        {
          label: 'The deliberately simple test function',
          expression: 'f(x) = 1 / (1 + 25x²),   −1 ≤ x ≤ 1',
        },
      ],
      figure: fig(
        'runge',
        'Two plots of the same Runge function with equally spaced samples and polynomial interpolants of degree six and ten; the latter oscillates more near the ends.',
        'The gray curve is the known target. Amber is the interpolant. Both match their sample points; neither gets a free guarantee between them.',
      ),
      detailParagraphs: [
        'This is a particular divergent interpolation sequence, not a statement that all equally spaced sampling is bad. For sufficiently smooth f, the interpolation remainder contains both a derivative term and the node product ∏(x − xⱼ). The nodes influence that product; the function influences the derivative term. Stable barycentric evaluation helps numerical evaluation but cannot repair a poorly chosen interpolation problem.',
      ],
      sources: [s.runge],
    },
    {
      id: 'remedies',
      title:
        '02 / Move the pins, change the model, or stop fitting every wiggle',
      paragraphs: [
        'One option is to move the sample points. Chebyshev-spaced nodes cluster toward the ends of the interval, where the evenly spaced example gets into trouble. For this function, the same eleven samples and the same maximum degree behave much better. This is a change in where we sample; simply rewriting the old interpolant in a Chebyshev basis would not change its curve.',
        'Another option is to work locally. Piecewise linear interpolation connects neighboring points with short segments. Splines use low-degree pieces with additional smoothness conditions. Local models can be easier to control and adapt, but straight segments have corners, and even smooth interpolating splines are not a universal protection against noise or overshoot.',
        'If the observations are noisy, matching every measurement exactly may be the wrong aim. A fitted model can deliberately miss individual observations while better describing the underlying response. That is regression or smoothing, rather than exact interpolation. We are choosing what kind of error we are willing to live with.',
      ],
      figure: fig(
        'remedies',
        'Three same-scale plots compare degree-ten interpolation on uniform and Chebyshev nodes with a piecewise linear interpolant on eleven uniform nodes.',
        'Same sample count, three choices. The piecewise example trades smoothness for locality. The numbers are computed errors for this toy function, not a universal ranking.',
        520,
        1000,
      ),
      figures: [
        fig(
          'noise-fit',
          'Identical noisy measurements of a cubic response are matched exactly by a degree-ten polynomial and fitted by cubic least squares.',
          'In this synthetic example we know the noise-free response. A smoother fit can be closer to it while missing some of the noisy dots.',
        ),
      ],
      table: {
        caption: 'Choose the compromise that matches the question',
        headers: ['Choice', 'Useful when', 'What to watch'],
        rows: [
          [
            'Chebyshev nodes',
            'You choose nodes on a bounded interval; response is smooth',
            'Existing measurements may be fixed; no general noise cure',
          ],
          [
            'Local pieces / splines',
            'Local control, irregular detail, mesh refinement',
            'Smoothness, shape constraints, and boundary behavior depend on the method',
          ],
          [
            'Regression / smoothing',
            'Measurements contain noise; a mean trend matters',
            'Model bias and smoothing choices need validation',
          ],
        ],
      },
      sources: [s.fixed],
    },
    {
      id: 'meshes',
      title: '03 / A curve becomes a surface',
      paragraphs: [
        'Now let two inputs vary. Instead of a height above a line, we have a height above a plane: z = f(x, y). A collection of sample locations can be joined into triangles, and each triangle can carry a small local approximation. The patches meet to form a surface.',
        'The mesh is part of the approximation. If the response changes sharply in one direction, a uniform grid may spend many points where little happens and leave too few around the interesting feature. Cell size, orientation, and shape all influence the error. Refining everywhere can work, but it can also become expensive.',
        'Here both meshes use forty-nine sample locations. One spreads them evenly; the other puts more columns around a narrow feature. We can make that second choice because this is a toy problem with a known answer. In practice, a pilot study or an error indicator has to tell us where to look.',
        'Mesh-based approximation also appears inside finite-element and finite-volume calculations used in structures, aeronautics, and fluid dynamics. A CFD solver does more than interpolate observations: it solves discretized physical equations with boundary conditions. The shared lesson is that spatial resolution and convergence have to be checked.',
      ],
      figure: fig(
        'meshes',
        'Three projected surfaces show the known narrow response feature, a uniform triangular mesh, and a feature-aware triangular mesh with the same number of vertices.',
        'An actual piecewise linear interpolation on each triangle. The reported RMSE is evaluated on a dense test grid; a convenient surface picture alone is not evidence of accuracy.',
        520,
        1000,
      ),
      detailParagraphs: [
        'For a triangle, a point inside it has nonnegative barycentric weights λ₁, λ₂, λ₃ that add to one. Linear interpolation uses f̂(x,y)=Σ λᵢf(vᵢ). It reproduces affine functions exactly. Error also depends on the derivatives of f and the geometry of the cells. Mesh refinement near a feature is related to, but not identical with, the endpoint node-placement issue in the Runge example.',
      ],
      sources: [s.mesh, s.cfd],
    },
    {
      id: 'conditions',
      title: '04 / Each experiment is a coordinate',
      paragraphs: [
        'Bring this back to the bench, or to any other place where we make observations. A setting might be x = (temperature, time, concentration, …). One run gives a response at that coordinate. Even without an explicit mechanistic formula, we can try to learn how the response changes across the allowed settings.',
        'I would describe the invisible landscape as the expected response under a defined protocol. Repeating a setting should produce a comparable distribution of outcomes, not necessarily an identical number. Instrument noise, batch effects, uncontrolled conditions, and sometimes intrinsic randomness still exist. Replicates tell us something about that variation.',
        'This also makes our modeling choices visible. A solvent identity is a category, not automatically a smooth numerical axis. A mixture composition has constraints. A time measurement may depend on the entire earlier trajectory. We need sensible variables, a defined objective, and a feasible domain before a smooth landscape is a useful picture.',
      ],
      equations: [
        {
          label:
            'A useful statistical picture, rather than perfect repeatability',
          expression: 'yᵢ = μ(xᵢ) + εᵢ\nμ(x) = E[Y | x, protocol]',
        },
      ],
      figure: fig(
        'conditions',
        'A temperature-time coordinate is highlighted on a synthetic response surface, then connected to one observed value with a small spread of replicate measurements.',
        'A run fixes the inputs and observes an outcome. Replicates reveal variation around a response; they are not wasted duplicate points.',
      ),
      aside: {
        title: 'What I want to learn',
        text: 'Can a limited set of carefully chosen experiments tell us something useful about the response beyond the handful of conditions we already tried? That could mean finding a promising region, understanding an interaction, or locating a stable operating window—not necessarily reconstructing the entire function.',
      },
    },
    {
      id: 'interactions',
      title: '05 / The interesting part may be between the axes',
      paragraphs: [
        'Changing one variable while holding the rest fixed is useful for a local question. But it can hide an interaction: the effect of temperature may depend on time, and the effect of time may depend on temperature. Two one-dimensional slices do not describe the whole surface.',
        'Our tiny example makes this almost unfairly visible. Along either lower edge, the response barely changes. Toward the opposite corner, it rises. Five runs placed only on those edges miss that joint effect; a different five-run layout visits all four corners and the center. That does not solve every design problem, but it shows why location can matter as much as count.',
        'There is already a rich field for this: design of experiments. Factorial designs investigate interactions; response-surface designs can estimate local curvature; blocking and randomization help separate a setting effect from day-to-day or batch variation. The goal is not to replace careful experimental controls with a pretty interpolant. It is to make the controls and sampling plan work together.',
      ],
      equations: [
        {
          label: 'An interaction is a joint effect',
          expression: 'μ(x₁,x₂) = β₀ + β₁x₁ + β₂x₂ + β₁₂x₁x₂ + …',
        },
      ],
      figure: fig(
        'interactions',
        'A synthetic surface rising with the product of two inputs is shown with five axis-only sampling locations and five corner-plus-center locations.',
        'Both layouts contain five distinct settings. The hidden surface is shown only because this is an illustration. Corner-plus-center here reveals the interaction; five settings do not identify a general two-variable quadratic model.',
      ),
      sources: [s.interactions, s.designs],
    },
    {
      id: 'dimensions',
      title: '06 / More dimensions change the budget',
      paragraphs: [
        'Five choices on one axis are only five settings. Five choices on eight axes are 390,625 combinations. This is one version of the curse of dimensionality: a reasonable-looking resolution per variable can become an unreasonable experiment count.',
        'High-dimensional global polynomial models also bring many terms, sensitivity to data geometry, and opportunities to fit noise. But there is not one single higher-dimensional Runge phenomenon that explains everything. Sparse coverage, interactions, boundary extrapolation, noise, and model mismatch are different problems, and each asks for a different response.',
        'A useful escape is to ask whether all eight directions really matter equally. Screening may reveal a smaller set of important factors. Physical knowledge may suggest a simple interaction structure. Sparse grids, low-order surrogate models, or other structured approximations can help when their assumptions fit. None removes the need for assumptions when the data budget is small.',
      ],
      equations: [
        {
          label: 'A full tensor grid grows quickly',
          expression:
            'm settings per axis × d axes → mᵈ combinations\n5⁸ = 390,625',
        },
      ],
      figure: fig(
        'dimensions',
        'One-dimensional samples, a two-dimensional grid, and a three-dimensional lattice demonstrate five to the power of dimension growth.',
        'A counting argument, not a requirement to test every combination. Designing around structure is often the entire point.',
        520,
        1000,
      ),
    },
    {
      id: 'next-experiment',
      title: '07 / Let the next experiment ask a better question',
      paragraphs: [
        'One plan is to learn in rounds. Start with a spread of feasible settings, fit a surrogate response model, check where it is uncertain or wrong, and choose another small batch. If the aim is a global map, coverage and prediction error matter. If the aim is a better yield, we may focus on promising regions while still exploring uncertain ones. Those are related but different objectives.',
        'The animation uses a small Gaussian-process model on a made-up one-dimensional response. A band marks model uncertainty. The next point maximizes an upper-confidence score: predicted response plus a multiple of uncertainty. After that observation arrives, the model updates. This is a simple Bayesian-optimization demonstration, not an algorithm that knows the hidden curve.',
        'For an actual campaign I would want independent confirmation runs, replicates where useful, recorded batch information, and a final check of the suggested setting. A narrow-looking uncertainty band can still be misleading if the model, kernel, or noise assumptions are wrong. A sharp optimum may also be less useful than a slightly lower but robust plateau.',
      ],
      figure: fig(
        'sequential',
        'A calculated Gaussian-process posterior and uncertainty band update as an upper-confidence-bound rule chooses successive noisy observations; the acquisition score is plotted alongside.',
        'A synthetic closed loop. The dashed curve is available to us as illustrators, not to the acquisition rule. Shaded bands are conditional model uncertainty, not guaranteed error bounds.',
        600,
        960,
      ),
      detailParagraphs: [
        'The example uses an RBF kernel, a specified observation-noise variance, and a finite candidate grid. It chooses argmax[μ̂(x)+1.5s(x)], excluding locations already sampled. The acquisition is a heuristic balance between predicted value and uncertainty; no universal optimum guarantee is claimed. Gaussian processes are one surrogate family, not a prerequisite for experimental design.',
      ],
      sources: [s.bayes],
    },
    {
      id: 'why-this-interests-me',
      title: '08 / The landscape is a way to think, not a promise',
      paragraphs: [
        'What interests me is the change in viewpoint. A disappointing run is not only a low number; it is information about a region of the landscape. A repeated run is information about reliability. A deliberately chosen combination can reveal something that a long row of one-variable tests would never show.',
        'I am not presenting a new experimental-design method here, or reporting savings from a real campaign. I am connecting numerical analysis to a question I would like to explore: how should we spend the next experiment when the response is expensive to observe and the underlying function is unknown?',
        'For chemistry, that might help organize reaction screening and follow-up optimization. For materials or other measurements, the same picture could guide where to sample next. The interesting version is always specific: what do we want to learn, what can we safely vary, and what evidence would make us trust the answer?',
      ],
      aside: {
        title: 'Try the question in your own field',
        text: 'Pick two controllable variables and one response. Draw the domain you can actually explore. Which interaction might a pair of one-dimensional slices miss? Which next measurement would best distinguish two plausible explanations?',
      },
    },
  ],
}
