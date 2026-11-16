# Homepage and chemistry previews — 16 November 2026

## CV link

`src/components/ui/CvLink.tsx` replaces the decorative homepage stamp. A rear document marked CV/PDF sits behind the existing flask and Lab Approved label. The whole illustration is an accessible link to `profile.cvUrl`, opening the actual CV PDF in a new tab. Hover and keyboard focus lift/enlarge the document and add a glow; focus also has the site's visible outline. The artwork and caption remain visible on phones. Reduced motion and the site motion-pause setting remove transitions.

## Default typography

DotGothic16 is the current compromise between the initial coarse Pixelify Sans and the smoother Chakra Petch trial. Its finer grid and more regular shapes bring back visible pixel character. The existing Sharp alternative, Pixel/Sharp control names and stored preferences remain. Regular-weight Latin and Latin Extended WOFF2 assets total about 12 KB and are self-hosted; unsupported scripts use system fallbacks.

The full OFL notice is at `public/licenses/DOTGOTHIC16_OFL.txt`; source URLs, Unicode ranges and hashes are in `docs/design/typography/dotgothic-sources.json`. Chakra Petch and Pixelify Sans remain as earlier assets with their notices intact.

## Featured chemistry projects

The catalog now starts with Catalyst Discovery, Metal-Free RCM, then the algebra discussion paper. This puts both chemistry projects together in the homepage's first row. The shared `ProjectCard` uses optional `Project.preview` metadata, so the same GIF/still is used on Home, Projects and each applicable subject page (including the miniature's computation card).

- `catalyst-discovery`: a shared scaffold, alternative fragments, a property model, candidate comparisons and a returning search loop. Original illustrative graphics; no fitted results or actual numerical predictions are asserted.
- `metal-free-rcm`: the **original uploaded TOC PNG**, preserved byte-for-byte. `Project.preview.overlay` tells the shared card to display this original image with a CSS dark-color treatment and a separate transparent moving-dot GIF. Both images use the same source dimensions and contain-fit geometry, so the dots follow the original arrows. Chemical structures, stereobonds, labels, spacing and the original title are never redrawn or retouched. Pausing removes the dot layer while retaining the original diagram.

Both figures now follow their project summary paragraph. The paper's project title is **Metal-Free Ring Closing Metathesis** throughout the UI and connection map. Its stable URL remains `/projects/metal-free-metathesis`.

Generator: `scripts/draw-project-previews.py`. The computation animation is 1000×600, with a static PNG. The publication source is 1898×700, with a 60-frame transparent dot overlay. Both loops are 7.2 seconds. The manifest records timing, dimensions, the input's SHA-256 and the animation hashes. The generator asserts that the original and public TOC copies are byte-identical and that the overlay has the correct dimensions/frame count. The previous publication redraw is no longer generated or shipped.

## Review

- The homepage CV link opens the local PDF in a separate tab, with its document title visible.
- DotGothic16 is loaded and computed at 17px in the introduction; Sharp remains switchable.
- Home's first three project cards are computation, RCM, algebra.
- Two preview images are present on Chemistry and Projects; one on each of Mathematics and Computer Science.
- Pause animation selects both static PNGs; resume restores GIFs.
- At 390px, the CV artwork remains visible and keyboard focus is apparent; document width equals viewport width.
- Screenshots are in `assets/profile-refinements/`. The implementation is local; no production deployment was performed.

Final verification: all 49 tests and the production build pass; lint has only the pre-existing unrelated warnings. Both project previews load on phone screens, and neither the 390px nor 320px layout has horizontal overflow. The welcome-panel Sharp switch selects the system face and Pixel restores DotGothic16. No browser console errors were captured.
