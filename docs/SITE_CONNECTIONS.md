# Connections between the three threads

Updated 2026-11-12. The shared source is `src/content/connections.ts`; `RelatedIdeas` renders it at the end of every project, mathematics topic, CS topic and chemistry snippet. Subject overview pages carry short, hand-written cross-thread introductions. External references remain separate from internal connections.

There are 30 entries and 47 curated, reciprocal connections. Every entry has at least one connection, every target is checked against the content registries, and each link explains why it is relevant. Four links are shown initially; additional links sit behind a disclosure. Work-in-progress entries stay labeled as such.

To maintain: add an entry to its normal content registry, then add pairs of node slugs and a shared explanation to `ideaConnections`. The regression test rejects missing targets, duplicate pairs and isolated entries. Keep links tied to the actual story rather than claiming that a tool or result was used when it was not.

## Reading paths

### Molecules, meet computation

- [A different way to close a ring](/projects/metal-free-metathesis): Two threads in molecular discovery: making transformations in the laboratory and exploring candidates with software. The ring-closing story is still being prepared.
- [Mind the edges](/mathematics/topics/mind-the-edges): Choosing candidate molecules and choosing experimental conditions both ask where to search next.
- [Same matrix, a new view](/mathematics/topics/same-matrix-new-view): Molecular calculations and small prediction models make numerical cost a practical concern.
- [Two combustions and a missing heat](/chemistry/snippets/heat-by-a-different-route): Measured energy differences and computed molecular energies both need a clearly defined comparison.

### Short project discussion paper

- [Patterns into rules](/mathematics/topics/patterns-into-rules): The discussion paper is a work-in-progress continuation of the representation questions.
- [Proofs as programs](/computer-science/topics/proofs-as-programs): Representing a structure is one question; expressing and checking its properties is another.

### A different way to close a ring

- [Molecules, meet computation](/projects/catalyst-workflow): Two threads in molecular discovery: making transformations in the laboratory and exploring candidates with software. The ring-closing story is still being prepared.

### CritterWorld

- [A butterfly made of motion](/mathematics/topics/a-butterfly-made-of-motion): Local rules can create complex collective behavior, without proving that the simulation is mathematically chaotic.
- [Proofs as programs](/computer-science/topics/proofs-as-programs): Parsing a language and proving a tree correct are two ways to make program structure explicit.
- [From a filter to a response](/projects/backend-internship): A shared mutable world and a backend service both need carefully drawn boundaries between state and requests.

### Paint a firework

- [A butterfly made of motion](/mathematics/topics/a-butterfly-made-of-motion): Particle trajectories make numerical time-stepping visible; they need not be chaotic to be interesting.
- [This website](/projects/this-website): The large fireworks workshop and this site’s tiny sky interaction share a fascination with particles.
- [Finding a way through four dimensions](/projects/four-dimensions): Graphics turns mathematical objects into something a visitor can manipulate.

### Finding a way through four dimensions

- [Same matrix, a new view](/mathematics/topics/same-matrix-new-view): Coordinate transformations turn linear algebra into a view of a higher-dimensional object.
- [Paint a firework](/projects/paint-a-firework): Graphics turns mathematical objects into something a visitor can manipulate.

### From a filter to a response

- [CritterWorld](/projects/critterworld): A shared mutable world and a backend service both need carefully drawn boundaries between state and requests.
- [This website](/projects/this-website): From preparing frontend responses to building a personal interface: two sides of web development.

### This website

- [Paint a firework](/projects/paint-a-firework): The large fireworks workshop and this site’s tiny sky interaction share a fascination with particles.
- [From a filter to a response](/projects/backend-internship): From preparing frontend responses to building a personal interface: two sides of web development.

### Mind the edges

- [Tonic water and a stubborn fluorimeter](/chemistry/snippets/tonic-water-fluorescence): A stubborn measurement raises a design question: which observations would actually distinguish the unknowns?
- [Molecules, meet computation](/projects/catalyst-workflow): Choosing candidate molecules and choosing experimental conditions both ask where to search next.
- [Same matrix, a new view](/mathematics/topics/same-matrix-new-view): Fitting a surface eventually becomes a numerical linear-algebra problem.

### A family of curves

- [A signal, unfolded](/mathematics/topics/a-signal-unfolded): Orthogonal functions give two different ways to resolve a complicated signal into simpler pieces.
- [Same matrix, a new view](/mathematics/topics/same-matrix-new-view): From function modes to matrix eigenvectors: changing basis makes the structure easier to see.
- [Changing an atom, shifting a spectrum](/chemistry/snippets/isotopes-in-the-infrared): Vibrational spectra bring abstract molecular modes back to a measured signal.
- [Patterns into rules](/mathematics/topics/patterns-into-rules): Symmetry constrains the shapes and modes a mathematical model can support.

### Same matrix, a new view

- [Mind the edges](/mathematics/topics/mind-the-edges): Fitting a surface eventually becomes a numerical linear-algebra problem.
- [A family of curves](/mathematics/topics/a-family-of-curves): From function modes to matrix eigenvectors: changing basis makes the structure easier to see.
- [Five dyes in one color](/chemistry/snippets/five-dyes-one-spectrum): Separating five spectral contributions is a concrete least-squares problem.
- [Tea, extraction, and an unexpected answer](/chemistry/snippets/tea-and-an-unexpected-answer): Nearly overlapping spectra show why a solvable system may still give an unreliable estimate.
- [Molecules, meet computation](/projects/catalyst-workflow): Molecular calculations and small prediction models make numerical cost a practical concern.
- [Finding a way through four dimensions](/projects/four-dimensions): Coordinate transformations turn linear algebra into a view of a higher-dimensional object.

### Patterns into rules

- [A family of curves](/mathematics/topics/a-family-of-curves): Symmetry constrains the shapes and modes a mathematical model can support.
- [A butterfly made of motion](/mathematics/topics/a-butterfly-made-of-motion): Symmetry allows mirror-related outcomes; feedback asks whether a small imbalance can grow.
- [Proofs as programs](/computer-science/topics/proofs-as-programs): Algebraic rules and checked proofs both make assumptions and allowed operations explicit.
- [Short project discussion paper](/projects/algebraic-structure-representations): The discussion paper is a work-in-progress continuation of the representation questions.
- [Changing an atom, shifting a spectrum](/chemistry/snippets/isotopes-in-the-infrared): Molecular symmetry helps organize the vibrations behind infrared bands.

### A butterfly made of motion

- [Patterns into rules](/mathematics/topics/patterns-into-rules): Symmetry allows mirror-related outcomes; feedback asks whether a small imbalance can grow.
- [Following a reaction as its color fades](/chemistry/snippets/a-reaction-in-fading-color): A measured kinetic trace gives a simpler setting for thinking about evolution in time.
- [Watching two NMR peaks become one](/chemistry/snippets/two-peaks-become-one): The speed of molecular exchange changes what an instrument can resolve.
- [Paint a firework](/projects/paint-a-firework): Particle trajectories make numerical time-stepping visible; they need not be chaotic to be interesting.
- [CritterWorld](/projects/critterworld): Local rules can create complex collective behavior, without proving that the simulation is mathematically chaotic.

### A signal, unfolded

- [A family of curves](/mathematics/topics/a-family-of-curves): Orthogonal functions give two different ways to resolve a complicated signal into simpler pieces.
- [Watching two NMR peaks become one](/chemistry/snippets/two-peaks-become-one): An NMR spectrum connects signal processing with the molecular motion producing the signal.
- [The empty cell had a spectrum](/chemistry/snippets/the-empty-cell-spectrum): An interferogram can reveal an optical path hiding inside the instrument.
- [When the spectral library suggests the wrong compound](/chemistry/snippets/beyond-the-library-match): Transforming a signal is only the beginning; identifying a material still needs chemical reasoning.
- [A half-life hidden in noisy counts](/chemistry/snippets/a-half-life-in-noisy-counts): Noise, averaging and fitted decay rates meet in a different kind of measurement.

### Proofs as programs

- [Patterns into rules](/mathematics/topics/patterns-into-rules): Algebraic rules and checked proofs both make assumptions and allowed operations explicit.
- [CritterWorld](/projects/critterworld): Parsing a language and proving a tree correct are two ways to make program structure explicit.
- [Short project discussion paper](/projects/algebraic-structure-representations): Representing a structure is one question; expressing and checking its properties is another.

### Tonic water and a stubborn fluorimeter

- [Mind the edges](/mathematics/topics/mind-the-edges): A stubborn measurement raises a design question: which observations would actually distinguish the unknowns?
- [Spinach under a different light](/chemistry/snippets/spinach-fluorescence): Two fluorescent samples, but very different reasons why adding material can reduce the observed glow.
- [Four unknowns on the bench](/chemistry/snippets/four-unknowns): A calibration becomes useful when it has to answer a question about an unknown solution.
- [Five dyes in one color](/chemistry/snippets/five-dyes-one-spectrum): A linked fluorescence model and a spectral mixture fit both extract several quantities from shared measurements.

### Watching two NMR peaks become one

- [A butterfly made of motion](/mathematics/topics/a-butterfly-made-of-motion): The speed of molecular exchange changes what an instrument can resolve.
- [A signal, unfolded](/mathematics/topics/a-signal-unfolded): An NMR spectrum connects signal processing with the molecular motion producing the signal.

### Spinach under a different light

- [Tonic water and a stubborn fluorimeter](/chemistry/snippets/tonic-water-fluorescence): Two fluorescent samples, but very different reasons why adding material can reduce the observed glow.
- [Tea, extraction, and an unexpected answer](/chemistry/snippets/tea-and-an-unexpected-answer): Extraction changes a mixture before a spectrum tries to describe it.
- [When the spectral library suggests the wrong compound](/chemistry/snippets/beyond-the-library-match): What a sample does to light depends on how it was prepared as well as what it contains.

### When the spectral library suggests the wrong compound

- [A signal, unfolded](/mathematics/topics/a-signal-unfolded): Transforming a signal is only the beginning; identifying a material still needs chemical reasoning.
- [Spinach under a different light](/chemistry/snippets/spinach-fluorescence): What a sample does to light depends on how it was prepared as well as what it contains.
- [Four unknowns on the bench](/chemistry/snippets/four-unknowns): Infrared evidence helps narrow an unknown solid’s identity rather than simply accepting a library suggestion.
- [The empty cell had a spectrum](/chemistry/snippets/the-empty-cell-spectrum): The instrument and sample preparation can leave features that are not the compound itself.

### Five dyes in one color

- [Same matrix, a new view](/mathematics/topics/same-matrix-new-view): Separating five spectral contributions is a concrete least-squares problem.
- [Tonic water and a stubborn fluorimeter](/chemistry/snippets/tonic-water-fluorescence): A linked fluorescence model and a spectral mixture fit both extract several quantities from shared measurements.
- [Tea, extraction, and an unexpected answer](/chemistry/snippets/tea-and-an-unexpected-answer): A good mixture fit needs distinguishable reference signals and believable assumptions.
- [A mixture that added up to more than 100 percent](/chemistry/snippets/a-mixture-over-one-hundred-percent): Peak areas and spectral weights need response models before they become composition.

### A molecule’s flight time

- [Changing an atom, shifting a spectrum](/chemistry/snippets/isotopes-in-the-infrared): Changing mass leaves different fingerprints in flight times and molecular vibrations.
- [A half-life hidden in noisy counts](/chemistry/snippets/a-half-life-in-noisy-counts): A detector signal needs calibration before it can support an assignment.

### Following a reaction as its color fades

- [A butterfly made of motion](/mathematics/topics/a-butterfly-made-of-motion): A measured kinetic trace gives a simpler setting for thinking about evolution in time.
- [Sweeping the voltage, watching the chemistry](/chemistry/snippets/sweeping-the-voltage): Following a chemical change in time and driving it with voltage give different views of reaction behavior.
- [A half-life hidden in noisy counts](/chemistry/snippets/a-half-life-in-noisy-counts): Fading absorbance and radioactive counts share decay-fitting ideas, despite different physical mechanisms.

### Two combustions and a missing heat

- [Molecules, meet computation](/projects/catalyst-workflow): Measured energy differences and computed molecular energies both need a clearly defined comparison.
- [Tea, extraction, and an unexpected answer](/chemistry/snippets/tea-and-an-unexpected-answer): Subtracting measurements can expose shared uncertainty or an assumption that needs revisiting.

### Changing an atom, shifting a spectrum

- [A family of curves](/mathematics/topics/a-family-of-curves): Vibrational spectra bring abstract molecular modes back to a measured signal.
- [Patterns into rules](/mathematics/topics/patterns-into-rules): Molecular symmetry helps organize the vibrations behind infrared bands.
- [A molecule’s flight time](/chemistry/snippets/ions-in-flight): Changing mass leaves different fingerprints in flight times and molecular vibrations.

### The empty cell had a spectrum

- [A signal, unfolded](/mathematics/topics/a-signal-unfolded): An interferogram can reveal an optical path hiding inside the instrument.
- [When the spectral library suggests the wrong compound](/chemistry/snippets/beyond-the-library-match): The instrument and sample preparation can leave features that are not the compound itself.

### Sweeping the voltage, watching the chemistry

- [Following a reaction as its color fades](/chemistry/snippets/a-reaction-in-fading-color): Following a chemical change in time and driving it with voltage give different views of reaction behavior.
- [Four unknowns on the bench](/chemistry/snippets/four-unknowns): Quantitative analysis begins by choosing a signal and checking how it responds to concentration.

### A mixture that added up to more than 100 percent

- [Five dyes in one color](/chemistry/snippets/five-dyes-one-spectrum): Peak areas and spectral weights need response models before they become composition.
- [Tea, extraction, and an unexpected answer](/chemistry/snippets/tea-and-an-unexpected-answer): An impossible-looking answer is a reason to inspect the model, not quietly normalize it away.

### Tea, extraction, and an unexpected answer

- [Same matrix, a new view](/mathematics/topics/same-matrix-new-view): Nearly overlapping spectra show why a solvable system may still give an unreliable estimate.
- [Spinach under a different light](/chemistry/snippets/spinach-fluorescence): Extraction changes a mixture before a spectrum tries to describe it.
- [Five dyes in one color](/chemistry/snippets/five-dyes-one-spectrum): A good mixture fit needs distinguishable reference signals and believable assumptions.
- [Two combustions and a missing heat](/chemistry/snippets/heat-by-a-different-route): Subtracting measurements can expose shared uncertainty or an assumption that needs revisiting.
- [A mixture that added up to more than 100 percent](/chemistry/snippets/a-mixture-over-one-hundred-percent): An impossible-looking answer is a reason to inspect the model, not quietly normalize it away.

### A half-life hidden in noisy counts

- [A signal, unfolded](/mathematics/topics/a-signal-unfolded): Noise, averaging and fitted decay rates meet in a different kind of measurement.
- [A molecule’s flight time](/chemistry/snippets/ions-in-flight): A detector signal needs calibration before it can support an assignment.
- [Following a reaction as its color fades](/chemistry/snippets/a-reaction-in-fading-color): Fading absorbance and radioactive counts share decay-fitting ideas, despite different physical mechanisms.

### Four unknowns on the bench

- [Tonic water and a stubborn fluorimeter](/chemistry/snippets/tonic-water-fluorescence): A calibration becomes useful when it has to answer a question about an unknown solution.
- [When the spectral library suggests the wrong compound](/chemistry/snippets/beyond-the-library-match): Infrared evidence helps narrow an unknown solid’s identity rather than simply accepting a library suggestion.
- [Sweeping the voltage, watching the chemistry](/chemistry/snippets/sweeping-the-voltage): Quantitative analysis begins by choosing a signal and checking how it responds to concentration.

## Other refinements in this pass

- Weather accumulates in 20 steps at 15-second intervals, saturating at 300 visible active seconds. Pause/hidden tabs freeze exposure; changing weather clears it. Caps and side deposits vary across frames; rain gains wet glass, rivulets and lower ledges. Ground effects grow with the same amount. See `SEASONS_AND_SKY.md`.
- Attention starts visibly pixelated and lightly blurred at zero; positive values progressively reduce blur, switch to the finer companion at +0.15 and SVG at +0.65, and reach zero blur at +1. The negative range retains its progressively coarse and scrambled images.

Verification: 44 tests and production build pass. The weather comparison fixture uses the production CSS at 5, 10 and 20 levels to inspect full accumulation without waiting five minutes; it is removed after review. Screenshots document these staged surfaces, not elapsed-time recordings. Browser checks cover reciprocal navigation, attention controls, phone layout and weather reset/pause behavior.
