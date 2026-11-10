# Playground — first browser editions

Work on `Playground-section-implementation`, 9 November 2026. No deployment, commit or push was performed.

## Launch and hosting

`/playground` offers two playable demos. Image, title and launch links open a separate tab with `target="_blank"` and `rel="noreferrer"`. The demo routes (`/playground/fireworks` and `/playground/critterworld`) are lazy-loaded standalone applications, outside `SiteLayout`: no banner, sidebar weather or site fireworks compete with the simulation. Each has a return link and a project-story link. Existing SPA rewrites support direct links and reloads without special hosting headers, a backend, Java, plugins or new npm dependencies. The launch-card images are captures of the actual browser canvases, not mock recordings.

## Fireworks

Adapted from the user's local collaborative CS 4620 project, specifically the authored `core/Pattern.ts` and `core/Simulation.ts`. Lichen Huang built the infrastructure and initial implementation; ideas were shared with a collaborator whose display name has not been supplied. The user explicitly authorized migrating this project. No AniGraph engine, scene/view implementation, shader, font, texture, sound or course asset is copied.

The browser edition retains the circular paintable wheel, nearest-cell material sampling, equal-area spark sampling, regional pulse forces, immutable launch snapshots, ballistic shells, time/height triggers, gravity, drag, wind, staggered pulses, timing marker, adjustable wheel resolution, custom pulse controls, and fading trail history. A new Canvas2D renderer and React interface replace the course rendering/UI layer. Original smooth value noise replaces the dependency on fast-simplex-noise. Presets now initialize purposeful color/pulse combinations rather than the local unfinished all-rose preset.

The simulation uses 1/120-second fixed steps, a 6,000-particle reusable pool, at most six active shells, and at most 2,400 sampling attempts per launch from the UI. Trails keep 20 handles per particle. Elapsed time is clamped, hidden-tab time is not replayed, animation frames are cancelled on unmount, and the draw loop stops while paused or empty. Random-state arithmetic wraps to 32 bits. A blank or pulse-only wheel gets actionable feedback instead of an empty launch. Fill-wheel controls offer a keyboard alternative to painting; the sky supports Enter/Space, and every launch/control has a native-button alternative.

This is an adaptation of the core behavior, not a pixel-for-pixel reproduction of the original application. The old renderer and exact noise field are intentionally absent. Browser-delivered code is visible to visitors, as with any frontend application; no private course framework is shipped.

## CritterWorld

The original team project credits Ibrahim Ahmed, Lichen Huang, John Karaca and Michael Zhang, Cornell CS 2112. This browser edition is newly written TypeScript, informed by the public project description and the user's requested core behavior. It copies no original Java parser/interpreter/model, JavaFX UI, course helper or original example program. The three starting behaviors are newly written examples in a deliberately smaller, incompatible language.

The pointy hex world has radius 14 (631 cells) and starts with 48 critters (15 in sparse mode). Critters sense their surroundings, follow ordered rules, move, turn, forage, attack, grow, wait and reproduce by budding. Children inherit independent program copies, with an optional 10% chance per successful birth attempt of replacing a selected action. Mutant programs serialize back to parseable text. Species names distinguish friend/enemy; descendants retain that name unless mutated. Energy, age and size constrain the population; food regrows in small patches and deaths return food once. The population cap is 240. This is a small artificial ecosystem, not a faithful implementation of every original course rule or a biological claim.

The parser constructs a bounded AST using tokenization and precedence parsing, without eval, Function, arbitrary JavaScript or access to the host environment. Programs have at most 8,000 characters, 1,800 tokens, 64 rules and 32 nested expression levels. Arithmetic is bounded; division by zero returns zero. Sensors: energy, size, age, ahead (distance up to three), nearby (relative direction), random and eight memory slots. Rules can update memory and continue, or select the first matching action. Turns are sequential; newborns act on the next world turn. Simulation speed is user-controlled; it starts paused and supports single stepping, reset and a seeded new world.

Users can edit and spawn programs, reprogram an inspected critter, follow an individual through a live inspector, add food/rocks, clear a hex or place a critter. Coordinate controls and a living-critter selector provide keyboard alternatives to pointer interactions. Browser animation frames and turn accumulation are bounded and cleaned up on navigation.

## Godot assessment

Reviewed the active local `4Dto3D` checkout (`hybrid/training.tscn`, four-chamber campaign) and `project.godot`. The project identifies Godot 4.7, Forward+, Jolt, and desktop input. No installed Godot executable, Web export template or project LICENSE was found in the inspected locations. The public GitHub release API for `HydroChlorine/4Dto3D` returned an empty list on 9 November 2026; no packaged download is invented.

[Godot's Web export documentation](https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html) requires the Compatibility renderer/WebGL2. A single-thread export can avoid special cross-origin-isolation headers, but it still needs export templates, a compatible-renderer test of the custom shader/geometry/input, and confirmed redistribution terms for the collaborative upstream project. A public repository without a license is not a grant to redistribute its contents. No source or binary from that project was bundled into this website.

For this first round, its playground card is clearly work in progress, links to the project story and the actual GitHub releases page, and explicitly says no browser build or packaged download is available here yet. A future confirmed release can replace that link with a specific downloadable asset; a tested Compatibility export can be added without changing the two browser demos. No engine installation or game-repository mutation was performed.

## Credits and reference sites

Michael Xing's [separate game destinations](https://michaelxing.com/) informed the launch-page interaction, not the code or artwork. No code, assets or styles from his AGPL site were copied. Existing dimden inspiration credits remain unchanged. Public credits distinguish the fireworks core adaptation, new browser renderer and independently written CritterWorld edition.

## Checks

`tests/playground.test.ts` covers parsing, arithmetic, rejection limits, seeded repeatability, occupancy/population/food bounds, independent program copies, parseable inherited programs, fireworks snapshots, pause, shell limits and pool reclamation. `npm test` passes 31 tests; `npm run build` passes and emits separate lazy demo chunks. Browser checks cover new-tab launch, firework emission/pause/invalid designs, CritterWorld step/run/pause, invalid and edited programs, memory, inspector, and world tools. Phone layouts and final screenshots are recorded in `docs/previews/2026-11-09/`.

Final browser QA: both launch cards opened new tabs. Fireworks emitted colored bursts from both a preset and a freehand-painted stroke; blank patterns produced feedback, Enter launched from the canvas, and Clear sky worked while paused. CritterWorld accepted a memory-incrementing program, showed Memory 1 in its inspector after a step, rejected an unknown action, applied a food tool, ran/paused, and reset to Turn 0. Both standalone demos fit at 390px with no horizontal overflow; browser error logs were empty. Canvas captures and surrounding-page screenshots are retained under the media and preview directories.
