# Baker Laboratory and PSB art assets

## Current active set v2

The current art direction is documented in [ART_DIRECTION.md](ART_DIRECTION.md). The user preferred the coarse original SVG and dark anime-influenced pixel atmosphere to the first realistic set. v2 is a new generated art set, not a darkened/downsampled copy of the realistic v1 art.

- Masters, prompts, and contact sheet: `assets/art-source/baker-psb/v2/`.
- Animated GIFs, matching stills, and manifest: `public/art/baker-psb/v2/`.
- Generation: built-in OpenAI image generation; no CLI/API fallback. Base prompt describes simplified Baker/PSB geometry and original coarse pixel scenery; all seasonal variants edit that generated base.
- Animation: `scripts/animate-campus.py` on a 384 × 128 logical grid, with a shared 32-color palette, exported at 1152 × 384 by 3× nearest-neighbor enlargement. 48 frames × 100 ms; 4.8-second infinite loops.
- More expressive tree-canopy motion, leaf sprites, rain strokes, snowflakes, fireflies, and twinkles. Architecture remains fixed.
- Banner: compact 304px desktop height, with the welcome headline and identity restored over the left-hand quiet area.
- Playback: the existing 10-second random rotation, manual selection, and real PNG still-image pause behavior are preserved.

| Active scene | GIF |
| --- | --- |
| Spring moonlight | [spring-night](../public/art/baker-psb/v2/spring-night.gif) |
| Before sunrise | [summer-dawn](../public/art/baker-psb/v2/summer-dawn.gif) |
| Autumn moonlight | [autumn-wind](../public/art/baker-psb/v2/autumn-wind.gif) |
| Summer night rain | [summer-rain](../public/art/baker-psb/v2/summer-rain.gif) |
| Autumn night rain | [autumn-rain](../public/art/baker-psb/v2/autumn-rain.gif) |
| Winter moonlight | [winter-snow](../public/art/baker-psb/v2/winter-snow.gif) |

To re-encode v2, run `python3 scripts/animate-campus.py` with Pillow and NumPy installed. The fixed palette, motion parameters, masks, and sprite counts are in that script. To rebuild the archived v1 set instead, run `python3 scripts/animate-campus-v1.py`. Do not overwrite a previous generation round with future experimental artwork; save a v3 sibling and update the catalog when selected.

## Archived v1 production notes


Work branch: `arts-asset-creation`. Version: `v1`, November 6, 2026.

## Direction and architectural references

Original pixel-art interpretation of Cornell's Baker Laboratory and the adjacent Physical Sciences Building. The composition is deliberately recomposed from the user-provided reference: Baker's symmetrical masonry front, tall central columns, repetitive narrow windows, parapet and ivy appear beside PSB's blue-green curtain wall and white mullions. Trees frame the scene rather than hiding the entrances. A curved path and small stairways connect the view. This is an artistic interpretation, not an architectural survey or official Cornell artwork.

The user's screenshot (with visible © 2024 Google marks) was a reference, not a published asset or a photo filtered into pixel art. Additional architectural study used:

- https://chemistry.cornell.edu/ — department's front-of-Baker photograph.
- https://nowack.lassp.cornell.edu/lab — Nowack Lab's exterior PSB photograph.

No downloaded photograph, Google screenshot pixels, external sprite library, or reference-site artwork is included in the shipped image files. The visual references are acknowledged publicly at `/credits` and in `ATTRIBUTIONS.md`.

## Files

- `assets/art-source/baker-psb/v1/`: six generated master PNGs, exact prompt set, and a labeled contact sheet.
- `public/art/baker-psb/v1/`: six animated GIFs, six still PNGs, and `manifest.json` with dimensions, frame counts, duration, and file sizes.
- `public/art/night-workshop.svg`: original artwork retained unchanged as an archive and final image-load fallback.
- `scripts/animate-campus-v1.py`: reproducible animation/encoding pass.
- `src/content/scenes.ts`: scene catalog, URLs, interval, and random-selection helper.
- `src/hooks/useCampusScene.ts`: rotation and manual selection.

## Variants

| Filename stem | Setting | Motion |
| --- | --- | --- |
| [spring-morning](../public/art/baker-psb/v1/spring-morning.gif) | Fresh greens, pale sky, warm stone | Gentle edge-canopy sway, light pollen |
| [summer-dawn](../public/art/baker-psb/v1/summer-dawn.gif) | Peach/mauve dawn, deep green leaves | Gentle canopy sway, a few drifting motes |
| [autumn-wind](../public/art/baker-psb/v1/autumn-wind.gif) | Orange, rust, and gold foliage | Stronger canopy sway and drifting leaf sprites |
| [summer-rain](../public/art/baker-psb/v1/summer-rain.gif) | Green summer, overcast sky, wet paths | Canopy sway, rain, small path ripples |
| [autumn-rain](../public/art/baker-psb/v1/autumn-rain.gif) | Amber foliage, lavender-grey rain light | Sway, rain, ripples, a few drifting leaves |
| [winter-snow](../public/art/baker-psb/v1/winter-snow.gif) | Bare branches, snow-covered lawn/ledges | Slight branch movement and snowfall |

Master artwork was generated with the built-in OpenAI image-generation tool. Each seasonal edit used the spring image to preserve perspective and building placement. Full prompts are in `assets/art-source/baker-psb/v1/prompts.json`. No CLI/API fallback was used.

The local finishing script performs animation and GIF encoding rather than creative photo editing: nearest-neighbor sampling to 1086 × 362, localized periodic pixel displacement in corner-tree regions, deterministic ambient/weather sprites, a fixed per-scene palette, and 48 frames at 100 ms each (4.8-second infinite loops). Building columns and facade geometry do not sway. The motion is deliberately subtle; the detailed generated base still contains some static weather marks, with animated sprites layered over it.

## Refinement workflow

1. Inspect the source contact sheet and GIFs at their actual display size. Review architectural likeness, foliage, lighting, and motion separately.
2. For art changes, use the relevant master PNG as an image-generation edit reference and save a new version. For future art rounds, prefer a `v2` directory so `v1` stays reviewable.
3. For motion, adjust the tree masks, amplitudes, sprite counts, or timings in `scripts/animate-campus-v1.py`.
4. Re-encode from the repository root with Python 3 plus Pillow and NumPy:

   ```sh
   python3 scripts/animate-campus-v1.py
   ```

   The initial build used Pillow 13.0.0 and NumPy 2.3.5 from the bundled development runtime. These are offline asset-production tools; they are not browser dependencies and no library source is embedded in the art.
5. Revisit `src/content/scenes.ts` if paths or names change. Run `npm run build` and inspect desktop and phone views.

## Playback

A visit starts on a random GIF. In shuffle mode a different scene is selected every 10 seconds; immediate repeats are excluded. The rotation runs only while the document is visible. Individual scenes can be held with the selector; Next random scene returns to shuffle. Pause animation switches the GIF to a real still PNG and stops the timer. A saved pause or reduced-motion preference starts with still images, and a newly enabled reduced-motion setting pauses playback during a visit.

The entire illustration remains visible at small widths rather than cropping away one of the buildings. No live weather, location access, sound, or analytics are involved. GIF files are roughly 0.6–0.95 MiB each in this first pass; original masters are kept outside the public directory. Other than the displayed scene, GIFs are not all preloaded on page load.
