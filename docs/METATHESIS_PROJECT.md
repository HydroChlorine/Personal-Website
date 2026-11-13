# Metal-free ring-closing metathesis project

Implemented on `chemistry-section-implementation`, after fetching and fast-forwarding to merged `origin/main`, 13 November 2026.

## Source and editorial choices

Primary source: the user-supplied `Hydrazine_Mediated_RCM_Manuscript_Editing-Fifth_Draft.docx` (SHA-256: eb1533a82bfb45485259029e16d9861434ce73ffb053d48bf0e13fc2f5200923). Read the complete manuscript text and visually inspected its rendered schemes/tables, especially Figures 2–6. The raw DOCX, its temporary PDF conversion and extracted manuscript images are not bundled in the public site. It contains no tracked changes; the draft still has placeholder entries in portions of its scope and end matter. Those unfilled values are not repeated in the story. No journal, acceptance, DOI, release date or public preprint URL is invented.

Lichen clarified that the write-up should present the shared two-person research effort as a project talk, rather than divide tasks between individuals. The page therefore uses “we” for project work and credits the manuscript authors Chengyi Fan, Lichen Huang and Tristan Lambert together. It does not assign experimental tasks or claim sole authorship. “Published” in the Project readiness field means the website article is ready; the article explicitly says the research manuscript is being prepared for journal submission.

The eight sections cover target ring formation, metal [2+2] versus hydrazonium [3+2] platforms, the proposed relay, substrate/condition development, additive compatibility, synthetic scope, designed catalytic turnover, and evidence/future questions. Optional notes contain conditions and literature context. The overall voice follows the earlier Catalyst Discovery project, without turning the story into an experimental procedure or manuscript transcription.

## Chemistry and data boundaries

- The opening illustration now explicitly follows a conventional metal-methylidene RCM cycle, through two metallacyclobutanes to a six-membered cyclic alkene, ethylene and regenerated metal methylidene. Atom identities are conserved through both exchanges. This is distinguished from the hydrazonium relay, whose coproducts are initiator-derived styrene and a coproduct hydrazonium, not the metal cycle’s ethylene.
- The hydrazine reagent is the di-HBF4 salt of 2,3-diazabicyclo[2.2.2]octane; the standard aldehyde is pentafluorobenzaldehyde. Standard ring closure uses one equivalent of each. No blanket claim of general catalysis, mild conditions, measured zero trace metal, greener processing or universal metal-catalyst superiority is made.
- Figure 3 data: N-tosyl substitution 44→77% NMR; brominated O-linked nPr/H example 50% NMR; omission controls zero; EtOH 8%; NMP 66%; low hydrazine screen 48%. The optimized parent 81% is an isolated yield. The 48% screen and 78% catalytic result are different experiments.
- Figure 4 A/B pairs, NMR yields: phenylacetylene 72/0, styrene 60/59, N-methylaniline 69/23, primary amine 40/0, phenylacetic acid 99/33, thioether 88/42, thiol 65/0, water 68/29. A/B protocols differ in reagent loading, solvent, temperature and setup; B is first-generation Grubbs, not all Ru methods. Bar values remain fixed while highlights move.
- Figure 5 selected isolated yields: NTs parent 81%, 6-Me 99%, N-acyl 64%; parent chromene 37%, 6-CO2Me 78%, phenyloxazole example 22%; helicene 76%, pyrene 8%. Medicinal scaffold connections are not biological activity measurements. The new growing fused aromatic chain is a schematic of bottom-up construction, not a specific scope product or a polymerization claim. The public aromatic-construction caption reads “The scope includes arene oligomer/polymer (70)” and omits its yield. The earlier loose helicene silhouette has been removed.
- Figure 6: 20 mol% hydrazine, one equivalent of aldehyde, 78% isolated phenanthrene. Calculated product / hydrazine-loaded ratio 3.9 is a material-balance ratio, not a turnover frequency or a kinetic trace.
- Isolation/characterization supports individual mechanistic steps; the full relay and regeneration routes remain proposed. General turnover and purely aliphatic dienes remain future questions. No fabricated kinetic curves, error bars or reaction trajectories are shown.

## Art and integration

`src/content/projects/metathesis-article.ts` holds the story and paired figure metadata. `metathesis.ts` connects it to the existing project route, shared article renderer, chemistry banners, Pixel/Sharp typography controls and related-story links. The existing route is `/projects/metal-free-metathesis`. New connections lead into experimental design, reaction kinetics and symmetry; existing Catalyst Discovery links remain.

Eight original drawing recipes in `scripts/metathesis-molecular-art.py`, run by `scripts/draw-metathesis-story.py`, use the repository's drawing primitives. The same vector commands feed pixel and high-resolution crisp GIFs, checked frame-by-frame during generation. Each concept has desktop/mobile animations and static pause companions (eight assets per concept), under `public/media/metathesis/`. A 48-frame timeline is 5760ms per loop; optimized GIFs may combine identical frames while preserving total time. SVGs remain available as sharp pause/full-detail references. The animation is explanatory, not measured molecular motion. Source art review: `assets/art-source/metathesis/contact-sheet.png`; numerical/source manifest is beside the public assets.

No external paper figures, chemical drawing software files, commercial illustrations or third-party drawing implementation were copied. Background papers are linked by DOI in the relevant sections; the author's manuscript is the source for the new results. Public credits and `ATTRIBUTIONS.md` record the research and artwork provenance.

## Validation

- All 49 repository tests pass, including story/data boundaries and all paired figure assets; production TypeScript/Vite build passes.
- Generator checks all 32 encoded GIFs have multiple frames, matching dimensions and a 5760ms loop. Pixel/crisp frames share the same drawing commands.
- Reviewed desktop and 390px phone layouts, including stacked figures and label spacing. Phone document width equals its 390px viewport.
- Browser checks cover chemistry project navigation, pixel/crisp switching, static pause companions and restored animation. No browser console errors were captured.
- Review screenshots are in `assets/metathesis-review/`; source-art overview is in `assets/art-source/metathesis/contact-sheet.png`.

## Molecular figure rebuild

After the supplied `222.gif` reference, all eight concepts were rebuilt around shaded, depth-sorted ball-and-stick models and explicit molecular graphs. Reference animation frames, coordinates and code are not redistributed. Hydrogens are suppressed except where necessary for nitrogen charge labels or water; drawings state ligand/counterion abbreviations. Motion is illustrative geometry, not a computed reaction path or an experimentally determined structure.

The relay uses an explicit chromene-forming aryl diene, the complete 2,3-diazabicyclo[2.2.2]octane cage, pentafluorophenyl initiator, two five-membered cycloadducts, released styrene, chromene and coproduct carrier. Nitrogen iminium bonding and charge transfer to the other N are represented at the exchange endpoints. The regeneration panel depicts hydrolysis/recondensation inputs as a proposed route. Atom identities are preserved through the first five states.

Optimization uses moving substrate structures with fixed yields. Compatibility shows the organic cage against RuCl2(=CHPh)(PCy3)2 (cyclohexyl substituents abbreviated), eight actual additive graphs, and fixed comparison bars. The aromatic panel now adds fused benzene rings successively. The designed-turnover figure shows the phenyl-substituted divinylbiphenyl, coproduct and initiating carriers, and a 14-carbon phenanthrene graph. The closing figure focuses on novelty, demonstrated compatibility advantages over the tested Grubbs I protocol and future molecular designs.

Generator assertions validate heavy-atom valences, cage connectivity (8 atoms / 9 edges), conserved metal-cycle atoms, both metallacyclobutanes, both pyrazolidiniums, detached ethylene/styrene and final bond orders. Fused aromatic graphs have shared atoms/edges and a valid Kekule matching; phenanthrene has 14 carbons. Text bounding boxes were checked at pixel scale in both viewport layouts.

Rebuild QA: all 49 tests, production build and lint complete (lint retains the existing unrelated warnings). Both animation styles were checked in the browser, including responsive crisp GIF selection at 390px, with no horizontal overflow or console errors. The first molecular walkthroughs use compact phone layouts; comparison tables retain their longer stacked layouts. Updated browser captures: `molecular-comparison-desktop.png` and `molecular-relay-phone.png` under the review directory. Default desktop pixel GIFs total approximately 1.24 MiB; higher-resolution crisp variants load on selection.

## Talk-style revision and compound 70 geometry

The growing aromatic model now follows Figure 5’s wave-like five-ring segment: successive annulations alternate above and below the chain. Shared aromatic vertices/edges and Kekule matching are preserved (22 carbons in the illustrated segment). Compound 70 is introduced as arene oligomer/polymer; its yield is omitted from the public discussion and illustration.

The phenyl-substituted coupling-alkene model now uses explicit trigonal-planar construction. The two internal vinyl angles and the substituted terminal-vinyl angle are numerically checked at 120 degrees; aryl substituents also follow outward sp2 directions.

Public prose now reads as a project talk: novelty of the organic activation pathway, useful ring families, functional-group compatibility and substrate-enabled turnover lead the story. Repeated warnings about universal comparisons, trace-metal measurements, kinetic interpretation and unrelated scope claims were removed. Catalyst identity, NMR/isolated yield labels, proposed-mechanism language and essential experimental context remain clear without defensive repetition.
