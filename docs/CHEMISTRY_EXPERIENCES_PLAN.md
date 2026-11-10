# Chemistry experiences content plan

Planning review, 10 November 2026. This is an authoring plan, not website content that is already implemented.

## Recommendation

Build a collection of short, illustrated **experiences from the laboratory** under Chemistry’s “More to explore.” Let each page begin with something concrete: an unexpectedly dim sample, two NMR peaks merging, a library search suggesting the wrong compound, or a spectrum whose colors overlap. The reader should meet a question, follow what I tried, and leave with one interesting idea.

The collection’s distinctive thread is already present in these reports: **I do the experiment, then ask whether the measurement and its mathematical treatment actually answer the question.** This can show chemistry, mathematical judgment and computation together without becoming another set of long mathematics tutorials or a list of course assignments.

Start with **five experiences**: tonic-water fluorescence as the featured story, variable-temperature NMR, spinach/chlorophyll fluorescence, the self-chosen FTIR samples, and universal-indicator decomposition. Keep ten further candidates in the backlog below. Fifteen is a content pool, not a recommendation to fill the first page with fifteen unfinished cards.

Only the “From the laboratory” part is being planned. Keep the existing research projects, “A different way to close a ring,” “Molecules in pictures,” and “Papers & presentations” outside this work. The reports and compilation are research material for writing; do not automatically offer them as public downloads.

## Review and branch state

- Fetched origin, switched to local main, and pulled `origin/main` with fast-forward only.
- Checked out the existing remote `origin/chemistry-section-implementation` as local `chemistry-section-implementation`, then brought main into it. Both local main and this branch were at `1cc8405` after that update, including the merged playground work.
- Inventoried **19 PDFs, totaling 803 PDF pages** including the 199-page compilation and extensive appendices. These are not 19 independent experiences: `Book.pdf` is an edited compilation, and the three numbered IR supplements belong to one experimental sequence.
- Reviewed report narratives, results/discussion, selected calculations and printed scripts; extracted the complete available text into temporary review files. Rendered 14 selected source pages to check figures and equation layout, including the NMR temperature stack, fluorescence data/calibration, indicator comparison and rotational-spectrum simulations. The review is not a claim to have independently validated every appendix calculation or every raw-data entry.
- Original PDFs were left unchanged. No TS/JS, routes, page components, public artwork or publication files are implemented in this round. This Markdown file is the only new repository authoring artifact.

All page references below mean **physical PDF page numbers**, not printed chapter pagination. The source directory is `/Users/hydrochlorine/Cornell/Honor Lab Reports and things/`.

## How the collection would fit the site

### Entries and navigation

Use one page family, for example **`/chemistry/experiences/:slug`**. These are paths on the existing website, not separate DNS subdomains. All of them should inherit the chemistry banner GIFs.

On the chemistry landing page, introduce “From the laboratory” with a short sentence such as “Small observations, a few detours, and things I learned at the bench.” Show:

1. A prominent tonic-water card, with a larger pixel study PNG, a one-sentence question and a gentle “A closer look” invitation.
2. Four smaller illustrated cards for the other first-wave experiences.
3. As the collection grows, a simple “All laboratory experiences” destination or expansion. Add filtering only when the amount of finished content justifies it.

Make the card image and title part of the same clear link. Course and date can be small context labels, not the main identity. Use curiosity-oriented titles rather than “CHEM 3020 Experiment 4.” These entries should not enter the project grid or masquerade as publications.

### Reading shape

Reuse the familiar article reading surface, clear headings, figure captions, references and motion preferences. Shorten the format:

- Most experiences: approximately **450–750 words**, two or three short sections, one or two purposeful figures, roughly a three-minute read.
- Featured tonic-water story: approximately **800–1,100 words**, three or four figures and an optional “The model, a little closer” disclosure.
- Start with a real observation or choice, then explain just enough chemistry to follow it. Use “I” for documented personal decisions and “we” for shared work/data where appropriate. Do not invent a scene, conversation, frustration or lab mishap merely to make the prose vivid.
- Optional details hold equations, calibration conditions and numerical checks. Do not reproduce report code listings, all apparatus settings, a literature-review introduction or a page of final concentrations.
- Close with what the experience changed in how I think or work, if supported by the record or confirmed by the author. A related chemistry experience or existing math article can be a quiet onward link.

This is an experience collection with mathematical ideas inside it. The mathematical idea supports the observation rather than determining a long chapter structure.

## First wave

### 1. Tonic water and a stubborn fluorimeter — featured

**Proposed route:** `/chemistry/experiences/tonic-water-fluorescence`

**Source:** CHEM 3020 `Expr 4.pdf`, especially PDF pp. 6–10, 23–30, 35–40; compilation chapter 3 is a second presentation of the same work. The embedded measurement tables are on pp. 8 and 24, the combined-analysis script begins on p. 27, calibration inputs are on p. 36, and the final appendix on p. 41 lists chemicals/instruments rather than a separate comprehensive measurement log.

**Reader’s question:** If tonic water glows, why is its brightness not a simple measure of how much quinine is inside?

**The actual experience:** Quinine provides fluorescence, chloride suppresses it, and dilution also weakens the signal. The author recalls a large baseline and poor accuracy at low fluorescence; that was a motivation for departing from the simple dilution-based approach and developing a quenching-aware analysis using several measurements. The report documents that motivation and the attempt to combine salt-addition series at different dilutions.

**Important clarification found during this review:** The nearly equal readings at 100× and 1000× dilution do not, by themselves, demonstrate an instrument failure. The script on p. 36 explicitly gives **different calibrations**:

| Sample dilution | Standard assigned 500 fsu | Nominal sensitivity |
| --- | --- | --- |
| 1000× | 0.25 ppm quinine | 2000 fsu/ppm |
| 100× | 2.5 ppm quinine | 200 fsu/ppm |

The sensitivity/dilution ratio is 2 in both cases. Near-equal raw readings are therefore understandable even for a linear detector before differences in quenching and background. The author’s recollection of poor low-signal performance remains valuable context; the calibration entries provide a documented explanation for this particular comparison. The report’s low-gain calibration also has a fitted intercept and residual scatter, but those are not equivalent to an independent blank/baseline characterization at both settings.

**Suggested story sequence:**

1. Introduce the glowing drink and two influences on the brightness: amount of quinine and its surroundings.
2. Explain why dilution was an awkward compromise on this instrument: less quenching, but less useful signal. Introduce the change in calibration range in everyday language.
3. Follow the alternative experiment: add known chloride, watch the signal change, and use the pattern rather than trust one low reading. Distinguish adding a quencher from conventional additions of the analyte itself.
4. Show what the analysis could estimate and where the information was weak. Keep the main accomplishment as adapting the measurement strategy and thinking through the model.

**Planned visuals:**

- **Study PNG:** tonic bottle, a blue-glowing cuvette, fluorimeter window and two small dilution/calibration labels. This is the featured thumbnail, with room for an original pixel glow effect in the body.
- A simple animation of an excited quinine molecule fluorescing or losing excitation through a quencher encounter. It explains the idea, not the trajectory of a measured molecule.
- A “choose a useful measurement range” figure: show the dilution tradeoff against a visible background/noise band. Clearly label an illustrative band unless actual blank/replicate data are available.
- A reconstruction of the printed salt-addition measurements, with distinct dilution/calibration labels. A small neighboring sketch can explain joint inference; avoid three decorative bars of incompatible units.

**How to describe the outcome:** The report lists 66.7 ± 9.1 ppm quinine and 0.1000 ± 0.3261 M native chloride. Those are reported estimates, not newly verified values. The chloride estimate has uncertainty greater than the estimate and coincides with a fitting upper bound. Do not make “accurately determined the salt concentration” the headline. Fluorescence probes chloride under a quenching model, not sodium independently; a sodium label does not establish that all sodium is present as NaCl.

The author remembers this producing one of the class’s most accurate results. Retain that as author-provided recollection in the planning record. A public numerical comparison should identify the reference value/comparison and how accuracy was assessed; agreement with a typical commercial value or a smaller residual is not itself an accuracy benchmark. The story does not depend on publishing a class ranking.

**Before using a “better model” comparison:** reconcile the printed model, calibration inputs, dilution/added-volume factors, baseline handling, parameter bounds and final concentration conversion. See the focused checks below. The qualitative experience and illustrative artwork can be written without waiting for every number to be reanalyzed.

### 2. Watching two NMR peaks become one

**Proposed route:** `/chemistry/experiences/two-peaks-become-one`

**Source:** CHEM 3030 `Expr 3.pdf`, pp. 1, 5–13; the temperature stack is on p. 8, representative fits on p. 9 and rate table on p. 10.

**What makes it personal and interesting:** A molecule does not have to change its composition for its NMR spectrum to look dramatically different. Heating a dimethylbenzamide derivative makes two methyl resonances broaden and eventually merge as exchange becomes fast on the observation timescale. The experience also includes checking what a fitting function assumes about peak shape rather than treating its output as unquestionable.

**Short reading path:** show the low-temperature pair; warm the sample and follow the stacked spectra; explain exchanging environments and the NMR timescale; briefly connect the changing line shape to an energy barrier. Keep the full Arrhenius analysis in optional details.

**Study PNG:** an NMR tube beside two luminous lines merging into one, with a small thermometer.

**Body figures:** one animated two-site exchange sketch synchronized with slow/intermediate/fast line shapes; one compact reconstruction of the actual temperature series. Changing exchange should alter the calculated line shape, not merely move two Gaussian peaks into each other.

**Editorial care:** say that I used/tested the Igor analysis function unless its authorship is established. Explain time averaging, not “the molecule stops having two environments.” Check rate conventions, line-shape simulation labels and confidence-interval arithmetic before featuring exact barriers or coalescence temperatures.

### 3. Spinach under a different light

**Proposed route:** `/chemistry/experiences/spinach-fluorescence`

**Source:** CHEM 3030 `Expr 5.pdf`, particularly pp. 4–10 and 11–18.

**The experience:** Extracting pigments from spinach and separating fractions leads to a question with a strong visual payoff: why does adding more fluorescent material eventually stop adding proportionally more signal? The actual table on p. 5 and the concentration plot on p. 8 give a clear rise followed by a plateau.

**Short reading path:** spinach to separated green fractions; absorbance helps choose a useful fraction; compare low-concentration fluorescence with the plateau; explain that excitation light can be absorbed unevenly and emitted light can be reabsorbed. Finish with the distinction between changing the molecule’s emission behavior and changing what light reaches the detector.

**Study PNG:** spinach leaf, narrow column with separated pigment bands, and a cuvette emitting red light.

**Body figures:** an illustrative split view of light penetrating dilute versus concentrated solutions; the actual concentration/fluorescence points with a modest, clearly identified model overlay. Quenching by benzoquinone can be a short continuation or later linked note, not another half of a long first article.

**Editorial care:** a fluorescence plateau alone does not establish its unique cause. Present inner-filter effects as the interpretation investigated, and avoid promoting the report’s inferred “Förster radius” as a measured molecular distance. This page should complement the tonic-water story: one concerns interfering quenchers and measurement range, the other concerns optical sampling within the sample.

### 4. When the spectral library suggests the wrong compound

**Proposed route:** `/chemistry/experiences/beyond-the-library-match`

**Source:** CHEM 3020 `Expr 6.pdf`, self-designed sample study on pp. 20–25, especially the berberine comparison on pp. 20–21 and formulated-tablet spectrum on p. 22.

**The experience:** The self-chosen samples make this more individual than a standard unknown-identification exercise. A known berberine sample receives misleading library suggestions; a formulated tablet produces a strong lactose-like spectrum. These are good reasons to ask what a search algorithm sees and what the sample actually contains.

**Short reading path:** introduce one known sample; reveal the unexpected library suggestion; compare a few diagnostic spectral features with the chemical context; use the tablet as a brief second example of a strong signal hiding a weaker component. The glove and drink-can coating can remain small supporting observations rather than four equally long case studies.

**Study PNG:** an FTIR trace, a small sample, and a search card with a question mark.

**Body figures:** measured spectrum with a few original annotations; a schematic tablet showing an active ingredient among excipients, linked to overlapping contributions. Redraw explanations rather than republish commercial spectral-library screenshots.

**Editorial care:** library match scores are similarity measures, not identity probabilities or mass percentages. Do not turn this into a claim about counterfeit medicine, contamination, or consumer safety. The coating comparison can discuss structural clues; it does not measure free BPA, migration into food or exposure.

### 5. Five dyes in one color

**Proposed route:** `/chemistry/experiences/five-dyes-one-spectrum`

**Source:** CHEM 3020 `Expr 8.pdf`, introduction, component spectra and decomposition in pp. 1–26, plus the especially interesting pH comparison on pp. 34–39. The comparison graphic is on p. 36.

**The experience:** A universal indicator looks like one solution but contains several dyes whose spectra overlap. The appealing turn is that changing pH can make a component easier or harder to see: a very good total-spectrum fit does not mean every component is equally well determined.

**Short reading path:** one colored mixture; separate reference spectra; reconstruct the mixture as weighted contributions; compare the acidic/basic analysis and explain why a nearly colorless component becomes difficult to estimate. Keep the matrix derivation optional and link the existing matrix article if helpful.

**Study PNG:** five colored drops feeding one cuvette and one combined spectral trace.

**Body figures:** an animated buildup of overlapping component spectra; an acidic/basic comparison in which phenolphthalein’s useful visible contribution fades. Include a real-data plot where numerical claims are made.

**Editorial care:** correct the report’s description of acidic phenolphthalein as “deprotonated”; avoid assuming intermediate-pH mixtures inherently violate Beer–Lambert additivity when references/speciation are properly matched. A residual-derived reduced chi-square near one is not independent validation. Do not describe the reported sum of fitted concentration fractions as a literal percentage of the entire bottled solution made of dye versus solvent.

## Further experiences to draw from

These remain individual possible entries, not tasks to implement all at once. Each would get its own study PNG and short page when developed.

### 6. A molecule’s flight time

**Route:** `/chemistry/experiences/ions-in-flight`

**Source:** CHEM 3030 `Expr 6.pdf`, pp. 3–9 and 14–16.

**Story:** Work with the teaching lab’s home-built VUV/TOF instrument: turn molecules into ions, separate them by arrival time, and see why tuning the source changes peak sharpness. A short continuation can show an ion signal appearing as photon energy crosses a threshold. Keep CO pump–probe lifetimes and isotopologue assignments for a later extension so this first visit has one clear through-line.

**Study PNG:** a glowing ion packet moving down a dark flight tube toward a detector. **Body figure:** equal-charge ions with different masses arriving at different times, alongside a real measured peak before/after source tuning if the recorded runs support that comparison.

**Care:** the apparatus was home-built, not claimed to have been built by me. Check energy conversions and TOF peak-width definitions before featuring numerical resolution or ionization-energy precision. The report’s cm⁻¹-to-eV conversions have clear inconsistencies; the qualitative experience is still useful.

### 7. Following a reaction as its color fades

**Route:** `/chemistry/experiences/a-reaction-in-fading-color`

**Source:** CHEM 3030 `Expr 7.pdf`, pp. 7–8, 14–20 and 21–31.

**Story:** Follow bromination through a changing absorbance trace. Finding an isosbestic wavelength makes the measurement less sensitive to redistribution between Br₂ and Br₃⁻. Then changes in concentration and an acetone/acetone-d₆ comparison give clues to the slower step in the mechanism.

**Study PNG:** amber cuvettes fading beside a small reaction clock. **Body figures:** spectra crossing at a highlighted wavelength, followed by two time traces or an H/D comparison.

**Care:** describe combined evidence supporting enolization as the slow step; neither a rate law nor the isotope effect proves a unique mechanism by itself. Separate cyclopentanone rate-order measurements from the acetone isotope comparison. The base-condition detour can be a brief documented observation, not a newly demonstrated alternative mechanism.

### 8. Two combustions and a missing heat

**Route:** `/chemistry/experiences/heat-by-a-different-route`

**Source:** CHEM 3030 `Expr 1.pdf`, pp. 7–15, supporting calculations on pp. 16–21.

**Story:** Estimate polymerization enthalpy indirectly by comparing combustion of monomer and polymer. A small desired difference is obtained from two much larger measurements, making calibration and shared uncertainty part of the experience.

**Study PNG:** monomer and polymer paths leading to the same glowing calorimeter. **Body figures:** a Hess-law cycle and one temperature trace showing why drift correction matters.

**Care:** resolve the report’s sign convention and inconsistent numerical summaries first. Positive reaction enthalpy does not mean exothermic under the usual convention. Because the same calorimeter calibration is used, its contribution to the difference must be treated with covariance rather than automatically counted as independent twice. Lead with the indirect-measurement idea, not a claimed precise polymerization value.

### 9. Changing an atom, shifting a spectrum

**Route:** `/chemistry/experiences/isotopes-in-the-infrared`

**Source:** CHEM 3030 `Expr 2.1.pdf`, `Expr 2.2.pdf`, `Expr 2.3.pdf`, and `Expr 2.pdf` together.

**Story:** The progression from simulated rotational envelopes to DCl, methane and a local C–H mode makes a strong observation-led introduction to molecular motion. Use isotope mass as the main question: what moves in a spectrum when the bonding is similar but the masses change? A small second scene can show a hotter rotational envelope spreading to higher levels.

**Study PNG:** two isotope-tagged vibrating molecules above shifted line combs. **Body figures:** mass substitution and its spectral shift; simulated versus observed line patterns. Save most branch fitting, Coriolis constants and long overtone extrapolations for optional details or a later extension.

**Care:** the CD₃H report explicitly analyzes a supplied digital spectrum. Say that I analyzed it, rather than implying I acquired every spectrum. Keep simulations, supplied spectra and collected measurements labeled separately; do not make four cards out of four files from one sequence.

### 10. The empty cell had a spectrum

**Route:** `/chemistry/experiences/the-empty-cell-spectrum`

**Source:** CHEM 3020 `Expr 5.pdf`, pp. 10–15; residual-based mixture adjustment on pp. 17–22 is a related optional ending.

**Story:** Even an empty transmission cell can show interference structure. Try two ways of estimating its path length, observe that they disagree, and ask what the instrument is actually plotting. This is a small, distinctive instrument experience rather than another general FFT tutorial.

**Study PNG:** an apparently empty cell with faint reflected beams and spectral fringes. **Body figures:** a ray-path illustration and a measured fringe interval. An optional inset can show the xylene mixture’s residual peaks shrinking over successive guesses.

**Care:** check mirror displacement versus optical path difference, cm/mm units and fringe counting before quoting a path length. Differences between successive mixture guesses are a convergence diagnostic, not automatically a validated measurement uncertainty. Keep this under experiences; it is not the planned “Molecules in pictures” gallery.

### 11. Sweeping the voltage, watching the chemistry

**Route:** `/chemistry/experiences/sweeping-the-voltage`

**Source:** CHEM 3020 `Expr 7.pdf`, pp. 3–10 and 10–16.

**Story:** An electrode sweep produces a response that changes with scan speed and solution conditions. Use the familiar redox couple first, then the acetaminophen sample to connect the trace with an everyday formulation. The interesting observation is how the return sweep and pH reveal behavior that a single concentration number hides.

**Study PNG:** three electrodes, a small medicine bottle and a looping voltammogram. **Body figures:** an animated sweep synchronized with the trace; a pH comparison or compact calibration example.

**Care:** retain reference-electrode labels. Do not headline a product-label discrepancy as a manufacturing or medication-quality conclusion. Revisit uncertainty and the report’s t-test before quoting significance; the concentration study can be told without that claim.

### 12. A mixture that added up to more than 100 percent

**Route:** `/chemistry/experiences/a-mixture-over-one-hundred-percent`

**Source:** CHEM 3020 `Expr 3.pdf`, pp. 12–18.

**Story:** A chromatogram separates several components, yet the fitted composition fails a physical mass-balance check. Follow the measurements, injection variability and normalization choices that led to inspecting the analysis itself. This could be a memorable short experience about using chemistry to question a numerical answer.

**Study PNG:** several GC peaks with a composition stack rising past a marked total. **Body figures:** the measured chromatogram or ratio trends, plus a simple mass-balance illustration.

**Care:** the impossible result is documented; the cause is not uniquely established. Do not repeat the report’s assertion that using a native component as a reference is inherently invalid because of dilution. Common dilution can cancel in area ratios under appropriate conditions; check the actual preparation, reference amount and response model. The report’s resolution equation also needs checking before a column-length claim is reused.

### 13. Tea, extraction, and an unexpected answer

**Route:** `/chemistry/experiences/tea-and-an-unexpected-answer`

**Source:** CHEM 3020 `Expr 2.pdf`, especially pp. 5–9.

**Story:** Use extraction to change the relative contributions of two overlapping absorbers, then solve for them. A negative fitted concentration invites a closer look at measurement quality, matrix assumptions and the separation in extraction behavior. The report records visible mold in one tea sample as a possible complication; preserve that as an observation, not a demonstrated sole cause.

**Study PNG:** a tea cup, two extraction layers and overlapping UV traces. **Body figures:** the same mixture before/after extraction; a small uncertainty illustration showing why two similar responses are hard to distinguish.

**Care:** negative estimates are diagnostic outcomes, not physical negative caffeine. This and the GC story share an “interrogating an answer” theme; publish one first rather than make the initial collection feel repetitive.

### 14. A half-life hidden in noisy counts

**Route:** `/chemistry/experiences/a-half-life-in-noisy-counts`

**Source:** CHEM 3030 `Expr 4.pdf`, pp. 4–5 and 9–12.

**Story:** Individual detector clicks are irregular, while enough counts reveal a distribution and a reproducible decay pattern. Focus on repeated counting and fitting a half-life instead of trying to turn shielding, distance, identification and safety regulations into one short article.

**Study PNG:** a detector and scattered dots organizing into a fading count curve. **Body figures:** low/high-count histograms and a decay fit with background made visible.

**Care:** p. 9 explicitly says the decay file was supplied by a classmate, with TA consent, after the author’s file was not saved. Credit that contribution if the dataset/curve is used, and confirm permission for public reuse. Do not describe the decay acquisition as entirely mine. Avoid the report’s circular claim of a zero-error gamma energy after using the assumed energy for calibration. This page would not provide radiation-handling instructions or safety certification.

### 15. Four unknowns on the final lab bench

**Route:** `/chemistry/experiences/four-unknowns`

**Source:** CHEM 3020 `Final Lab.pdf`, pp. 1, 4–27; calibration comparison and multi-wavelength discussion are especially useful.

**Story:** A compact closing experience about choosing evidence across different instruments: powder and film identification, a colored unknown and a fluorescent unknown. The strongest focus is deciding when several agreeing measurements are reassuring and when two calibrations disagree enough to deserve another look.

**Study PNG:** four anonymous sample containers beside small FTIR/UV/fluorescence windows. **Body figure:** a few deliberately selected evidence cards, not a diagram of every processing step.

**Care:** publish later, after the specific instrument stories, so this can connect rather than repeat them. Check the concentration units and the handling of correlated wavelengths. A weighted average does not automatically resolve disagreement between potentially biased calibrations, and library scores do not establish purity or exact polymer subtype.

## Focused checks before writing numerical callouts

These are internal authoring notes, not a proposed public section cataloguing mistakes. They apply when a result or superiority claim is reused; they do not prevent writing an experience around the documented observation.

### Tonic-water model and available data

The report contains enough numerical tables and embedded inputs to begin reconstructing the analysis. Start there rather than asking the author to locate the same information elsewhere. No original report script was executed in this review, and the reported fit was not independently reproduced.

1. **Known calibration change:** pp. 35–36 explicitly identify the 0.25 versus 2.5 ppm calibration standards and slopes 2000 versus 200. Treat these as experimental inputs. Because nominal sensitivity divided by dilution is equal, a shared unquenched signal amplitude can be consistent with a common stock quinine concentration in this particular configuration. The initial suspicion based only on similar raw readings is resolved; it must not be repeated as proof of instrument error.
2. **General measurement bookkeeping:** a candidate reconstruction should distinguish baseline `B_j`, sensitivity `g_j`, stock quinine `C_Q`, stock chloride `C_Cl`, sample dilution `D_j`, original aliquot volume `V_0`, and added salt volume `V_i`. An illustrative starting model is:

   `F_ij = B_j + g_j (C_Q / D_j) f_i / [1 + K (C_Cl f_i / D_j + C_salt V_i/(V_0+V_i))]`, with `f_i = V_0/(V_0+V_i)`.

   This is a proposed bookkeeping model, not a newly validated replacement. Inspect whether any volume correction was already applied to recorded values before applying it again. Free baselines/gains require enough independent calibration/blank information; adding unconstrained parameters does not manufacture information.
3. **Parameter identifiability:** at a single fixed dilution with unknown amplitude, K and native chloride, `F = F0/[1+K(C+x)]` only supplies two independent curve combinations. Independent calibration/known K or suitably linked additional datasets are needed to separate all quantities. Multiple calibrated dilutions can add information, but the amount of information must be checked rather than assumed from an optimizer returning a covariance matrix.
4. **Bounded chloride fit:** the code on p. 29 restricts native chloride to 0.001–0.1 M, while the reported optimum is 0.1000 M with an uncertainty of 0.3261 M. Examine active bounds, residuals and parameter sensitivity before interpreting that estimate as a precise chloride measurement. Dynamic/static parameter separation is a separate issue and should not be confused with this tonic-water fit.
5. **Reported result versus script output:** the prose on p. 25 converts F0 using the 1000× calibration; the script on p. 29 averages sensitivities and dilutions. These ratios happen to be equivalent for the printed matched configuration, but averaging them is not a general recipe. Some plotting code also hard-codes a slope of 200. Reproduce a single coherent calculation before publishing final values.
6. **Accuracy and baseline evidence:** the author’s recollection of a large baseline/poor low-intensity performance motivates the story. The 15.36 fsu residual scatter and the calibration intercept are in the report; independent blank/replicate characterization at each sensitivity is not established by them. Compare methods against a known sample or reference concentration if claiming improved accuracy, and distinguish repeatability, fit quality and accuracy.

### Other checks that affect story framing

| Experience | Check before promoting exact conclusions |
| --- | --- |
| Universal indicator | Residual-derived noise makes reduced chi-square near one largely a construction. Component fractions depend on reference normalization; their sum is not directly bottle composition. Use pH-matched references and check invisible-species conditioning. |
| Chlorophyll | Quenching curvature alone is not unique proof of a static mechanism; an effective spacing inferred from quencher concentration is not a validated Förster radius. Keep the first story focused on extraction, fluorescence and optical sampling. |
| Calorimetry | Sign convention, inconsistent table/script values and common-calibration covariance need reconciliation. The report itself gives uncertainty larger than the derived heat, so it cannot establish the sign precisely. |
| NMR | Check rate/linewidth conventions and the simulator comparisons. The reported activation-energy interval appears to use a standard error as though it were a 95% interval; recompute if used. |
| VUV/TOF | `1 cm⁻¹ ≈ 1.23984 × 10⁻⁴ eV`; 0.335 cm⁻¹ is approximately 0.0000415 eV, not 0.041 eV. Check the time-width/resolution convention, focusing calculation and calibration before numerical claims. |
| GC and caffeine | Distinguish observed nonphysical results from proposed explanations. Calibration errors, matrix conditioning and shared dilution/covariance matter; do not turn a plausible explanation into a confirmed cause. |
| CV and final practical | Reconcile SD versus standard uncertainty/SE, shared calibration and wavelength correlations, mM/µM/ppm labels, and what a comparison actually supports. |
| Radiation | Preserve borrowed-data attribution and distinguish an independent identification check from a calibration using an assumed identity. |

## Visual and content production plan for a later round

- Give every completed experience an **original pixel PNG study image**, consistent in crop and palette with the existing math studies. A proposed master grid is 384 × 216 with short alt text describing the subject; avoid tiny embedded title text. Topic, not course number, should be recognizable from the art.
- Keep the dark chemistry tone: blue/cyan fluorescence for quinine, a warm/red chlorophyll emission, a quiet thermal gradient for NMR and restrained dye colors. These are authoring directions, not a new global palette or frontend redesign.
- Use a still for each card. Add body animation only where movement explains something: exchange/coalescence, photons and quenchers, accumulation of spectral contributions, or ions in flight.
- For paired pixel/crisp animations, use the same computed frames and timing, with independent sharp rendering for the crisp version. Supply motion-paused stills and phone compositions. Numerical plots need readable axes and labels; “pixel” must not mean an unreadable downsampled screenshot.
- Separate **measured data**, **data reconstructed from printed report tables**, **schematic animation**, and **speculative next experiment** in captions. Never make synthetic points look like recovered experimental measurements.
- Prefer original diagrams and plots from cleared data. Existing reports contain commercial library output, external structures/reference spectra and course material. Do not copy a whole screenshot or redistribute a report just because it is inside the supplied folder. Retain applicable citations and check reuse terms for anything actually reused.
- Keep source maps and credits in the content record for each page; preserve collaborator contributions. A student exercise is valuable experience without needing to claim a new published method or sole invention of an instrument/macro.

## Source inventory

The links below are local authoring references, not proposed public downloads. The compilation provides context and an edited narrative but should not be counted again as separate experiments.

| Local source | Pages | Role in the plan |
| --- | ---: | --- |
| [3020 compilation](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3020/Book.pdf>) | 199 | Preface and edited synthesis of analytical methods; overlaps the individual reports. |
| [3020 experiment 2](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3020/Expr 2.pdf>) | 10 | Caffeine/theophylline, extraction and uncertainty. |
| [3020 experiment 3](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3020/Expr 3.pdf>) | 19 | GC mixture, standard additions and mass-balance questions. |
| [3020 experiment 4](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3020/Expr 4.pdf>) | 41 | Featured tonic-water fluorescence experience. |
| [3020 experiment 5](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3020/Expr 5.pdf>) | 32 | Liquid FTIR, fringes, path length and null analysis. |
| [3020 experiment 6](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3020/Expr 6.pdf>) | 32 | Self-chosen solid samples, sampling methods and spectral-library interpretation. |
| [3020 experiment 7](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3020/Expr 7.pdf>) | 30 | CV, scan speed, pH and acetaminophen. |
| [3020 experiment 8](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3020/Expr 8.pdf>) | 84 | Universal indicator, multicomponent fitting and pH-dependent observability. |
| [3020 final practical](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3020/Final Lab.pdf>) | 70 | Cross-instrument unknowns and calibration decisions. |
| [3030 experiment 1](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3030/Expr 1.pdf>) | 29 | Calorimetry and indirect polymerization enthalpy. |
| [3030 spectrum simulation](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3030/Expr 2.1.pdf>) | 20 | Simulated line spectra and temperature/parameter changes. |
| [3030 DCl analysis](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3030/Expr 2.2.pdf>) | 7 | Rotational branches, simultaneous fits and isotope reasoning. |
| [3030 methane analysis](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3030/Expr 2.3.pdf>) | 9 | Methane branches, Coriolis treatment and comparison of fitting approaches. |
| [3030 experiment 2](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3030/Expr 2.pdf>) | 11 | Supplied CD₃H spectrum, local modes and overtone extrapolation. |
| [3030 experiment 3](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3030/Expr 3.pdf>) | 28 | Variable-temperature NMR and exchange. |
| [3030 experiment 4](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3030/Expr 4.pdf>) | 26 | Counting statistics, decay and source provenance. |
| [3030 experiment 5](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3030/Expr 5.pdf>) | 38 | Chlorophyll extraction, fluorescence and quenching. |
| [3030 experiment 6](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3030/Expr 6.pdf>) | 53 | VUV/TOF, ionization threshold and pump–probe/isotope extensions. |
| [3030 experiment 7](</Users/hydrochlorine/Cornell/Honor Lab Reports and things/3030/Expr 7.pdf>) | 65 | Bromination kinetics, isosbestic monitoring and H/D comparison. |

## Reference checks and implementation order

A few primary references help keep the eventual explanations precise; they are citations, not sources of copied art or passages:

- [IUPAC Stern–Volmer kinetic relationships](https://goldbook.iupac.org/terms/view/S06004): anchors the meaning of the quenching relation and lifetime/rate factors.
- [NIST Principles of Quantitation: Chromatography](https://www.nist.gov/publications/principles-quantitation-chromatography): calibration, internal standards and standard addition should be distinguished carefully.
- [NIST calibration data analysis and model validation](https://www.itl.nist.gov/div898/handbook/mpc/section3/mpc365.htm): fitting and validation have different roles.
- [IUPAC Förster-resonance-energy transfer](https://goldbook.iupac.org/terms/view/FT07381): avoid calling any quencher-distance estimate a Förster measurement.
- [NIST CODATA conversion table](https://physics.nist.gov/cuu/pdf/wall_2022.pdf): unit conversion check for the VUV account.

In the next implementation round, settle the shared short-experience format with the **tonic-water and NMR pages first**. Then add the FTIR sample story, spinach and dye mixture so the landing page has a varied first five. Reconstruct the featured numerical figure from the existing embedded data and document assumptions before using a “more accurate” callout. Expand from the remaining candidates when each has a good observation, a clear visual and enough verified context to stand alone. Full derivations, reports, code archives and further experiments remain optional later additions, not prerequisites for the shorter experience pages.
