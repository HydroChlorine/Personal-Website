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
export const dynamicsArticle: ProjectArticle = {
  kind: 'topic',
  kicker:
    'Simple rules, difficult forecasts—and sometimes a lasting preference',
  reviewed: '2026-11-09',
  introduction: [
    'Drop an apple, ignore the air, and a short equation describes its fall. Now ask for a weather forecast, or the future state of a reacting mixture. The rules can still be concise while the long-term answer becomes much harder to obtain.',
    'Dynamics studies how states change. Chaos is one striking possibility: nearby initial states can separate rapidly even under deterministic rules. But complexity is not a ladder where adding enough dimensions automatically produces chaos, and chaos is not another name for every difficult calculation.',
    'There is a hopeful twist to this story. Feedback can turn a small difference into a persistent preference. That gives us a way to think about chiral amplification—provided we keep a mathematical example separate from a complete account of life’s history.',
  ],
  sections: [
    {
      id: 'apple',
      title: '01 / A rule for the next instant',
      paragraphs: [
        'For an apple near Earth’s surface, with constant gravitational acceleration and no drag, the state can be its height and vertical velocity. The differential equations say how those quantities change at each instant. Given the starting values, we can solve for the whole trajectory.',
        'The equation is already a two-dimensional first-order system. More dimensions alone are not the deciding factor: large linear systems can remain very predictable. What matters is the structure of the evolution, its stability, and which initial conditions and parameters we are considering.',
        'Our apple stops when it reaches the ground because that is where this illustration stops using the free-fall model. A realistic bounce, air resistance, or a deforming apple would require additional assumptions, rather than a longer extrapolation through the floor.',
      ],
      equations: [
        {
          label: 'A small state and an explicit prediction',
          expression: 'dh/dt=v,   dv/dt=−g\nh(t)=h₀+v₀t−gt²/2',
        },
      ],
      figure: fig(
        'falling-apple',
        'An apple follows an analytically calculated constant-gravity fall while a height-versus-time plot traces the same motion.',
        'Ten metres, initial velocity zero, g=9.81 m/s², and no air resistance. The plot ends at impact.',
      ),
    },
    {
      id: 'nonlinearity',
      title: '02 / One variable can already surprise us',
      paragraphs: [
        'To see why “more dimensions” is not a sufficient explanation, try a discrete map with just one state variable: xₙ₊₁=r xₙ(1−xₙ). Depending on r, repeated updates can settle, alternate between a small set of values, or behave chaotically.',
        'This is a discrete-time system. Smooth autonomous continuous-time systems obey different dimensional restrictions; the familiar Lorenz example uses three coupled ODEs. A high polynomial degree is not a universal chaos threshold either. Nonlinearity makes some behaviors possible, but does not guarantee them.',
        'The three traces show particular parameter choices after discarding a transient. They are snapshots of a richer parameter story, not a claim that every parameter beyond some point is chaotic; periodic windows also occur.',
      ],
      equations: [
        {
          label: 'One state, different long-term patterns',
          expression: 'xₙ₊₁=r xₙ(1−xₙ),   0≤xₙ≤1',
        },
      ],
      figure: fig(
        'logistic-orbits',
        'Computed logistic-map sequences for r=2.7, 3.3, and 3.9 show a fixed point, period-two behavior, and an irregular orbit.',
        'The same update rule and initial state, with different parameters. Irregular appearance alone is not a proof of chaos.',
        600,
        1300,
      ),
    },
    {
      id: 'butterfly',
      title: '03 / The butterfly is a trajectory, not a random generator',
      paragraphs: [
        'The Lorenz system is a small model related to convection. At the standard parameters in our banner, many trajectories wind around two wings without settling into a simple repeating orbit. The equations are deterministic: they do not draw a fresh random number at each turn.',
        'Start two copies very close together and their separation initially can grow rapidly. A useful local picture is exponential error growth, often summarized by a positive Lyapunov exponent. This cannot continue without bound on a bounded attractor; eventually the separation is comparable to the attractor’s size.',
        'A forecast therefore needs more than the evolution law. It needs an initial state known well enough for the requested horizon. Better measurements or arithmetic can extend that horizon, but a fixed number of extra digits does not buy unlimited prediction time.',
      ],
      equations: [
        {
          label: 'The model behind the wings',
          expression:
            'dx/dt=10(y−x)\ndy/dt=x(28−z)−y\ndz/dt=xy−(8/3)z\nlocally: δ(t)≈δ₀e^(λt),   λ>0',
        },
      ],
      figure: fig(
        'lorenz-neighbors',
        'Two RK4-integrated Lorenz trajectories start one millionth of a unit apart, with their separation plotted on a logarithmic scale.',
        'The initial perturbation is in x. Simulated time is accelerated for the animation. A growing separation is a property of this calculation of a known chaotic system, not a measured Lyapunov exponent.',
      ),
      sources: [s.lorenz],
    },
    {
      id: 'numerical',
      title: '04 / A good solver cannot erase sensitive dependence',
      paragraphs: [
        'Every numerical trajectory has approximation and rounding errors. In a chaotic system those small discrepancies can grow, just as a physical initial-state discrepancy can. Two carefully computed trajectories may agree very well at first and cease to match point by point later.',
        'We can still do useful numerical analysis. Refine the time step, compare short-time convergence, monitor relevant balances, and test whether a statistical conclusion is robust to numerical choices. A particular long trajectory matching itself less well is not automatically evidence that every statistical property is wrong—or right.',
        'There is another issue that deserves a separate picture: an unstable numerical method can spoil a perfectly stable physical system. Explicit Euler applied to y′=−y decays only when its step is in the appropriate stability interval. A step that is too large makes the computed sequence grow even though the exact solution shrinks.',
      ],
      figure: fig(
        'numerical-horizon',
        'Lorenz solutions at three RK4 step sizes are compared against a finer-step reference; short-time agreement gives way to growing trajectory differences.',
        'The finest numerical solution is a reference, not an exact truth. Convergence is checked over an early interval before long-time trajectory separation dominates.',
      ),
      figures: [
        fig(
          'solver-stability',
          'A stable decay equation is computed with a stable and an unstable Euler step, alongside its exact exponential decay.',
          'Numerical instability and physical chaos are different. Here the underlying differential equation has no chaotic behavior.',
        ),
      ],
      sources: [s.lorenz],
    },
    {
      id: 'scales',
      title: '05 / Microscopic rules and macroscopic laws are another question',
      paragraphs: [
        'Following one chaotic classical trajectory, predicting a distribution of many particles, and explaining the quantum-to-classical transition are related interests, but they are not the same problem. Classical chaos already occurs within classical mechanics; it is not a failure that must be filled by quantum mechanics.',
        'Hilbert’s sixth problem, posed in 1900, asked for an axiomatic treatment of parts of physics, especially probability and mechanics. It also called attention to limiting processes connecting an atomistic picture to continuum motion. That predates modern quantum mechanics; it was not originally a request to derive the macroscopic world from the Schrödinger equation.',
        'A microscopic description keeps enormous detail. A density field averages much of it away. Making that passage rigorous requires assumptions about scales, interactions, initial states, and the sense in which a limit is taken. A fluid equation is not obtained just by printing a sufficiently large particle simulation.',
        'Quantum-to-classical questions add their own issues: the relevant limit, environmental coupling, decoherence, and which observables are being compared. Computational expense does not by itself decide when one physical description becomes another.',
      ],
      figure: fig(
        'scale-bridge',
        'A periodic toy particle system is viewed as individual positions, a coarse occupancy grid, and an averaged spatial profile.',
        'The same noninteracting toy particles, summarized three ways. This illustrates information loss under coarse-graining; it does not derive a fluid equation or a quantum-to-classical limit.',
        600,
        1300,
      ),
      detailParagraphs: [
        'A density or moment description can be more robust than a pointwise trajectory forecast, but closure is a substantive step: the evolution of a few retained moments may depend on quantities that were discarded. Different limits—such as a kinetic scaling, a hydrodynamic limit, or a semiclassical limit—have different assumptions and conclusions. No claim that the broad Hilbert programme is completely solved is made here.',
      ],
      sources: [s.hilbert, s.quantum],
    },
    {
      id: 'hydrogen',
      title: '06 / Even hydrogen gives us several different problems',
      paragraphs: [
        'An isolated H⁺ has no electron, so there is no bound electronic orbital to calculate in the simple atomic problem. Neutral H has one electron: a nonrelativistic Coulomb model separates analytically and gives the familiar energy levels, approximately −13.6 eV/n². Precision comparison with experiment also needs finite nuclear mass and further corrections.',
        'H⁻ adds a second electron. Now electron–electron repulsion couples their coordinates, so two independent hydrogen orbitals are not an exact solution. Correlated numerical methods can still compute this small system very accurately. The extra electron is only weakly bound: the measured detachment energy is about 0.754 eV, much smaller than hydrogen’s roughly 13.6 eV ionization energy.',
        'This is a concrete growth in computational difficulty, but it is not evidence of classical chaos. Solving a stationary correlated quantum bound state is a different task from forecasting a chaotic classical trajectory. Larger molecules are not beyond all computation; they require approximations and validation matched to the question.',
      ],
      equations: [
        {
          label:
            'The extra coupling in a fixed-nucleus, two-electron Hamiltonian (atomic units)',
          expression: 'H = −½∇₁² −½∇₂² −1/r₁ −1/r₂ +1/r₁₂',
        },
      ],
      figure: fig(
        'hydrogen-family',
        'H plus, H, and H minus are compared by electron count, the form of the electronic problem, and the distinct ionization or detachment energies.',
        'The hydrogen radial probability is calculated; the two-electron cloud is schematic, not a computed H⁻ wavefunction. Ionization and extra-electron detachment have different reference states.',
        600,
        1300,
      ),
      sources: [s.hydrogen, s.quantum],
    },
    {
      id: 'handedness',
      title: '07 / Featured connection: a tiny bias can choose a branch',
      paragraphs: [
        'Return to handedness. Imagine a dimensionless variable q measuring an imbalance between two mirror-related populations. A deliberately simple evolution law, q′=μq−q³, treats positive and negative q symmetrically. When μ is positive, q=0 is unstable and q=±√μ are stable.',
        'In that model, a tiny positive perturbation grows toward one branch; a tiny negative perturbation grows toward the other. An exactly symmetric initial condition stays symmetric in the exact deterministic equations. A fluctuation or bias is needed to choose a side. When μ is negative, the symmetric state is stable instead.',
        'This supports the shape of the idea you might have in mind: symmetric rules can permit two stable mirror outcomes while a balanced state between them is unstable. But it is a model-dependent dynamical statement, not a general law for every racemic mixture. These are attracting states of a toy flow, not automatically thermodynamic equilibria of a closed chemical system.',
      ],
      equations: [
        {
          label:
            'A symmetry-breaking normal form, not a fitted chemical mechanism',
          expression:
            'dq/dt=μq−q³\nμ>0: q*=0 unstable;   q*=±√μ stable\nf′(0)=μ,   f′(±√μ)=−2μ',
        },
      ],
      figure: fig(
        'chiral-bistability',
        'A symmetric double-well toy potential, trajectories from opposite small biases, and a pitchfork equilibrium diagram show two stable branches and an unstable central branch.',
        'Only the trajectory panel uses time as its horizontal axis. The bifurcation panel varies a parameter. This toy does not identify the chemistry of early life.',
        600,
        1300,
      ),
      aside: {
        title: 'What makes this connection worth following',
        text: 'Dynamics can organize a persistent preference instead of merely ruining a forecast. The interesting question is which physical feedbacks could realize that structure—and which observations would distinguish such a mechanism from another explanation.',
      },
    },
    {
      id: 'life',
      title:
        '08 / From feedback to biological handedness: a question, not a solved history',
      paragraphs: [
        'Autocatalysis provides one route to positive feedback: a product helps make more of itself. Coupled with suitable competition or inhibition, a small difference between mirror-related populations can grow. The second toy model makes those assumptions explicit instead of treating amplification as a consequence of symmetry alone.',
        'Kagan and Soai’s 2026 Nobel recognition connects naturally to this question. Nonlinear effects and asymmetric autocatalysis show that tiny chiral preferences can be amplified in actual chemical systems. They do not establish that one demonstrated reaction was the route by which life acquired its handedness.',
        'Biology’s pattern also needs careful language. Proteins are largely assembled from L amino acids; glycine is achiral, and D amino acids occur in other biological contexts. D/L descriptors for sugars are not a universal “opposite” of amino-acid handedness, nor do they assign every stereocenter. R/S is yet another naming system.',
        'We do not normally label egg cartons by protein handedness because living systems reliably use a largely shared stereochemical toolkit. That familiar consistency makes the origin question compelling. To connect it to a model, we would need plausible chemistry, material and energy flows, selection and replication, and evidence about which amplification and preservation processes were available.',
        'The open question I want to keep is precise enough to investigate: could a small initial bias be amplified, maintained, and transmitted by a realistic reaction network? Two stable branches on a page are a starting language for that question, not its answer.',
      ],
      figure: fig(
        'chiral-network',
        'A toy open competition model with self-amplification and cross-inhibition evolves from a small population imbalance toward one dominant handed population.',
        'Effective dimensionless kinetics, not a simulation of the Soai reaction. The mirror-swapped initial condition selects the opposite branch. Nonlinear amplification need not be chaotic.',
      ),
      detailParagraphs: [
        'The example uses L′=L(1−L−3D), D′=D(1−D−3L). It has stable axis states (1,0) and (0,1), and a symmetric saddle (1/4,1/4). The gain and saturation terms are effective open-system assumptions, not a mass-balanced closed chemical mechanism. They demonstrate an instability under specified kinetics. A real mechanism would need explicit species, stoichiometry, rate laws, resources, and experimentally testable parameters.',
      ],
      sources: [s.frank, s.soai, s.nobel2026, s.biochirality],
    },
  ],
}
