# Chemistry section, first implementation

Branch: `codex/chemistry-section-implementation`, based on merged `main` (`69e91bb`).

## Laboratory window

Six original image_gen masters, using the site's approved summer-rain campus art as a **style-only** reference. Quiet left side for HTML copy; laboratory equipment on the right. Shared 32-color finishing palette and 384 × 128 logical grid, enlarged 3× with nearest-neighbor sampling. No campus GIF is changed.

| Scene | Animated idea | Loop |
| --- | --- | --- |
| Reflux | Oil bath, stir bar/bubbles, condenser return droplets, soft balloon movement | 7.2 s |
| Cold reaction | Flask in Dewar, frost highlights, falling/drifting cold vapor | 8 s |
| Screening | Slim screw-cap dram vials in blue/brass reaction blocks on a circular adapter and magnetic stir plate; independently turning stir bars | 8 s |
| Workup → column | Both extraction levels descend as the lower phase drains; the upper-phase volume is preserved in a row-based vessel approximation, and the receiving flask fills; column bands follow | 16 s |
| HPLC–MS | Microsyringe moves toward injector, plunger cue, readout traces, transfer-line pulse | 10 s |
| NMR | Slender tube lowers into top bore, acquisition cue, stylized return | 12 s |

These are artistic moments, not apparatus specifications or experimental protocols. The reflux balloon is an inert-gas reservoir on a condenser adapter, not a depiction of heating a rigidly sealed vessel. Cold fog is an illustrative cue with no temperature claim. Colored solutions/bands and instrument traces are artistic, not measurements.

`src/content/chemistryScenes.ts` holds copy and paths. `src/hooks/useChemistryScene.ts` rotates sequentially every 30 seconds of uninterrupted visible playback; clicking/tapping the banner or Enter/Space on its button advances it and restarts that timer. Pausing shows each PNG still and stops automatic progression. The site-wide reduced-motion preference applies. The long workup loop fits within the 30-second display interval.

Chemistry context covers `/chemistry` and descendants, `/projects?subject=chemistry`, project detail pages whose catalog records include chemistry, and chemistry-tagged note details. Shared Chem/Math/CS projects use the laboratory banner regardless of entry link. Other pages retain their seasonal campus cycle. Each cycle pauses while the other context is active; navigating between chemistry pages preserves the laboratory index. `SiteLayout` passes its existing motion state to article figures through outlet context.

### Assets and regeneration

- Masters + exact built-in prompts: `assets/art-source/chemistry/v1/`.
- Public GIFs, stills and metadata: `public/art/chemistry/v1/`.
- Offline finishing script: `scripts/animate-chemistry.py` (Python 3, Pillow, NumPy).
- GIF encoders may merge identical adjacent frames, preserving total loop duration. The manifest's `frames` value records input frames.
- The raw image-generation masters are archival source; no API call is needed to regenerate the animations.

## Catalyst Discovery article

Live at `/projects/catalyst-workflow`. The project record is now `published` (content readiness only); its former “A closer look, soon” panel is replaced with an article body.

- Narrative: `src/content/projects/catalyst-article.ts`.
- Reusable structured article types: `src/content/types.ts`.
- Article renderer: `src/components/articles/ProjectArticle.tsx`.
- Editorial styles: `src/styles/article.css`.
- Seven original diagram concepts, each with SVG, animated pixel and taller phone layouts: `public/media/catalyst-discovery/`.
- Every figure starts in Pixel sketch mode and has a clearly labeled Crisp diagram switch. Pausing uses its PNG still; SVG views are static. The workflow keeps the moving-loop cue with sharper, higher-resolution raster labels.
- Figure sources: `scripts/draw-catalyst-figures.py` (Pillow only for the GIF). Pixel labels use a locally installed system monospace font (Menlo when available), rasterized without blur; no font file is shipped to visitors.

The article now leads with a shorter, conversational explanation and seven animations: the loop, distinct ring attachments on the shared scaffold, extensible wildcard sites/ring closure, geometry preparation, the representation choice, shortlisting, and the speculative inverse energy-landscape idea. MolWt is framed as a first placeholder chosen while the representation problem was still being worked out. Implementation formulas, the six-state table and pinned source links remain in optional detail disclosures. The old “Written from…” footer is removed. The inverse-design discussion is a personal question for future exploration, not an implemented feature or calculated result.

The screening revision uses the user's two supplied photos as shape/apparatus references only. Their pixels are not redistributed. The original screening master is archived under `assets/art-source/chemistry/v1/archive/`; the exact built-in generation prompt is in `screening-revision-prompts.json`. Other laboratory masters are unchanged.


Source review, evidence and limitations: `CATALYST_SOURCE_REVIEW.md`. Public per-section citations link to a pinned commit. No original Python project code, course code, design image or third-party template was copied into the website. Existing dependency notices remain applicable; no browser dependency was added.

## Validation

`npm test` covers chemistry context boundaries alongside existing season/sky tests. `npm run build` checks TypeScript and the production bundle. Asset QA decodes all GIFs, checks dimensions, looping and duration, verifies distinct frames and matching stills, and inspects their motion study. Browser QA checks route changes, all six banner variants, article rendering and figure switching, pause/still behavior, and narrow layouts. The original scientific scripts were inspected, not executed; no scientific accuracy benchmark is claimed.

Run `scripts/verify-chemistry-assets.py` with Python 3 + Pillow + NumPy to decode the active GIFs and verify the extraction invariants and rendered level movement. The scripts need no API/network access.
