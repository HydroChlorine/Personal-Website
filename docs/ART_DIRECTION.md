# Current art direction

## User preference

The goal is a dark, expressive personal website with the charm of anime-influenced, low-resolution web/game pixel art. dimden.dev is an atmosphere and design reference, not a source of reusable artwork or code. The initial `night-workshop.svg` is the internal reference for simplicity and pixel size.

**Style, beauty, and consistency take precedence over architectural realism.** Baker Laboratory should be suggested through its long facade, flat raised central parapet, columns, and neighboring cyan-grid PSB. Omit architectural detail that fights the pixel language.

## Working rules

- Use a coarse logical canvas: v2 is 384 × 128, enlarged 3× with nearest-neighbor sampling. Pixels should be visible as pixels at website scale.
- Keep shapes broad and stylized: stepped tree clumps, flat stone masses, four simple columns, a few window blocks, and a sparse glass grid.
- Use one shared 32-color palette across scenes. Large dark surfaces, restrained cyan and mint highlights, and a few warm golden windows matter more than texture.
- Favor night, moonlight, and the dark period before sunrise. Avoid bright daytime skies, sunlit photographic stone, white-dominated snow, and high-detail scenery.
- Make the environment a part of the website: a compact banner with a headline over the quiet left side, with architecture on the right. Avoid presenting it as a large standalone photo at the top.
- Animation can be expressive: several logical pixels of wind movement, chunky leaves, readable snowflakes, and stylized rain. Keep architecture stable and the whole scene coherent.
- Maintain a real still-image pause mode and the reduced-motion behavior.

## Current and archived work

- **v2** is active: the six moonlight/predawn GIFs and stills under `public/art/baker-psb/v2/`.
- **v1** is archived: the earlier detailed/light scenes are preserved for geometry/reference but are not in the live catalog.
- Original SVG is preserved unchanged.
- The generated masters and prompts for each round are under `assets/art-source/baker-psb/`.

Use this document when generating future illustrations, sprites, and website decorations. Do not drift back toward realistic tiny-pixel panoramas merely to improve likeness.

## November 7 atmosphere refinement

Keep the approved v2 GIFs unchanged. Retain two surrounding night palettes: Moonrise (ink blue, cool highlights and lantern amber) and Ion (navy/cyan with restrained warm neon). Retire purple-heavy Afterglow. The inspiration is distant neon in an old Hong Kong/Tokyo street photograph: dark space first, small colored light accents second.

A faint original moon, stars, constellations and haze support the sky. Four precipitation depths and weak coherent wind add space; centrally launched pixel fireworks trace gravitational arcs. Snow caps and rain reflections gradually weather the rectangular frames without hiding their content. See `SEASONS_AND_SKY.md` for calendar defaults, exposure timing and implementation locations.

## Chemistry scenes and explanatory figures

The chemistry window carries the same coarse night palette into a laboratory: small glass highlights, cyan shadows, warm liquid/light accents, and broad simple apparatus shapes. Left-side words describe the current experiment. Animate only selected parts; preserve the fixed bench and clamp stands. Avoid making the glasswork photographic or filling the frame with fine labels.

For the Catalyst Discovery story, animated pixel diagrams are the default, with higher-resolution raster labels for readability. Each figure also offers a crisp source-drawn SVG comparison. Both use the surrounding palette, but neither presents generated sketches as actual chemical structures, calculated results or instrument data. See `CHEMISTRY.md` for recipes and media paths.

The mathematics scenes use an original night-study desk with a small pixel display: navy/ink, muted cyan and mint curves, amber light, and restrained coral signs. All curves and matrix steps are computed, then drawn directly on the same coarse grid as the laboratory art. Portrait companions keep the diagram beneath the copy on phones. See [MATHEMATICS.md](MATHEMATICS.md) for the visual interpretation of each example.
