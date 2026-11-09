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
