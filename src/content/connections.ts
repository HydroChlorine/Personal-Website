import { projects } from './projects/index.ts'
import { mathTopics } from './mathematics/index.ts'
import { csTopics } from './computer-science/index.ts'
import { chemistryExperienceCards } from './chemistry/experiences/index.ts'

// One shared map: links work in both directions, with an explicit reason to follow.
export const ideaNodes = [
  ...projects.map((p) => ({
    id: p.slug,
    title: p.title,
    href: `/projects/${p.slug}`,
  })),
  ...mathTopics.map((p) => ({
    id: p.slug,
    title: p.title,
    href: `/mathematics/topics/${p.slug}`,
  })),
  ...csTopics.map((p) => ({
    id: p.slug,
    title: p.title,
    href: `/computer-science/topics/${p.slug}`,
  })),
  ...chemistryExperienceCards.map((p) => ({
    id: p.slug,
    title: p.title,
    href: `/chemistry/snippets/${p.slug}`,
  })),
]
export const ideaConnections: [string, string, string][] = [
  [
    'metal-free-metathesis',
    'catalyst-workflow',
    'Two threads in molecular discovery: making transformations in the laboratory and exploring candidates with software. The ring-closing story is still being prepared.',
  ],
  [
    'mind-the-edges',
    'tonic-water-fluorescence',
    'A stubborn measurement raises a design question: which observations would actually distinguish the unknowns?',
  ],
  [
    'mind-the-edges',
    'catalyst-workflow',
    'Choosing candidate molecules and choosing experimental conditions both ask where to search next.',
  ],
  [
    'mind-the-edges',
    'same-matrix-new-view',
    'Fitting a surface eventually becomes a numerical linear-algebra problem.',
  ],
  [
    'a-family-of-curves',
    'a-signal-unfolded',
    'Orthogonal functions give two different ways to resolve a complicated signal into simpler pieces.',
  ],
  [
    'a-family-of-curves',
    'same-matrix-new-view',
    'From function modes to matrix eigenvectors: changing basis makes the structure easier to see.',
  ],
  [
    'a-family-of-curves',
    'isotopes-in-the-infrared',
    'Vibrational spectra bring abstract molecular modes back to a measured signal.',
  ],
  [
    'a-family-of-curves',
    'patterns-into-rules',
    'Symmetry constrains the shapes and modes a mathematical model can support.',
  ],
  [
    'same-matrix-new-view',
    'five-dyes-one-spectrum',
    'Separating five spectral contributions is a concrete least-squares problem.',
  ],
  [
    'same-matrix-new-view',
    'tea-and-an-unexpected-answer',
    'Nearly overlapping spectra show why a solvable system may still give an unreliable estimate.',
  ],
  [
    'same-matrix-new-view',
    'catalyst-workflow',
    'Molecular calculations and small prediction models make numerical cost a practical concern.',
  ],
  [
    'same-matrix-new-view',
    'four-dimensions',
    'Coordinate transformations turn linear algebra into a view of a higher-dimensional object.',
  ],
  [
    'patterns-into-rules',
    'a-butterfly-made-of-motion',
    'Symmetry allows mirror-related outcomes; feedback asks whether a small imbalance can grow.',
  ],
  [
    'patterns-into-rules',
    'proofs-as-programs',
    'Algebraic rules and checked proofs both make assumptions and allowed operations explicit.',
  ],
  [
    'patterns-into-rules',
    'algebraic-structure-representations',
    'The discussion paper is a work-in-progress continuation of the representation questions.',
  ],
  [
    'patterns-into-rules',
    'isotopes-in-the-infrared',
    'Molecular symmetry helps organize the vibrations behind infrared bands.',
  ],
  [
    'a-butterfly-made-of-motion',
    'a-reaction-in-fading-color',
    'A measured kinetic trace gives a simpler setting for thinking about evolution in time.',
  ],
  [
    'a-butterfly-made-of-motion',
    'two-peaks-become-one',
    'The speed of molecular exchange changes what an instrument can resolve.',
  ],
  [
    'a-butterfly-made-of-motion',
    'paint-a-firework',
    'Particle trajectories make numerical time-stepping visible; they need not be chaotic to be interesting.',
  ],
  [
    'a-butterfly-made-of-motion',
    'critterworld',
    'Local rules can create complex collective behavior, without proving that the simulation is mathematically chaotic.',
  ],
  [
    'a-signal-unfolded',
    'two-peaks-become-one',
    'An NMR spectrum connects signal processing with the molecular motion producing the signal.',
  ],
  [
    'a-signal-unfolded',
    'the-empty-cell-spectrum',
    'An interferogram can reveal an optical path hiding inside the instrument.',
  ],
  [
    'a-signal-unfolded',
    'beyond-the-library-match',
    'Transforming a signal is only the beginning; identifying a material still needs chemical reasoning.',
  ],
  [
    'a-signal-unfolded',
    'a-half-life-in-noisy-counts',
    'Noise, averaging and fitted decay rates meet in a different kind of measurement.',
  ],
  [
    'critterworld',
    'proofs-as-programs',
    'Parsing a language and proving a tree correct are two ways to make program structure explicit.',
  ],
  [
    'critterworld',
    'backend-internship',
    'A shared mutable world and a backend service both need carefully drawn boundaries between state and requests.',
  ],
  [
    'paint-a-firework',
    'this-website',
    'The large fireworks workshop and this site’s tiny sky interaction share a fascination with particles.',
  ],
  [
    'paint-a-firework',
    'four-dimensions',
    'Graphics turns mathematical objects into something a visitor can manipulate.',
  ],
  [
    'backend-internship',
    'this-website',
    'From preparing frontend responses to building a personal interface: two sides of web development.',
  ],
  [
    'proofs-as-programs',
    'algebraic-structure-representations',
    'Representing a structure is one question; expressing and checking its properties is another.',
  ],
  [
    'tonic-water-fluorescence',
    'spinach-fluorescence',
    'Two fluorescent samples, but very different reasons why adding material can reduce the observed glow.',
  ],
  [
    'tonic-water-fluorescence',
    'four-unknowns',
    'A calibration becomes useful when it has to answer a question about an unknown solution.',
  ],
  [
    'tonic-water-fluorescence',
    'five-dyes-one-spectrum',
    'A linked fluorescence model and a spectral mixture fit both extract several quantities from shared measurements.',
  ],
  [
    'spinach-fluorescence',
    'tea-and-an-unexpected-answer',
    'Extraction changes a mixture before a spectrum tries to describe it.',
  ],
  [
    'spinach-fluorescence',
    'beyond-the-library-match',
    'What a sample does to light depends on how it was prepared as well as what it contains.',
  ],
  [
    'beyond-the-library-match',
    'four-unknowns',
    'Infrared evidence helps narrow an unknown solid’s identity rather than simply accepting a library suggestion.',
  ],
  [
    'five-dyes-one-spectrum',
    'tea-and-an-unexpected-answer',
    'A good mixture fit needs distinguishable reference signals and believable assumptions.',
  ],
  [
    'ions-in-flight',
    'isotopes-in-the-infrared',
    'Changing mass leaves different fingerprints in flight times and molecular vibrations.',
  ],
  [
    'ions-in-flight',
    'a-half-life-in-noisy-counts',
    'A detector signal needs calibration before it can support an assignment.',
  ],
  [
    'a-reaction-in-fading-color',
    'sweeping-the-voltage',
    'Following a chemical change in time and driving it with voltage give different views of reaction behavior.',
  ],
  [
    'a-reaction-in-fading-color',
    'a-half-life-in-noisy-counts',
    'Fading absorbance and radioactive counts share decay-fitting ideas, despite different physical mechanisms.',
  ],
  [
    'heat-by-a-different-route',
    'catalyst-workflow',
    'Measured energy differences and computed molecular energies both need a clearly defined comparison.',
  ],
  [
    'heat-by-a-different-route',
    'tea-and-an-unexpected-answer',
    'Subtracting measurements can expose shared uncertainty or an assumption that needs revisiting.',
  ],
  [
    'the-empty-cell-spectrum',
    'beyond-the-library-match',
    'The instrument and sample preparation can leave features that are not the compound itself.',
  ],
  [
    'sweeping-the-voltage',
    'four-unknowns',
    'Quantitative analysis begins by choosing a signal and checking how it responds to concentration.',
  ],
  [
    'a-mixture-over-one-hundred-percent',
    'five-dyes-one-spectrum',
    'Peak areas and spectral weights need response models before they become composition.',
  ],
  [
    'a-mixture-over-one-hundred-percent',
    'tea-and-an-unexpected-answer',
    'An impossible-looking answer is a reason to inspect the model, not quietly normalize it away.',
  ],
]
export function connectedIdeas(id: string) {
  return ideaConnections.flatMap(([a, b, reason]) => {
    const target = a === id ? b : b === id ? a : undefined
    const node = target && ideaNodes.find((n) => n.id === target)
    return node ? [{ ...node, reason }] : []
  })
}
