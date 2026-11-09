# Computer science stories — 9 November 2026

The CS collection now links five project stories and one topic article. Content lives in `src/content/computer-science/`; the shared article renderer keeps the existing chemistry/math reading style, optional technical disclosures, references, and pixel/crisp controls.

| Route | Focus | Original figure concepts |
| --- | --- | --- |
| `/projects/critterworld` | Language, AST, turns, mutation, coordinated simulation and UI | 6 |
| `/projects/paint-a-firework` | Painting bursts, snapshots, motion and trails | 3 |
| `/projects/four-dimensions` | Slices versus projections, coordinate views, a spatial puzzle | 3 |
| `/projects/backend-internship` | Request/DTO/service/database flow and relational filtering | 2 |
| `/projects/this-website` | Shared site structure, atmosphere and a local miniature | 2 |
| `/computer-science/topics/proofs-as-programs` | Proof objects, red-black invariants, lookup and height guarantees | 7 |

The Godot project is explicitly work in progress. Its shared math tag does not override its CS banner. Catalyst Discovery still uses chemistry banners, and the existing algebra discussion project remains in the mathematics collection.

## Sources, authorship and boundaries

CritterWorld was reviewed through the team repository and documentation, together with the user's description and clarification. Credit belongs to Ibrahim Ahmed, Lichen Huang, John Karaca and Michael Zhang. The article describes the collaborative system rather than claiming sole authorship. It publishes original explanatory schematics, not course source listings or performance measurements. Critter execution order and UI coordination are distinguished; the diagrams do not claim that every critter executes in parallel.

The fireworks and Godot stories were informed by local project checkouts and the user's contribution statements. Lichen built the fireworks infrastructure and initial working version; ideas were shared with a collaborator. The Godot contribution is gameplay and part of the mathematics, within a collaborative upstream project. Project and upstream links are retained. Animated views illustrate the ideas; they are not recordings of the applications.

The Global InfoTech story uses the CV and user account of Summer 2025 backend work. Diagrams use abstract linked records and CRUD interactions, with no employer source, private database contents or internal screenshots.

The website and diagrams were developed with AI assistance under the user's direction. The miniature-site interaction idea explicitly credits dimden beside each widget, in the project story, and on the credits page. No WebTiles runtime, external widget, account, artwork or code is embedded.

Primary references live in `sources.ts` and the public article disclosures. Attribution and MIT notices are also retained in `ATTRIBUTIONS.md` and `public/licenses/SOFTWARE_FOUNDATIONS_MIT.txt`.

## Rocq source review

The user supplied `Redblack.v` from their Software Foundations coursework and confirmed completing the exercise proofs. Software Foundations supplies the definitions, chapter framework and preceding results. The public article includes only a short attributed exercise excerpt, not the whole source file.

An isolated temporary copy compiled successfully using Rocq 9.1.0 and the local VFA library:

```sh
rocq compile -Q '/Users/hydrochlorine/Cornell/4160/Cloned QED Repo/sf-2026sp/vfa/full' VFA Redblack.v
```

The temporary copy appended `Print Assumptions` for `insert_BST`, `lookup_insert_eq`, `insert_RB`, and `redblack_balanced`. The first two report the abstract integer/comparison setting (`int`, `Abs`, `Abs_inj`, `ltb`, `ltb_lt`); `insert_RB` reports `int`, `Abs`, `ltb`, `ltb_lt`; `redblack_balanced` reports `int : Type`. These are relative guarantees, not a claim of assumption-free verification. Functional extensionality was not reported as a dependency of these selected results. The source has 24 completed `Qed` proofs and four aborted explanatory attempts, with no active `Admitted`. Compilation and extraction occurred only in `/private/tmp/website-rocq-review-20261109`, leaving the course directory untouched.

Reviewed source SHA-256: `74df2d8ddd4d876edb4facc246574cf1db442004b92e91a26fccfd007feeae4e`.

## Original media and miniature

`scripts/draw-cs-stories.py` builds 23 original recipes through the existing drawing pipeline. Each produces eight exports: wide/phone SVG, pixel GIF, pixel PNG still, and crisp GIF. There are 184 image assets plus a manifest in `public/media/computer-science/stories/`. Both animation styles use the same 48 source frames at 120 ms (5.76 seconds); crisp exports have twice the logical dimensions. Pixel viewing is the default. Global pause uses the PNG or SVG still; phone sources are selected responsively. Rebuild with the project Python environment containing NumPy/Pillow:

```sh
python3 scripts/draw-cs-stories.py
python3 scripts/verify-cs-stories.py
```

Validation checks all 46 wide/phone sets, label bounds, shared durations, genuine motion, pixel blocks, crisp detail, tesseract topology/sections, red-black-tree invariants/height. No measured datasets, copied artwork or new browser dependencies were added.

The miniature is a condensed render of the actual homepage at `/miniature`, using the same `SiteLayout`, `HomePage`, banner, subject links and project cards. Its 1440px document is scaled uniformly into a 250px tile. It includes the greeting, three subject links, two selected projects (Catalyst Discovery and CritterWorld), notebook and playground sections. Selecting only these two projects prevents recursive website widgets. Links open their real destination in the parent page, while banner and sky interactions stay in the miniature. Parent motion is passed by query string; the real site’s pause/still behavior applies. This trusted, same-origin app view contains only the repository’s own content and dependencies, without a third-party embed. The former static demo path redirects to `/miniature`.

The website story now stays concise and atmospheric: four-layer weather, accumulation, and a small invitation to launch fireworks. The two former implementation diagrams have been redrawn as original moonlit neon/snow/firework scenes. The backend story uses abstract CRUD and relationship illustrations without named people or example database rows. Both styles and phone exports are regenerated from the same four revised recipes.

## Verification

- `npm test`: 27 tests pass, including route context, all story assets, motion variants, hosting and miniature files.
- `npm run build`: TypeScript and production Vite build pass.
- Miniature code is now part of the checked TypeScript application; the old standalone canvas script has been removed.
- Asset validator: all 23 concepts / 46 layout sets pass.
- Local browser: all six pages checked on desktop and at 390px phone width; no horizontal overflow. Crisp sources load with the expected wide/phone resolution. Miniature banner interaction, homepage links and global pause/resume verified. Local preview screenshots are in `docs/previews/2026-11-09/`.

Nothing was committed, pushed or deployed by this implementation.

Revision QA: the condensed homepage includes all four requested lower-section headings and exactly two project cards, with zero nested iframes. Its Chemistry link was clicked and opened the full Chemistry page in the parent. Its banner advances locally, and parent pause sets the miniature to `motion-paused`. Both revised stories have no horizontal overflow at 390px; their crisp phone GIFs load at the expected resolution. Browser error logs were empty. Revised screenshots: `miniature-homepage-revised.png` and `miniature-homepage-revised-mobile.png`.
