# Illustrated mathematics topics

Six original articles extend the math collection under `/mathematics/topics/`:

| Route | Story | Original figures |
| --- | --- | --- |
| `mind-the-edges` | Runge interpolation → remedies → meshes → experimental design | 8 |
| `a-family-of-curves` | Legendre families → orthogonal projection → angular quantum states → modeling assumptions | 7 |
| `same-matrix-new-view` | Dense cost → QR/Schur → truncated SVD → randomized sketches → electronic-structure warm starts | 6 |
| `patterns-into-rules` | Symmetry groups → representations → crystals → invariants → chirality and amplification | 7 |
| `a-butterfly-made-of-motion` | Predictable falls → chaos → solvers → scales and hydrogen → chiral feedback | 9 |
| `a-signal-unfolded` | Heat modes → roots of unity → FFT → NMR/FTIR → averaging and resolution | 9 |

All six picture-and-copy cards are full links. Interpolation is featured across the collection width, with an explicit experiment-design question. The dynamics card also highlights its chaos-and-chirality connection. Back links, in-article anchors, and links to the other five stories support navigation. Topic titles update the browser title; direct routes use the existing SPA fallback. The math context keeps the established rotating math banners; the Catalyst story still resolves to chemistry.

## Content and rendering

- `src/content/mathematics/` holds the six stories, shared figure helper, references, and topic catalog. These are conceptual essays, not claims of completed research or new experimental methods.
- `MathematicsTopicPage.tsx` uses the existing `ProjectArticle` renderer. Optional `kind: 'topic'` changes the accessible label, contents caption, details summary, and reference caption. Equation blocks, detail paragraphs, and per-table captions generalize the renderer; existing chemistry defaults are preserved.
- Equations are selectable Unicode text, with wrapping on phones. No math-rendering service, external font, or new runtime dependency is required. The typeset examples use real matrices; complex analogues are explained where useful.
- Figures default to pixel animation while motion plays, switch to PNG when paused, and offer a crisp animated GIF view. Both styles animate from the same 48 source frames and timing, with portrait companions. Paused crisp views use the retained static SVGs. Changing topics remounts the article so figures start in the default style. Images are lazy loaded.
- Public mathematical references appear in the optional detail section directly below the corresponding discussion. Public credits point to the math stories; `ATTRIBUTIONS.md` records original authorship and the reference policy.

## Artwork and reproducibility

`python3 scripts/draw-math-topics.py` draws the first 21 concepts. `python3 scripts/draw-math-connections.py` draws the next 25, importing the shared rendering pipeline. Each command preserves the other generator’s manifest entries. It reuses the repository's original `Drawing` primitives from `draw-catalyst-figures.py`, without changing or regenerating chemistry assets. NumPy and Pillow run offline; they are authoring tools, not browser dependencies.

Outputs: `public/media/mathematics/topics/`. Each concept has wide and mobile static SVGs, pixel GIFs, pixel pause PNGs, and crisp GIFs: 368 files plus a manifest. Wide drawings are 900px across; phone drawings are 450px across with vertical stacking. Pixel drawing is at half logical resolution and enlarged 2× using nearest-neighbor sampling. GIFs contain 48 authored steps at 120ms, with identical frames merged while preserving the 5.76-second duration. Crisp GIFs are newly rasterized from the same drawing commands at 4× resolution, antialiased down to 2× display dimensions (1800px wide desktop, 900px wide phone), then encoded with a fixed 256-color palette per scene. They are not enlarged pixel GIFs. The fixed palette preserves static detail between frames and enables efficient delta compression. Every generated crisp frame is checked against the pixel frame’s vector-command sequence before encoding. The local system Menlo font is rasterized; no font file is distributed. The contact sheets are `assets/art-source/mathematics/topics/contact-sheet.png` and `connections-contact-sheet.png`.

`python3 scripts/verify-math-topics.py` validates mathematical invariants, SVG and raster-label bounds, dimensions, pause files, exact pixel blocks, GIF loop timing, and actual frame variation. It does not rewrite assets. `tests/math-topics.test.ts` checks the topic catalog, unique anchors, math routing, all eight variants per figure, and matching height metadata.

## Models and important distinctions

### Interpolation and experiments

- Runge function `1/(1+25x²)` on [-1,1]. Seven and eleven uniform samples demonstrate degree-six/ten behavior. Eleven-node remedies use global uniform interpolation, Chebyshev–Lobatto nodes, or local linear segments, on the same plot scale. Barycentric evaluation is original code.
- The noise example uses a cubic expected response plus seeded Gaussian noise; exact degree-ten interpolation is compared with a cubic least-squares fit to the same observations. The distinction between interpolation and regression is intentional.
- The surface is `0.12 + 0.65 exp(-((x-0.7)/0.09)²)(0.35+0.65y) + 0.10xy` on [0,1]². Piecewise affine interpolation splits each grid rectangle along its descending diagonal. Both meshes contain 7×7 vertices. The feature-aware x nodes are `[0,.48,.6,.66,.72,.8,1]`; y nodes remain uniform. Dense 101×101-grid RMSE is approximately .047 versus .027. Amber points follow each depicted representation, including its interpolation error. The known feature placement is an illustrative advantage, not an omniscient real-world design rule.
- Experiment coordinates represent a conditional mean under a specified protocol; repeated measurements can vary. Categories, feasible domains, history dependence, randomization, blocking, and replication are discussed. The five-run interaction picture compares axis-only samples against four corners plus a center for the synthetic response `.15+.70xy`; it is not claimed to fit a general quadratic.
- The sequential example actually computes a Gaussian-process posterior: constant mean .45, RBF length scale .18 and variance .12, observation-noise standard deviation .035. A fixed seed supplies noisy observations. Starting at `.08,.45,.9`, a candidate grid of 181 points maximizes `mean+1.5sd`, excluding candidates within .025 of an existing observation. Six posterior/acquisition states are shown. The illustration's true response is `.45+.24sin(7x)+.15cos(15x)`; the acquisition never receives that hidden function. Bands are ±1.96 conditional posterior standard deviations, not universal confidence guarantees. The text separates mapping, optimization, and confirmation.

### Functions and quantum mechanics

- Legendre curves use NumPy's polynomial evaluator. A 48-point Gauss–Legendre quadrature checks normalized overlaps and computes coefficients for the expansion of exp(x). The signed product is P1×P3: both positive and negative areas contribute to its zero integral.
- String modes are `sin(nπx)cos(2πnt)` with fixed ends, offered explicitly as a classical analogy for eigenfunctions. They do not derive quantum theory.
- Polar sketches use `abs(P_l(cosθ))` and its square, for l=0,1,2. These are proportional angular factors with illustrative radius scaling, not normalized 3D orbital isosurfaces, radial distributions, or trajectories. A separate normalized two-state example gives `cos²a + sin²a = 1` Born probabilities.
- Hilbert-space postulates, nonrelativistic/isolated-system models, central-potential assumptions, electronic approximations, finite bases, and solver errors are kept distinct. Foundational interpretation questions are not presented as a demonstrated failure of quantum mechanics.

### Matrices and electronic structure

- QR and Schur use a nonsymmetric 3×3 example orthogonally similar to `[[5,1.2,-.5],[0,2,.8],[0,0,.7]]`. Repeated QR steps accumulate the orthogonal similarity. The residuals and lower-triangle convergence are checked. General real Schur forms may have 2×2 blocks; production shifts/deflation are not simulated.
- The synthetic 24×32 data matrix combines three outer products with seeded noise. Actual SVD truncations at ranks 1,2,4,8 share one color scale. Frobenius residuals are checked against discarded singular-value energy. Important singular directions are distinguished from eigenvalue magnitude and from scientific importance.
- A fixed 32×8 Gaussian sketch of that matrix produces a 24×8 orthogonal basis and an 8×32 compressed matrix. The lifted rank-four approximation has relative Frobenius error about .042. This is a worked toy, not a benchmark or a general error guarantee.
- The warm-start picture uses two quadratic analytic surfaces with minima `(-.22,.12)` and `(.12,-.2)`. Gradient descent on the first initializes the second. It is not DFT and makes no speedup claim. Text separates occupied electronic states, preconditioning, solver accuracy, approximate electronic models, and final geometry/energy checks.

## Sources and attribution

`src/content/mathematics/sources.ts` contains the direct links. References include Chebfun, NIST's DOE handbook and DLMF, deal.II, NASA's CFD convergence tutorial, Frazier's Bayesian-optimization tutorial, Preskill's quantum notes, LAPACK, Halko–Martinsson–Tropp, Kohn's Nobel lecture, and Quantum ESPRESSO documentation. These were used for mathematical context and fact checking, not copied code, figures, prose, or datasets. The essays use original explanations and synthetic demonstrations. No external artwork license is needed because no external artwork is included.

## Verification (2026-11-08)

- All 21 Node tests passed, including article anchors/routes and every figure variant's presence and dimensions. Production TypeScript/Vite build, targeted Prettier check, and `git diff --check` passed.
- Offline validator passed for all 42 wide/mobile figure sets. It checks vector and actual raster-font label widths, loop durations and variation, exact 2× pixels, numerical residuals, nodal reproduction, normalized Gram overlaps, SVD tail identities, and the toy sketch/optimization checks.
- Browser reviewed all three routes at 1280×900 and 390×844. No horizontal document or equation overflow was found. Portrait sources were selected; pixel/crisp switching, global pause stills, in-page anchors, related-story links, return links, direct refresh, and keyboard entry from the featured card were verified.
- Shared chemistry story retained its chemistry banner, “Project story” accessible label, “Inside this project” caption, and seven existing figures. Browser logs contained no warnings or errors. Existing banner GIFs and chemistry article content were not modified.
- Screenshots in `docs/previews/2026-11-08/`: `math-featured-topic.png`, `math-topic-meshes.png`, `math-topic-matrices.png`, `math-topic-mobile.png`. Global motion was restored to playing after preview tests.

## Crisp animation and footer refinement

All current and future math figures made with `mathFigure` have animated crisp companions through its shared metadata. `figureSources` selects both styles consistently: GIFs while motion plays, PNG (pixel) or SVG (crisp) while paused or reduced motion is active. Legacy chemistry figures without a crisp GIF keep their static SVG behavior. Full-size crisp links open the GIF while playing and the SVG while paused.

The sequential Gaussian-process figure is now 900×600 in the wide layout and 450×960 in the phone layout. Each panel reserves 100 source units below the graph for ticks, the x-axis label, and a separate orange observation-status line. The validator checks at least 20 units of actual glyph separation between axis and status labels for both raster and vector text metrics.

The asset validator checks all 42 crisp GIFs for 2× dimensions, looping, 5.76-second duration, actual motion, and fine detail within the blocks that would result from upscaling pixel art. Renderer tests cover playing/paused source selection in both styles and unchanged legacy static diagrams.

Refinement verification: all 23 tests, the production build, targeted formatting checks, and asset validation passed. Browser checks confirmed the 1800×1200 wide crisp GIF and 900×1920 phone crisp GIF for the enlarged sequential figure, animated crisp sources on all three topic pages, and SVG/PNG fallback when paused. The x-axis and orange status text are separated in both styles. No browser warnings/errors were recorded; motion was restored and the viewport override cleared. Final desktop preview: `docs/previews/2026-11-08/math-crisp-sequential.png`.


## Symmetry, dynamics, and spectroscopy (2026-11-09)

The three new articles add 25 original concepts with eight variants apiece. Existing figures and banners are retained. The same 48-frame command sequence produces each pixel/crisp pair, including mobile layouts and motion-pause stills.

### Models

- Square group: eight integer matrices, an actual composition table, MRM=R⁻¹, invariant x²+y² and x²y². Three-dimensional sign changes distinguish C₂(z), σ(xy), and inversion. Endpoint operations are exact; connecting frames only illustrate the mapping. Crystal translations use a toy square lattice, not a measured structure.
- Handedness uses the signed volume of four labeled tetrahedral vertices; proper rotations preserve it and reflection changes its sign. SN2 is an umbrella-inversion geometry cartoon, not an energetic reaction model. Labels R/S require CIP reassignment after substitution. The illustrative active-pair curve is ee_out=2e/(1+e²), not Kagan data or a universal catalytic law.
- Lorenz uses RK4 at (σ,ρ,β)=(10,28,8/3), initial (1,1,1) versus (1.000001,1,1), dt=.005 for 40 model time units. A separate step-refinement plot compares dt=.02,.01,.005 against .0025 on a shared .02 grid; early errors converge, while long trajectories diverge. Euler’s y′=−y example separately shows numerical instability at h=2.2 versus decay at h=.5. The logistic map uses r=2.7,3.3,3.9 with a discarded transient.
- Coarse-graining shows the same 36 seeded, noninteracting periodic particles as positions, occupancy bins, and a profile; it does not derive fluid mechanics. The hydrogen radial distribution is 4r²e^(−2r) in Bohr units; H⁻ is schematic. H ionization and extra-electron detachment are distinct energy differences.
- Chiral feedback first uses the symmetry-breaking normal form q′=μq−q³. Potential, time evolution, and parameter bifurcation are separate panels. The second model uses L′=L(1−L−3D), D′=D(1−D−3L), RK4 dt=.01, initial .501/.499, time 30. It is an effective open competition model with stable axis states and a symmetric saddle, not a mass-balanced closed reaction or Soai simulation. An exactly symmetric deterministic initial state does not select a side. These models do not settle life’s homochirality.
- Fourier figures compute finite heat modes, eight-sample phasor sums, and an original radix-two butterfly checked against a direct DFT and NumPy. NMR uses 512 complex samples at 512Hz with damped components at 12,28,47Hz, decay constants .35,.5,.25s and amplitudes 1,.65,.4. FTIR uses synthetic reference/sample spectra with 256-point inverse transforms; transforming back and taking −log₁₀ of their intensity ratio recovers the constructed absorbance.
- Scan averaging uses 16 independent seeded complex-noise realizations and averages 1,4,16 of them. The acquisition duration stays fixed. Resolution compares 32 samples of 40/44Hz resonances at dt=1/256s, the same record padded to 4096, and 256 genuinely measured samples. Apodization exponentially weights a .15s decay with seeded noise and compares normalized peak shapes. Aliasing shows 8 and 40Hz cosines agreeing at every sample when fs=32Hz.

### Scientific framing and attribution

Direct sources include IUCr crystallography, IUPAC chirality/CIP definitions, OpenStax SN2, Kagan and Soai’s original papers, Frank’s amplification model, Lorenz’s paper, Hilbert’s original 1900 lecture, NIST hydrogen data, Fourier’s 1822 treatise, Cooley–Tukey’s paper, FFTW definitions, SDSU/Weizmann NMR teaching, and Shimadzu FTIR documentation. ACS’s 2026 Nobel coverage was checked for the joint award to Kagan and Soai. These sources supply context, not copied figures or code.

The prose distinguishes symmetry groups from invariant rings; σ planes from inversion centers; R/S from D/L and optical rotation; chaos from solver instability, many-body computational cost, and quantum-to-classical questions; and scan averaging from frequency resolution. Hilbert VI is described in its historical scope. Biological handedness is presented as a research question with exceptions and model-dependent feedback, not a solved universal equilibrium.


### Verification of the new stories

- All 23 Node tests and the TypeScript/Vite production build passed; catalog tests now cover all six routes and all 46 figures with their eight asset variants.
- The offline validator passed all 92 wide/mobile sets, including timing, motion, exact pixel blocks, crisp detail, label bounds, metadata, group invariants, orientation reversal, early RK4 refinement, competition equilibria, DFT agreement, FTIR round-trip absorbance, and sampling alias equivalence.
- Browser checks at 1280×900 and 390×844 confirmed the three new articles, all new crisp figure switches, phone sources, selectable wrapped equations without horizontal overflow, pause-to-SVG fallback, and related-story/back links. All six collection cards link to their stories, with the dynamics connection highlighted. No console warnings/errors were recorded. Motion was restored to playing and the viewport override reset after testing.
- Preview captures: `docs/previews/2026-11-09/chiral-dynamics.png`, `fourier-resolution.png`, and `fourier-mobile.png`.


## Diagram and project refinements (2026-11-09)

- The aliasing comparison now plots the continuous difference cos(2π·8t)−cos(2π·40t) against seconds, on the same time range as the two waves. Orange markers show the acquired samples at zero difference. The continuous curve between samples is intentionally visible in both animated styles.
- The SN2 cartoon now places the incoming nucleophile below the carbon and the departing leaving group above it, aligned with the vertical inversion of the spectator-bond umbrella. Wide/mobile pixel and crisp animations and their stills were regenerated together.
- The former “A paper taking shape” note is now a mathematics-only project, directly beside Catalyst Discovery on the mathematics page. `/projects/algebraic-structure-representations` is a clearly marked work in progress about algebraic structure representations, expected mid December 2026. Its banner follows the existing mathematics project context. The project progress metadata provides the status/date without the generic missing-media placeholder.
- The two refined figure concepts are previewed in `assets/art-source/mathematics/topics/refinements-contact-sheet.png`.

Refinement checks: all 23 tests, the production build, targeted formatting, and all 92 wide/mobile figure sets passed. Browser review confirmed the continuous aliasing difference, vertically aligned SN2 cartoon, pixel/crisp sources, phone sources, adjacent project cards, and the new project’s math banner, expected date, and absence of the generic missing-media placeholder. No browser warnings/errors or phone overflow were found. Screenshots: `docs/previews/2026-11-09/aliasing-refined.png`, `sn2-refined.png`, and `algebra-project-grid.png`.
