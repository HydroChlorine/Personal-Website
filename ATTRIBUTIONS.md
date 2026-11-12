# Credits and attribution record

## Rules for future additions

Before incorporating third-party code, artwork, fonts, audio, or a template, identify its author, exact source, license/version, whether modification and redistribution are allowed, and required notices. Keep license copies, record modifications, and update the public Credits page. Credit alone is not permission. If permission is unclear, do not incorporate it. Do not apply a blanket project license to third-party material.

## Inspiration only

| Reference | Source | Use in this project | Permission status |
| --- | --- | --- | --- |
| dimden's hotel | https://dimden.dev/ | General inspiration: a personal online home, pixel-art atmosphere, ambient weather | Footer states All Rights Reserved. No permission to reuse assumed. No source, artwork, sound, text, or other assets incorporated. |
| Michael Xing | https://michaelxing.com/ and https://michaelxing.com/about/ | General inspiration: a personal project collection and growing archive | Homepage states AGPLv3 for publicly accessible author-written code and CC BY-SA 4.0 for other authored content, subject to its terms. No code/content incorporated, so no derivative template used. |

References reviewed November 6, 2026. These observations are not a license grant or a conclusion that every asset on either site shares one license. Verify the exact source and terms again before any future reuse.

Public inspiration acknowledgments live in `src/content/credits.ts` and appear at `/credits`, linked from every page footer.

## Original project material

- `public/art/night-workshop.svg`: original vector pixel illustration created for this site during development with Codex. No downloaded/reference-site artwork, tracing, sprites, or textures used.
- `public/favicon.svg` and `src/components/ui/PixelIcon.tsx`: original grid drawings created for this site.
- Layout, styles, decorative weather behavior, and interface components were authored for this project; no third-party website template used.
- Typography uses visitor system fonts; no external font files are redistributed.
- Biographical content comes from the user's supplied references and direction. Research figures, photos, papers, and course artifacts have not been imported.

## Software dependencies

Direct dependencies were checked against their installed package metadata and shipped license files:

| Dependency | Version when introduced | License | Source |
| --- | --- | --- | --- |
| React and React DOM | 19.3.1 | MIT | https://github.com/facebook/react |
| React Router | 8.5.1 | MIT | https://github.com/remix-run/react-router |
| Vite | 8.3.5 | MIT, with additional bundled notices | https://github.com/vitejs/vite |
| TypeScript | 7.0.2 | Apache-2.0 | https://github.com/microsoft/TypeScript |
| Vite React plugin | 6.1.2 | MIT | https://github.com/vitejs/vite-plugin-react |
| Oxlint | 1.89.0 | MIT | https://github.com/oxc-project/oxc |

MIT permits reuse and modification with preservation of copyright/license notices. Apache-2.0 permits reuse and modification under its license conditions, including preserving applicable notices. Dependency source code has not been modified. Full shipped text, not this summary, controls the terms.

`third-party-licenses/README.md` records all installed direct and transitive packages, including build tools, and links their copied notices. `public/licenses/THIRD_PARTY_NOTICES.txt` publishes those notices from `/licenses/THIRD_PARTY_NOTICES.txt`. Run `npm run licenses` to update both inventories when dependency versions change. Prettier is an MIT-licensed development-only formatter; its installed license is included in the inventory. Lockfile versions are authoritative.

## Future asset register

For each new item, record: title/path, author, original URL, license and license URL, date checked, permission basis, changes, retained notice path, and public credit location. Add original research/photography authors and collaborators when those assets are selected.

## Baker Laboratory and PSB seasonal art v1

- Paths: `assets/art-source/baker-psb/v1/` (generated masters and exact prompts), `public/art/baker-psb/v1/` (GIFs, stills, manifest).
- Created November 6, 2026 with built-in OpenAI image generation; seasonal art edits preserve the initial generated composition. Animated/encoded with the original project script `scripts/animate-campus.py` using Pillow and NumPy as offline tools.
- Architectural reference supplied by the user: Baker/PSB campus screenshot with visible © 2024 Google marks. Not directly pixelated, traced, copied into the public directory, or used as a GIF frame. The generated work is a recomposed artistic interpretation.
- Additional visual study: https://chemistry.cornell.edu/ (Baker front) and https://nowack.lassp.cornell.edu/lab (PSB exterior). Consulted as architectural references only; no photograph is redistributed and no reuse license for those photographs is assumed.
- Public reference acknowledgments: `/credits`, linked from every footer. The artwork is not official Cornell material and implies no institutional endorsement.
- Original `public/art/night-workshop.svg` remains unchanged. See `docs/ART_ASSETS.md` for the full asset/motion recipe and refinements.

## Baker and PSB art revision v2

- Original generated coarse pixel artwork, produced with the built-in OpenAI image-generation tool. All scene-specific prompts are in `assets/art-source/baker-psb/v2/prompts.json`.
- dimden.dev was revisited for visual study of pixel scale, dark atmosphere, and personal-site composition. No screenshot pixels, sprites, artwork, code, fonts, or audio from that site are included.
- The project's own original SVG informed the simplified visual language. Baker/PSB geometry remains based on the previously documented architectural references; v2 does not incorporate photo pixels or v1 image pixels.
- The original project animation script now targets v2. The prior animation recipe is preserved as `scripts/animate-campus-v1.py`; v1 art remains archived.
- Public credits remain at `/credits`; active style rules are recorded in `docs/ART_DIRECTION.md`.

## November 7 sky and palette work

- Moonrise and Ion UI palettes (plus the retired Afterglow study), faint SVG moon/constellations, CSS stars/haze, and Canvas 2D pixel weather/fireworks are original project code. No external artwork or effect library was added.
- The user's local CS 4620 Fireworks project was inspected to understand their particle-simulation interests. The website effect is a small independent implementation; no course framework, shader assets, source modules, or textures were imported or copied.
- Existing v2 campus GIF files were not modified. Public acknowledgments for the sky/effects are in `/credits`.

## Layered atmosphere refinement

- Four-depth precipitation, smooth shared wind, Gaussian central launches, ballistic target solving, and finite CSS snow/wet-frame effects are original project implementations in `src/lib/skyPhysics.ts`, `src/components/sky/`, and `src/styles/weather-surfaces.css`.
- The neon-street palette direction follows the user's description; no street photograph, third-party shader, effect code, texture, or additional dependency is incorporated. The approved campus GIFs remain unchanged.

## Chemistry laboratory scenes and Catalyst Discovery article (November 8, 2026)

- Six laboratory banner masters were created with the built-in OpenAI image-generation tool, using the project's own v2 campus illustration as a style-only reference. Exact prompts and untouched generated masters: `assets/art-source/chemistry/v1/`. No photograph or external artwork was used. `scripts/animate-chemistry.py` adds original local animation and encodes the shared-palette GIFs/stills under `public/art/chemistry/v1/` using offline Pillow/NumPy.
- Chemistry instrument displays, colored solutions and chromatography bands are illustrative. They are not spectra, experimental records or a laboratory procedure.
- The “Molecules, meet computation” article is based on the user's own https://github.com/HydroChlorine/Catalyst-Discovery at commit `212866d4f6cf813746d8251891038b9435eea012`. The repository has no LICENSE file at that snapshot. The site explains and links to it; Python source and the existing design-document image are not redistributed. See `docs/CATALYST_SOURCE_REVIEW.md` for the evidence and reuse boundary.
- New workflow, generator and feature-bottleneck diagrams are original SVG drawings. The initial pixel workflow used Pillow’s built-in bitmap font; the revised figure set rasterizes local system monospace glyphs (Menlo when available), with no font files redistributed. The complete figure recipe is `scripts/draw-catalyst-figures.py`.
- Public attribution is displayed at `/credits`; section-level article citations link to the reviewed source commit. No third-party browser library or external template was added. Campus art remains unchanged.

## Chemistry refinement: screening, liquid levels, and article illustrations

- The user's two supplied vial/reaction-block product images were consulted only to recognize slim dram vials and metal adapter blocks on a magnetic stir plate. No source photograph pixels or logos are redistributed. The replacement screening master was made with built-in OpenAI image generation; exact prompt and reference roles are in `assets/art-source/chemistry/v1/screening-revision-prompts.json`. The first master is retained under `archive/`.
- The extraction animation now redraws both interfaces from a conserved-upper-volume approximation to the illustrated funnel silhouette, with a rising receiving level. This original finishing code alters no external artwork.
- Seven original explanation diagrams now have paired SVG and animated pixel versions, including phone layouts: workflow, attached ring variants, extensible attachment sites/ring closure, geometry preparation, representation choice, shortlisting and a speculative energy-landscape idea. They contain no measured or calculated results. The original first diagram recipe is archived as `scripts/draw-catalyst-figures-v1.py`; the current recipe is `scripts/draw-catalyst-figures.py`.

## Mathematics night-study scenes (2026-11-08)

The six GIF banners, portrait companions, pause stills, desk art, and study diagrams in `public/art/mathematics/v1/` are original procedural pixel drawings. `scripts/animate-mathematics.py` uses NumPy and Pillow to calculate and draw the mathematical examples; it does not copy reference-site artwork, reference photographs, or external implementation code. The user-supplied Legendre chart informed the topic, not the pixels. A local system font is rasterized into the artwork; no font file is redistributed. No new runtime library was added.

Mathematical definitions and instrument context were checked against Chebfun, NIST DLMF, LAPACK, Macaulay2, Lorenz (1963), University of Wyoming NMR Basics, and Shimadzu FTIR materials. Links and precise interpretations are recorded in [MATHEMATICS.md](docs/MATHEMATICS.md), and appear in the public math-page reading disclosure and credits. References are citations, not sources of reused code or media.

## Illustrated mathematics topics (2026-11-08)

The three mathematics topic essays and 21 paired diagrams in `public/media/mathematics/topics/` were written and drawn for this website. `scripts/draw-math-topics.py` reuses this repository's original drawing primitives and computes synthetic interpolation, mesh, Gaussian-process, polynomial, QR, SVD, and optimization examples using NumPy and Pillow. SVG, animated pixel, PNG pause, and portrait variants share the same recipes. No external code, diagrams, photographs, datasets, or passages were copied; no new browser dependency or third-party asset was introduced.

Scientific references are linked next to the applicable discussion and recorded in `src/content/mathematics/sources.ts`. See [MATH_TOPICS.md](docs/MATH_TOPICS.md) for models, limitations of the illustrations, authorship, sources, and rebuild/verification commands. The public credits page acknowledges these stories and diagrams.

The math-topic crisp GIFs are original high-resolution rasterizations of the same frame recipes as the pixel animations, with antialiasing and fixed palettes. They use no new assets, dependencies, external renderers, or copied animation code. Static vector exports are retained for paused viewing and reuse. The sequential-sampling figure's enlarged layouts and footer-spacing checks are documented in `docs/MATH_TOPICS.md`.


## Additional mathematics stories (2026-11-09)

The symmetry, dynamics, and Fourier articles and their 25 new paired figure concepts are original work created for this website. `scripts/draw-math-connections.py` computes synthetic group operations, chirality measures, dynamical trajectories, and signal transforms and reuses the existing original drawing pipeline. Pixel and crisp GIFs share exact source-frame commands; SVG and PNG stills and phone layouts are included. No external imagery, code, measured data, or source passages are redistributed. Mathematical and historical references are linked in the articles, recorded in `src/content/mathematics/sources.ts`, and explained in `docs/MATH_TOPICS.md`. Public credits now cover all six stories and 46 concepts.

## Computer science desk scenes (2026-11-09)

The six CS banners and their mobile/still/study companions in
`public/art/computer-science/v1/` are original drawings and animations made for
this website. `scripts/animate-computer-science.py` reuses this repository's
original mathematics desk, palette, and raster helpers, and adds new monitor
artwork for Java objects, Boolean logic, a toy machine, a web request,
perspective graphics, and conceptual typed proof objects. No external artwork,
logos, course material screenshots, or third-party implementation code is
redistributed. The local system Menlo font is rasterized, not bundled.

Oracle, MDN, and Rocq documentation supplied conceptual references, linked in
`src/content/computerScienceReferences.ts` and the public credits page. Models,
source files, interpretation, and verification are documented in
[COMPUTER_SCIENCE.md](docs/COMPUTER_SCIENCE.md).

The formal-verification scene was revised to visualize the Curry–Howard
correspondence through function blocks, matching types, composition, and a
conceptual kernel check. The replacement is original artwork, not a screenshot
or live proof-assistant output. Rocq’s core-language documentation is linked
on the credits page for the proof-term/type-checking connection.

## Computer science stories and local miniature (2026-11-09)

The five CS project stories, formal-verification topic and 23 paired figure concepts in `public/media/computer-science/stories/` are original writing and procedural illustrations developed with AI assistance for this website. Wide/phone pixel and crisp animations share the same frame recipes; stills support paused viewing. No external project source, artwork or datasets are copied into these figures. Models, checks, contribution boundaries and source review are documented in [CS_STORIES.md](docs/CS_STORIES.md).

CritterWorld credits Ibrahim Ahmed, Lichen Huang, John Karaca and Michael Zhang. The fireworks story distinguishes Lichen's infrastructure/initial implementation from collaboratively developed ideas and the AniGraph course framework. The ongoing Godot story credits gameplay and some mathematics to Lichen and links the collaborative project and upstream. The internship uses invented records and original schematics, without employer code or private data.

Software Foundations supplies the red-black-tree chapter framework; Lichen completed the exercise proofs. The short attributed proof excerpt is covered by the retained MIT notices in [SOFTWARE_FOUNDATIONS_MIT.txt](public/licenses/SOFTWARE_FOUNDATIONS_MIT.txt). Primary documentation and the chapter are linked in the article and public credits.

The interactive miniature-site idea is explicitly inspired by [dimden's WebTiles miniature](https://dimden.dev/). The local miniature reuses this website’s own React homepage sections, artwork and interactions in a condensed layout. It does not use WebTiles code, runtime, hosting, external embeds or dimden's artwork. This inspiration is credited beside the miniature, in its project story and on the credits page.

The revised internship figures use abstract CRUD and connected-record drawings without named people. The two website-story figures are original atmospheric snow/neon/firework scenes; no external artwork was reused.

## Playable playground editions (2026-11-09)

The fireworks demo adapts the author's collaborative CS 4620 pattern and simulation core with the user's explicit migration authorization. Lichen Huang credits his infrastructure/initial implementation and the collaborators' shared ideas. The browser renderer, interface and smooth value-noise implementation were created for this site with AI assistance; no AniGraph framework, course renderer, shader or asset is bundled.

CritterWorld's browser demo is independently written TypeScript inspired by the team project of Ibrahim Ahmed, Lichen Huang, John Karaca and Michael Zhang. No Java course implementation, original example program or JavaFX/course asset is copied. It is labeled a simplified browser edition, and credits appear in the demo and public credits. Playground card images are screenshots of these actual local canvases.

[Michael Xing's website](https://michaelxing.com/) informed the separate-tab game-launch format. No source, artwork or styles were reused. The Godot entry links the existing collaborative project/release page; no unlicensed game source or export is redistributed. Source boundaries, engine assessment and tests: [PLAYGROUND.md](docs/PLAYGROUND.md).

## Chemistry laboratory experiences (2026-11-10)

The fifteen short laboratory experiences draw on Lichen Huang’s own CHEM 3020 and CHEM 3030 reports. The fifteen preview PNGs and 46 figure concepts in `public/media/chemistry/experiences/` are original procedural illustrations developed with AI-assisted Python, NumPy and Pillow code, using this repository’s own drawing primitives. Each concept has paired animated pixel/crisp views, responsive phone layouts and static pause companions. No external implementation or artwork is included.

Two point plots explicitly transcribe measured tonic-water and chlorophyll readings. The GC percentage bars quote the report’s inconsistent estimates as an observation to investigate. Other plots and animations are synthetic teaching examples, not recovered experimental traces. Source report locations, numerical care and reproduction commands are recorded in [CHEMISTRY_EXPERIENCES.md](docs/CHEMISTRY_EXPERIENCES.md) and the preceding [planning review](docs/CHEMISTRY_EXPERIENCES_PLAN.md).

The counting-experiment report used a decay dataset shared by Stephanie Chen with TA approval after an original file was lost. The website credits this contribution and uses original synthetic curves instead of redistributing that data. Commercial spectral-library screenshots, course handouts, report PDFs and product photographs are not bundled. The bottle illustration is original: Schweppes/Wegmans identify the author’s recalled sample, not licensed bottle artwork or an exact verified package size. Contextual references: [Schweppes tonic water](https://schweppes.ca/en/products/tonic-water/) and [Wegmans product listing](https://www.wegmans.com/shop/product/43807).

The Stern–Volmer definition and chromatography quantitation references are linked in the applicable story’s optional notes. No external figure was reproduced or adapted. Public acknowledgments also appear on `/credits`.


### Animated chemistry experience previews (2026-11-10 revision)

The fifteen new night-laboratory teaser scenes in `*-preview.gif` and their PNG pause companions are original Python/Pillow/NumPy artwork created for this site with AI assistance. Source: `scripts/animate-chemistry-previews.py`. They replace the plain study images in the collection while retaining the earlier files. No reference-site artwork, commercial instrument photo, logo, report screenshot or third-party implementation is reused.

The user's supplied multicomponent-indicator figure guided the five-color stacked-spectrum composition; its animation uses newly drawn synthetic profiles and does not claim to reproduce the measured dataset. KBr mini-press and laser-ionization details were checked against the author's analytical/physical laboratory reports. The spinach story incorporates the author's explicit 50:50 celite/granulated-sugar packing clarification. Public artwork credits are updated on `/credits`. The scenes are illustrative, including the unequal calorimeter rises and conceptual methane vibrations.

### Chemistry snippets and revised instrument scenes (2026-11-11)

The fifteen bodies were rewritten from Lichen's laboratory reports as short question–method–reasoning–outcome snippets, with course-number framing removed. Numerical results are attributed to the recorded work and uncertainty/contribution boundaries remain explicit. Stephanie Chen's shared decay dataset is credited in the body, not redistributed as new artwork.

Two original paired figure concepts were added: Stern–Volmer intensity/ratio views and gamma-energy/pulse-height explanations. The gamma trace is a new illustrative model, not the measured report spectrum. These bring chemistry bodies to 48 concepts. The detector's opaque red housing, black caps, handle and cable use the user's attached photograph as a visual reference; no photograph, branding or product artwork is reproduced. The empty-cell interval camera, TONIC WATER label, and paired optical/IR unknown-sample scene are original revisions to the existing procedural pixel artwork.

The Stern–Volmer definition is checked against and linked to the IUPAC Gold Book. The barium half-life reference links Brookhaven's evaluated nuclear data. The original report's one-point gamma calibration and lower-energy assignments are discussed with their actual limitations rather than promoted as independent confirmation. Private reports and course handouts remain outside the public assets.

## Small instruments and notebook (2026-11-11)

The segmented mood gauge and energy lever are original artwork and UI code created for this site with AI assistance. The lever takes its mechanical cue from the user's attached reference. The attention scene is now a code-native rendition of **Nyan Cat**, the character by **Christopher Torres (prguitarman)**, following the classic reference supplied by Lichen. The character is not claimed as original website artwork. No original GIF, music, sprite sheet or third-party implementation is bundled. Source: `scripts/draw-feelings-nyan.py`; public credit links to [the creator's interview](https://knowyourmeme.com/editorials/interviews/qa-with-chris-torres-the-creator-of-nyan-cat). Earlier moon-moth assets are unused.

The local **Moon over Ithaca** widget acknowledges [dimden's moon widget](https://dimden.dev/moonwidget) visibly and on `/credits`. The official page explicitly offers iframe embedding, but the inspected embed provides visitor-location readings and no documented fixed-coordinate setting. This implementation therefore uses independent React markup, a newly drawn procedural pixel moon, and **SunCalc 2.1.4 by Volodymyr Agafonkin, BSD-2-Clause**, rather than copying dimden's all-rights-reserved source, fonts or images. The site retains the compact pixel-moon/readout idea and yellow highlights. Ithaca coordinates: 42.4444 N, 76.4926 W; clock: America/New_York. SunCalc's full license is preserved in the dependency inventory and public notices. [SunCalc source and documentation](https://github.com/mourner/suncalc).

The Hello, world notebook entry is new, AI-assisted prose for Lichen's personal site. Its content and future entries are kept as individual typed files. The public CV is an unchanged copy of Lichen's existing clean V2 PDF; the revised Word file's editorial notes are not included. Implementation and update instructions are in `docs/WIDGETS_AND_NOTEBOOK.md`.

## Finer weather surfaces (2026-11-12)

The connected snow blankets, branching frost and glass runoff textures are original code-native SVG artwork generated with the Python standard library in `scripts/draw-weather-surfaces.py`. Twenty-one assets in `public/art/weather/` use deterministic correlated noise and seeded branching/track geometry. No external photograph, texture, library or third-party art is included. Ground shading is CSS with flat surfaces and depth-only color. The comparison screenshot uses production CSS staged at 5, 10 and 20 accumulation levels, not a recording of elapsed weather.
