# Computer science desk scenes

Six original monitor animations share the site's midnight mathematics desk,
32-color palette, and coarse pixel grid. The CS branch is
`codex/cs-section-implementation`, created from merged `origin/main`.

## Artwork and playback

- `scripts/animate-computer-science.py` draws the new monitor art and reuses
  this repository's original room, font helper, and palette from
  `animate-mathematics.py`. It does not regenerate mathematics assets.
- Public output is `public/art/computer-science/v1/`: six desktop GIFs and PNGs,
  six phone GIFs and PNGs, six monitor-study PNGs, and a manifest.
- Logical sizes are 384×128 desktop and 256×224 portrait, enlarged exactly 3×
  using nearest-neighbor sampling. The monitor is 194×96 logical pixels.
  Phone layouts place the drawing below the HTML headline.
- Loops contain 160 authored frames at 100ms, or 16 seconds. `useSceneCycle`
  rotates topics after 30 seconds of visible, active playback. Click, tap,
  Enter, and Space advance the same sequence and restart the timer.
- Global pause and reduced motion select actual PNG stills; GIF errors fall
  back to their still. Each subject retains its own position while navigating.
- CS context covers its subject routes, project filters, and catalogued CS
  projects/notes. Chemistry takes precedence for shared entries, then math,
  then CS. Catalyst Discovery retains its chemistry banner.

## What the scenes represent

1. **Objects:** a Java Shape interface and a simple factory illustrate a shared
   draw operation with circle/square implementations. The excerpt is a teaching
   sketch, not a complete program or specifically the GoF Factory Method.
2. **Logic:** all four Boolean input pairs are evaluated by two AND circuits,
   showing that exchanging inputs preserves the result.
3. **Architecture:** an illustrative eight-bit machine loads five from address
   0x10, adds one in R0, and stores six at address 0x11. Read/execute and commit
   phases are distinguished. The syntax and timing are not a particular CPU.
4. **Web:** a browser request reaches an application server and a database;
   the result returns through the server to the browser. This is an authored
   request/query/response sketch, not actual traffic or a universal web stack.
5. **Graphics:** eight cube vertices and twelve edges undergo computed 3D
   rotation and perspective projection. Painter ordering and quantized
   normal/light shading produce the filled view. The final phase places it in
   a small interface with scene/mesh/material objects.
6. **Formal verification:** a conceptual Curry–Howard animation replaces the
   original tactic-script display. A structured proposition unfolds into typed
   function blocks. Different shapes and colors mark types A, B, and C. Given
   proofs of implications A→B and B→C, function composition constructs A→C.
   A proof object of A passes through the functions to produce one of C. The
   assembled object is scanned and illuminated by an illustrative kernel check.
   These blocks represent proof terms, not an arbitrary program that is
   automatically correct. The GIF is not a live Rocq session.

The formal-verification headline is **“Logic, made checkable.”** Its subtitle is
“Propositions as types. Proofs as programs. Checked at the core.” The emphasis
is precise formalization and machine checking relative to definitions and
assumptions. It makes no claim that a sufficiently expressive proof system can
prove every true statement, that all assumptions are established, or that the
formal specification automatically matches physical reality.

## Content and authorship

The interests are Software & systems, Scientific computing, Formal
verification, Computer graphics, and “…”, labeled accessibly as “More
interests, still growing.” The overlap passage connects Catalyst Discovery,
Fourier transforms, matrix methods, graphics, and reasoning about programs.
Further project shelves await actual work and media.

All illustrations and prose were created for this site. No external art,
logos, course screenshots, or third-party implementation code is distributed.
The local system Menlo font is rasterized; its font file is not bundled.
Primary conceptual references are linked in
`src/content/computerScienceReferences.ts` and on the public credits page:
Oracle's OOP tutorial, MDN's client/server overview, and Rocq's core-language
explanation of proof terms and kernel type checking. See `ATTRIBUTIONS.md`.

## Rebuild and verify

With the existing Python environment containing NumPy and Pillow:

```sh
python3 scripts/animate-computer-science.py
python3 scripts/verify-computer-science-assets.py
npm test
npm run build
```

For an isolated revision, import the drawing module and call `main(['proof'])`.
This regenerates that scene's wide/mobile GIFs, stills, and study, preserves the
other five scenes and manifest entries, and refreshes the full contact sheet.
No extra browser dependencies are required.

Source previews are in `assets/art-source/computer-science/v1/`, including
`contact-sheet.png` and `proof-concept-storyboard.png`.

## Verification recorded 2026-11-09

All 24 Node tests passed, including CS route/filter/detail handling and shared
subject precedence. The production build, targeted formatting, and whitespace
checks passed. The offline validator checked all 12 GIFs, 12 pause images, and
six studies for dimensions, every authored label's bounds, motion, 16-second
loop duration, and exact pixel blocks.

Browser checks at 1280×900, 600×844, and 390×844 verified manual/keyboard
advance, all six phone sources and paused stills, resumed GIFs, no horizontal
overflow, and no console warnings/errors. Timed rotation was observed after one
30-second interval. CS filtering retained CS art; Catalyst switched to chemistry;
math pages kept math art; returning to CS preserved its separate sequence.
Motion was restored and viewport overrides reset after testing.

Page screenshots are retained in `docs/previews/2026-11-09/`.

Formal-verification refinement: the wide/mobile GIFs, pause images, and study
were regenerated together; checksums confirmed the other five scenes' assets
were preserved. The production build, asset validator, and formatting checks
passed. Desktop and phone previews confirmed the new copy and diagram, PNG
pause sources, and resumed portrait GIF without horizontal overflow. Preview:
`docs/previews/2026-11-09/formal-verification-concept.png`.
