# Chemistry snippets / implementation

Implemented on `chemistry-section-implementation`, 2026-11-10. The source review and original fifteen-story plan remain in `CHEMISTRY_EXPERIENCES_PLAN.md`.

## Visitor experience

`/chemistry` shows tonic water, NMR exchange, and spinach by default. An “Expand all snippets (12 more)” button reveals the other twelve; “Show fewer snippets” folds them again. Folded cards are unmounted so their GIFs are not requested by the collection. The whole animated-scene/title/summary card is one keyboard-accessible link. Every story lives at `/chemistry/snippets/:slug`, inherits the chemistry banner, has its own title, and links back to the collection and onward to another snippet. Ring-closing research, Molecules in pictures, and Papers & presentations remain outside this implementation.

There are 48 figure concepts: five for tonic water, four for radioactive counting, and three for every other story. Each offers Pixel sketch (default) and Crisp diagram, both animated from exactly the same frame commands. The existing global motion setting substitutes static PNG/SVG companions for both styles. Figures load lazily; article bodies form a separate route chunk so other visitors do not download all the new prose upfront. The collection metadata is separate from the article bodies.

## Content and assets

- `src/content/chemistry/experiences/index.ts`: lightweight cards/titles/route slugs.
- `src/content/chemistry/experiences/articles.ts`: fifteen chemistry snippets, captions and optional notes.
- `src/pages/subjects/ChemistryExperiencePage.tsx`: shared snippet presentation and onward navigation.
- `scripts/draw-chemistry-experiences.py`: original scientific/physical drawing recipes and synthetic models.
- `public/media/chemistry/experiences/`: fifteen animated teaser GIFs and PNG pause companions (768×432, drawn at 384×216), the original preview PNGs retained as legacy art; eight assets per body figure (wide/phone × pixel GIF, pixel PNG, crisp GIF and SVG), plus manifest.
- `assets/art-source/chemistry/experiences/`: review contact sheets and browser screenshots.

Wide figures use a 900×600 logical canvas; phone compositions use 450×1000 with vertically stacked panels. Crisp GIFs are independently rasterized at 4× and antialiased to 2× logical resolution, never upscaled from pixel frames. Each loop is 48 frames at 120 ms (5.76 seconds); GIF encoders may combine unchanged frames. The manifest records per-layout dimensions, sizes, durations and command hashes. Total new public artwork is about 36 MB, loaded selectively rather than all at once.

## Scientific boundaries

The reports are source material, not instructions to execute their embedded scripts. No embedded report code was run, and no report PDF, course handout, commercial spectral-library output, or product photo is copied into the public directory.

Tonic-water figure data: CHEM 3020 Expr 4, printed PDF page 24. At 1000-fold dilution, readings are 137.1, 74.4, 61.5, 52.4, 48.9 fsu for 0, 10, 20, 30, 40 µL additions of 6.14 M salt to 5000 µL. The 100-fold readings are 127.4 and 48.5 at 0 and 10 µL. The displayed added chloride includes added volume. Page 36 documents different calibration slopes: 2000 and 200 fsu/ppm respectively. Thus nearly equal initial displayed readings do not establish an instrument malfunction. The user’s recollection of a large baseline and poor weak-signal accuracy remains explicitly a recollection. The article explains the linked-dilution model idea but makes no newly validated superiority claim. The reported quinine estimate is labeled as reported; the chloride fit reaches an upper bound with very large uncertainty, discussed in optional notes. Chloride is not an independent sodium determination.

Chlorophyll figure data: CHEM 3030 Expr 5, page 5. Concentrations 0.909, 1.25, 1.67, 2.5, 3.33, 5, 6.67, 7.5 µM; signals 168, 222, 275, 366, 418, 484, 500, 502 fsu. No unique plateau mechanism or molecular distance is inferred.

GC percentage bars quote 26.10%, 61.92%, 25.91% (sum 113.93%) from CHEM 3020 Expr 3 as an inconsistent result, not validated composition. Native standard presence alone is not declared invalid. The NMR animation uses an equal-population two-site exchange response, with fixed 73.4 Hz separation and illustrative rates; lab work used provided Igor tools. The reaction crossing is synthetic at 440 nm, distinguished from the report’s near-426/444 nm crossings. The acetone isotope experiment is distinguished from the cyclopentanone rate series. Calorimetry omits disputed reported heat/sign values. IR spectra are identified as illustrative or supplied where appropriate. All remaining plots are synthetic teaching examples. Shared counting data are credited to Stephanie Chen but not redistributed.

Other source report references and care notes are in the plan. Primary definitions/reference links appear in optional article notes. The recalled tonic-water brand is Schweppes from Wegmans; exact package/lot is unconfirmed. No brand photograph or logo is used.

## Reproduction and validation

Use the project Python environment with NumPy and Pillow:

```sh
python3 scripts/draw-chemistry-experiences.py
python3 scripts/verify-chemistry-experiences.py
npm test
npm run build
npm run lint
```

The read-only asset verifier checks model sanity, all 92 wide/phone sets, label bounds, raster dimensions, true crisp rasterization, visible animation, durations and pixel-grid integrity. Generation itself asserts identical vector commands at every frame for pixel and crisp views. Node tests check all fifteen pages, 46 concepts, eight asset paths per concept, dimensions, motion fallbacks, unique anchors and chemistry banner context.

Browser QA: all fifteen routes checked at desktop 1280 px and phone 390 px, with three/four figures and pixel defaults; no horizontal overflow. Pixel→crisp uses the correct animated asset, including the 900×2000 phone GIF; global pause swaps styles to PNG/SVG. Collection cards, navigation, report-vs-illustration captions, unknown-route fallback and console errors are checked. Screenshots are retained with source art. Public credits and `ATTRIBUTIONS.md` record provenance.

Validation result (2026-11-10): production build passed; 34 Node tests passed; 92 figure/layout sets passed the read-only asset validator. Browser checks found no console errors and no horizontal overflow at 1280 and 390 px. The production article route chunk is approximately 35.25 kB (13.54 kB gzip); the main chunk remains below Vite’s 500 kB warning threshold. Lint exits successfully with six pre-existing warnings in weather/footer/playground files; none originate in these changes. The temporary preview tab and owned preview server are closed after QA.


## Animated preview revision / 2026-11-10

All fifteen collection previews have been remade as original midnight laboratory scenes. Each 12-second loop is drawn at 384×216 and exported at 2× with nearest-neighbor scaling and a shared per-animation 96-color palette. Separate composed stills support the site's global pause and reduced-motion preference. Metadata uses `previewGif` for motion and `preview` for stills. The body figures and their pixel/crisp selectors are independent and unchanged.

`animate-chemistry-previews.py` owns the new `*-preview.gif` and `*-preview.png` files and `previews-manifest.json`; the older body-figure generator does not overwrite them. Source contact sheets, three storyboard sheets and desktop/phone browser screenshots are in the art-source directory. Reproduce/check with:

```sh
python3 scripts/animate-chemistry-previews.py
python3 scripts/verify-chemistry-previews.py
```

| Experience | Teaser animation |
| --- | --- |
| Tonic water | Bottle, UV source, blue-fluorescing tube, three spoonfuls of white salt, progressively disappearing glow; liquid volume remains constant. |
| NMR | Computed two-site exchange curves merge as a thermometer rises. |
| Spinach | A veined leaf bobs and stretches gently; concentration darkens a fixed-volume cuvette and shortens light penetration. A small packed column sits behind the leaf. |
| Spectral library | KBr grinding, a mini-press with threaded bolt/socket wrench, then transmission through a thin disc with selected beam colors attenuated. |
| Five dyes | Five colored contributions accumulate into a stacked spectral shape and shared outline, inspired by the author's supplied decomposition figure. Curves are stylized synthetic shapes, not transcribed measured spectra. |
| TOF | A laser pulse initiates three particles with different speeds; each reaches and registers at the detector before reset. |
| Reaction rates | Three stirred yellow solutions fade at different rates until all are clear, without draining their vials. |
| Combustion | Two cutaway calorimeters compare separate and connected molecular units, ignition and different thermometer rises. The comparison is illustrative, not a numerical thermochemical prediction. |
| Methane / IR | Symmetric stretching, asymmetric stretching and bending in tetrahedral molecule sketches. Motions are conceptual rather than fitted normal-mode eigenvectors. |
| Empty cell | Full interferogram, growing center-to-ghost distance marker, highlighted ghost region and magnified side view. No disputed optical-path conversion is quoted. |
| CV | Forward and reverse scans gradually draw the full voltammogram. |
| GC | Paper scrolls upward beneath a horizontally moving stylus, drawing colored peaks with time along the vertical strip. |
| Tea | Two nearly overlapping spectral shapes shift; their small difference and an estimate move across zero beside a steaming cup. |
| Counting | Original trefoil, a suspended cylindrical detector above a sample plate, radiation dots and counting pulses. |
| Unknowns | Powder, a flexing film strip, a moving liquid surface, and a softly glowing solution on one rack. |

The spinach body now records the author's clarification: a 50:50 celite/granulated grocery sugar packing chosen for faster elution and larger sample loading. Broader article rewrites remain for a later content-focused round, as permitted in the request.

Validation: all fifteen exported GIFs have visible motion, 12-second looping duration, exact 2× pixel grids and 768×432 pause companions. Rendered-behavior checks cover fluorescence loss, all three reaction vials clearing, three TOF arrivals and the two unequal thermometer rises. All 35 Node tests and the production build pass. Desktop 1280px and phone 390px browser checks verify 3→15→3 cards, keyboard Enter/Space operation, aria-expanded state, no horizontal overflow, all-GIF/all-PNG motion switching (including expansion while paused), the spinach text, and no console errors. Old article asset tests still pass. Browser proof: `revised-cards-desktop.png`, `revised-collection-desktop.png`, and `revised-collection-phone.png`.

## Chemistry snippets / body rewrite, 2026-11-11

The visitor-facing collection is now called **chemistry snippets**. Each of the fifteen bodies has been rewritten around a real question, the work done, the chemical/mathematical reasoning, and the supported outcome. Course-number labels are removed from cards and articles. The collection introduction now describes things learned and practiced as a chemist, including both satisfying results and questions needing more deliberation. The first three cards and expand/collapse behavior are retained.

Canonical detail routes are `/chemistry/snippets/:slug`. Old `/chemistry/experiences/:slug` URLs redirect with query strings and fragments preserved. Internal asset/source directory names remain stable so existing media URLs keep working.

The prose is grounded in the already reviewed private reports rather than invented experimental work. Specific anchors include the dimethylbenzamide derivative and 263–333 K variable-temperature NMR series; celite/sugar chlorophyll separation, 436 nm excitation and 662 nm absorbance measurements; KBr-prepared berberine and a formulated tablet; the universal-indicator reference spectra; VUV/TOF source behavior; cyclopentanone initial rates versus the distinct acetone isotope comparison; methyl methacrylate/PMMA combustion; methane/CD₃H line assignments; empty ZnSe-cell echoes; ferricyanide/ferrocyanide and acetaminophen voltammetry; the solvent after-wash mass balance; caffeine/theophylline extraction equations; the shared decay dataset; and the four unknown identification/concentration tasks.

The tonic-water snippet now introduces and explains the Stern–Volmer relation before discussing the linked-dilution strategy. A new paired pixel/crisp animation shows F/F₀ falling while F₀/F becomes linear. A second new paired figure explains gamma-energy spectra and pulse-height sorting. This brings the body collection to **48 figure concepts / 96 wide-phone sets**. Both additions include moving styles and static pause companions.

Scientific distinctions preserved or corrected in the new prose:

- Fluorescence ratios require compatible fluorophore concentration, calibration and background; the first tonic-water reading already contains native chloride and is not an unquenched reference. The reported quinine estimate is identified as reported, and native chloride remains poorly constrained.
- The NMR analysis used the supplied Igor exchange function; its authorship is not claimed. Reported barrier precision is not overstated.
- Optical attenuation/reabsorption is distinguished from changes in intrinsic emission. Benzoquinone stock mixtures held chlorophyll concentration fixed.
- Least-squares dye weights are reference-relative contributions, not percentages of the entire solvent-containing bottle; pH matching and weak visible phenolphthalein information are explained.
- The calorimetry sign inconsistency is acknowledged; no precise successful polymerization heat is claimed.
- A native GC reference is not declared inherently invalid; factors that cancel in a ratio are distinguished from those that remain.
- Stephanie Chen's shared decay measurements are credited in the main text. The reported 2.56 ± 0.05 minute half-life is distinguished from the synthetic figures. The assigned 662 keV photopeak was a calibration anchor, not independent zero-error confirmation. The original report's near-180-keV Compton-edge assignment is not repeated; the ideal single-scatter electron-energy limit for 662 keV is about 478 keV.
- The report's colored unknown used UV–vis, while its fluorescent unknown used fluorometry. The preview groups two colored solutions in a stylized optical measurement scene, as requested; the body retains the actual distinction. Powder identification is separated from the more tentative polymer subtype assignment.

Primary reference checks: [IUPAC Stern–Volmer definition](https://goldbook.iupac.org/terms/view/S06004), [Brookhaven evaluated barium decay data](https://www.nndc.bnl.gov/nudat3/getdecaydataset.jsp?dsid=137cs+bM+decay&nucleus=137BA), and the previously linked NIST chromatography reference. Links are present in the relevant optional reading sections; private source reports are not republished.

Preview revisions:

1. The interferogram camera enlarges the full interval between the centerburst and right ghost, and the animated measurement spans those two features.
2. Bottle label corrected to TONIC WATER.
3. Detector redrawn as an opaque red housing with black caps, handle and cable, guided by the user's photograph. Its screen accumulates a physically motivated illustrative energy histogram with a photopeak, partial-energy continuum and low-energy structure. No product photograph is copied.
4. Four unknowns redrawn as two colored solutions in an optical instrument and two colored solids in an IR sampling stage. The stills now capture a more developed phase of the animations.

Validation: production build and 36 Node tests pass. Asset checks cover all fifteen preview loops and all 96 body layout/style sets, including motion parity, pause images, dimensions and label bounds. Browser checks cover the renamed collection, all fifteen canonical stories on desktop and phone, legacy-route redirects, the first-three disclosure, new figure controls, and absence of course labels/horizontal overflow. Screenshots are retained with the source artwork.
