# Illustrated mathematics topics

Three original articles extend the math collection under `/mathematics/topics/`:

| Route | Story | Original figures |
| --- | --- | --- |
| `mind-the-edges` | Runge interpolation → remedies → meshes → experimental design | 8 |
| `a-family-of-curves` | Legendre families → orthogonal projection → angular quantum states → modeling assumptions | 7 |
| `same-matrix-new-view` | Dense cost → QR/Schur → truncated SVD → randomized sketches → electronic-structure warm starts | 6 |

The first three picture-and-copy cards are full links. Interpolation is featured across the collection width, with an explicit experiment-design question. Remaining topics keep their existing sketches until their articles are written. Back links, in-article anchors, and links to the other two stories support navigation. Topic titles update the browser title; direct routes use the existing SPA fallback. The math context keeps the established rotating math banners; the Catalyst story still resolves to chemistry.

## Content and rendering

- `src/content/mathematics/` holds the three stories, shared figure helper, references, and topic catalog. These are conceptual essays, not claims of completed research or new experimental methods.
- `MathematicsTopicPage.tsx` uses the existing `ProjectArticle` renderer. Optional `kind: 'topic'` changes the accessible label, contents caption, details summary, and reference caption. Equation blocks, detail paragraphs, and per-table captions generalize the renderer; existing chemistry defaults are preserved.
- Equations are selectable Unicode text, with wrapping on phones. No math-rendering service, external font, or new runtime dependency is required. The typeset examples use real matrices; complex analogues are explained where useful.
- Figures default to pixel animation while motion plays, switch to PNG when paused, and offer a crisp animated GIF view. Both styles animate from the same 48 source frames and timing, with portrait companions. Paused crisp views use the retained static SVGs. Changing topics remounts the article so figures start in the default style. Images are lazy loaded.
- Public mathematical references appear in the optional detail section directly below the corresponding discussion. Public credits point to the math stories; `ATTRIBUTIONS.md` records original authorship and the reference policy.

## Artwork and reproducibility

`python3 scripts/draw-math-topics.py` draws all 21 concepts. It reuses the repository's original `Drawing` primitives from `draw-catalyst-figures.py`, without changing or regenerating chemistry assets. NumPy and Pillow run offline; they are authoring tools, not browser dependencies.

Outputs: `public/media/mathematics/topics/`. Each concept has wide and mobile static SVGs, pixel GIFs, pixel pause PNGs, and crisp GIFs: 168 files plus a manifest. Wide drawings are 900px across; phone drawings are 450px across with vertical stacking. Pixel drawing is at half logical resolution and enlarged 2× using nearest-neighbor sampling. GIFs contain 48 authored steps at 120ms, with identical frames merged while preserving the 5.76-second duration. Crisp GIFs are newly rasterized from the same drawing commands at 4× resolution, antialiased down to 2× display dimensions (1800px wide desktop, 900px wide phone), then encoded with a fixed 256-color palette per scene. They are not enlarged pixel GIFs. The fixed palette preserves static detail between frames and enables efficient delta compression. Every generated crisp frame is checked against the pixel frame’s vector-command sequence before encoding. The local system Menlo font is rasterized; no font file is distributed. The contact sheet is `assets/art-source/mathematics/topics/contact-sheet.png`.

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
