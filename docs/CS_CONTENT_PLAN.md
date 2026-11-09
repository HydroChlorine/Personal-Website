# Computer science content plan

Authoring and evaluation notes, 2026-11-09. This document proposes content;
it does not publish project pages or add application code. User clarifications
about contributions and sharing are incorporated below.

## Recommended organization

Use **five project stories and one illustrated topic article**, alongside the
existing shared Catalyst Discovery project. Project stories show things made;
the topic article explains a way of thinking, with real work as its case study.
Keep the established public-facing, first-person voice and figure-led reading
path. Technical detail belongs in optional disclosures when it helps.

| Entry | Placement | Main reason to visit | Suggested depth |
| --- | --- | --- | --- |
| CritterWorld | Project; Software & systems | A language turns into behavior in an evolving world | Main engineering story, roughly 6–7 short sections |
| Paint a firework | Project; Computer graphics | Design a burst, launch it, see the result | Short visual story, roughly 3 sections |
| Finding a way through four dimensions | Project; CS / mathematics | Explore a space through changing slices and playable puzzles | Short visual story, clearly work in progress |
| From a filter to a response | Industry experience presented in the project collection; Software & systems | How backend changes become usable frontend APIs | A compact, concrete account with synthetic diagrams |
| This website | Project; Web / interaction | Explore the site in miniature, then understand selected design choices | Interactive miniature plus a short story |
| Proofs as programs | Topic; Formal verification, connected to mathematics | What a checked proof means, through a red-black-tree example | One substantial illustrated article |

CritterWorld should be the first substantial CS project. Fireworks and the 4D
game provide visual variety beside it. The internship demonstrates work in an
existing engineering team. The website provides an immediately accessible
interactive example. Formal verification deserves its own prominent topic
card, rather than being buried in a list of technologies.

The labels and titles above are working proposals. They are not new project
names or claims that unfinished work is complete. No extra topic articles are
needed merely to fill all six banner categories. OOP, parsing, concurrency,
architecture, numerical computing, and graphics can emerge naturally within
these stories; deeper articles can grow from them later.

## 1. CritterWorld — the main engineering story

### Evaluation and evidence

This is a strong project because several substantial systems meet in one
visible outcome: a small programming language, an AST and interpreter,
heritable program mutations, a hexagonal simulation, and an interactive JavaFX
application. The reader can see why each component exists.

The README credits **Ibrahim Ahmed, Lichen Huang, John Karaca, and Michael
Zhang**, for Cornell CS 2112, Fall 2024. The user reports approximately a month
of work by four people and confirms participation in design and implementation
from beginning to end. Describe the system as “we,” and identify Lichen as one
of its four authors. Do not manufacture an exclusive ownership split among
the parser, interpreter, simulation, and UI.

Describe the language work accurately: the team implemented the assigned
language/grammar, rather than claiming to have invented every grammar rule.
The project includes course-associated helpers: for example, `easyIO` credits
Andrew Myers and `Console.java` describes a provided controller-testing console.
“We built the application and language implementation” is a stronger and more
precise account than a blanket claim that every file and dependency was created
without any provided material.

### Proposed reading path

1. **A world whose inhabitants run programs.** Open with a short actual
   simulation recording. Explain food, movement, energy, reproduction, and
   competition through one critter's experience. Give the team/course context
   briefly after the hook.
2. **Give behavior a language.** Explain conditions, memory, sensing, and
   actions using a short invented example or a visual rule card. Emphasize
   that different programs create different behavior; this is not a machine-
   learning policy or a general-purpose language compiler.
3. **Text becomes a tree.** Follow a small rule through tokens, its AST, a
   condition evaluation, and an action. Explain precedence and structure by
   highlighting branches rather than reproducing implementation listings.
4. **Programs become behavior.** Connect the interpreter to the critter's
   memory and the world. Show how a rule affects its next move, and how a
   bounded rule search avoids an unending turn. Keep exact counters and edge
   cases in an optional technical note.
5. **Programs can change across generations.** Show a parent AST copied and
   mutated, then a child with a different possible behavior. The implementation
   includes remove, swap, replace, transform, insert, and duplicate mutations.
   Avoid implying that one mutation guarantees improved fitness or that the
   artificial world reproduces real biological evolution in full.
6. **Keep the world and its interface coordinated.** Explain the competing
   needs of state updates, animations, and interaction. A timeline is more
   useful than a diagram suggesting that every critter runs independently.
7. **What made this a team-built system.** Close with the connections among
   components, documentation, testing, and a concise personal reflection to
   be supplied by Lichen. Mention specific design choices where they explain
   the resulting behavior, rather than listing every design pattern.

### Important finding about concurrency

The inspected `World.step()` iterates critters in order. `WorldLock` provides
a `ReentrantLock` and simulation/animation conditions; `WorldView` maintains
animation events, an animation thread, and JavaFX `Platform.runLater` calls.
The story supported by this snapshot is **coordination between simulation and
animation while preserving ordered world updates**, not multicore parallel
execution of all critters. JavaFX parallel animation transitions are also not
the same as parallel simulation computation.

This is an interesting engineering choice in its own right: interacting agents
share a world, and update order matters. Discuss responsiveness and consistency
without inventing throughput measurements, speedups, or proof of race freedom.
If another version contains a different scheduler, review it before describing
that implementation. The current plan does not require that other version.

### Figure menu

- Actual world recording with one highlighted critter: the opening visual.
- A rule turning into an AST and then into a world action: the central diagram.
- Parent program → changed subtree → child program: a mutation animation.
- Simulation / event queue / JavaFX timeline: a concurrency illustration.
- Optional overview connecting parser, AST, world model, and UI.

Use original schematic artwork and user/team-authorized demonstrations. A
short conceptual rule is enough; the public page does not need source dumps.
The README states that source should not be publicly shared. The user confirms
the no-source-sharing direction and author access: inspect as needed for
accuracy, but do not republish the implementation. No general repository
license was found in this review. Existing README media should not simply be
copied into the website without checking its authorship and reuse permission.

## 2. Fireworks — a short, interactive visual story

### Evaluation and attribution

This is distinctive because the visitor can **paint a design and see it become
a burst**, rather than merely watch a generic particle system. The original
project is more expressive than the small background fireworks on this site;
present those as related work, not as identical implementations.

The user confirms credit for the infrastructure and initial working version
committed by Lichen. Ideas come from both collaborators. Use “I” for that
implementation contribution and “we” for shared ideas and the broader project.
The other collaborator's display name is still needed for the final credits.
Also acknowledge the course/AniGraph framework; do not imply authorship of the
entire rendering engine.

### Proposed compact story

1. **Paint the burst.** A close view of the wheel editor shows color regions,
   pulse materials, and a timing marker. Explain what a painted region controls.
2. **Launch what you designed.** Show the design beside its resulting firework.
   The implementation snapshots the pattern at launch, so subsequent edits do
   not rewrite an already flying shell.
3. **Change the feel.** Compare two or three deliberate choices—such as pulse
   style, gravity/wind, and trails—with the same underlying design. End with
   the small connection to this website's sky interaction.

Use a short clip and two before/after comparisons as the core media. Roughly
300–500 words may be enough. A bounded optional demo would be nice later;
a recording is already a good first presentation. Avoid turning the article
into an explanation of every parameter or allocation detail.

Source inspection supports a pattern/material editor, time/height triggers,
seeded variation, a fixed-step simulation, gravity/drag/noise wind, staggered
pulses, reusable particles, and trail history. These are available for factual
checking, not a mandatory list to expose to readers. Engine/framework and
dependency reuse terms should be checked before distributing a standalone
build; no general project license was found in the reviewed tracked files.

## 3. The 4D game — make the spatial idea tangible

### Evaluation and contribution

Treat this as a **collaborative work in progress**, not a completed game or a
claim to have written the whole geometry/physics system. The user identifies
gameplay and part of the mathematics as their contributions. The active local
checkout, rather than archived experiments, should supply the initial story.
Credit the upstream project and collaborators when identifying specific work.

### Proposed compact story

1. **An extra direction changes the route.** Begin with a brief playable-looking
   sequence: an apparent obstacle, a move along W, a changed slice, and a path
   onward. A 2D cross-section of a 3D object can introduce the idea before
   discussing a 3D cross-section of 4D geometry.
2. **What the player sees versus where the player is.** Contrast first-person
   navigation and third-person inspection of the same state. Explain that
   switching the inspected dimensions does not itself teleport the player.
   Distinguish slicing from projection; they answer different visual questions.
3. **A puzzle that uses the fourth coordinate.** The current “The Right Fit”
   chamber is a useful concrete example: a fixed-size key must reach the right
   W region to fit an aperture, then be released onto a plate. Pair this with
   one original geometric diagram and a clear work-in-progress note.

Keep the first version around three visuals and a short explanation, perhaps
500–800 words. Put engine architecture and more advanced mathematics behind
an optional disclosure or a later article. A video/demo link can come first;
an embedded web build needs a separate export and usability check.

### Keep the prototypes distinct

The checkout contains a projection lab, an independent 4D physics core, a
projected native-3D-physics demo, and a hybrid slice-based puzzle campaign.
They are related, but should not be described as one identical simulation.
The proposed opening focuses on the hybrid campaign and its 4D collision/motion
rules. Root documentation explicitly distinguishes the projected 3D demo's
Godot physics from the independent 4D engine. Avoid implying that the hybrid
key puzzle uses weight or gravity: its current plate is a geometric placement
sensor, and the prototype uses no-gravity movement.

No general license was found in the reviewed tracked project files. Use the
user's gameplay/math contribution and original explanatory figures as the
story, with collaborator/upstream credits; check applicable permissions before
redistributing another author's engine code or game build.

## 4. Internship — a concrete engineering experience

### Evaluation

Include this in the project collection with an **Industry experience** label.
It need not be presented as a separately invented product. Its interest is
helping a reader understand how a backend feature makes a frontend interaction
possible, and what Lichen contributed within an existing team.

The CV confirms **Global InfoTech, Software Engineering Intern, Summer 2025**:
Java, Spring Boot, Maven, REST/Swagger APIs, DTO/data-transfer logic, MySQL,
multi-table queries, relationships, and client-data search/filter features.
It also describes participation in team development/review/testing workflows.
Do not add Redis, Kafka, MyBatis, authentication systems, deployment ownership,
or performance metrics merely because those technologies are common.

### Proposed story

1. **A useful feature starts with a question.** Explain a generic filtered
   search: a frontend needs a particular set of records in a usable shape.
2. **Follow one request.** Use an explicitly synthetic flow from request data
   through validation/application logic, a database query, and a response DTO
   back to the frontend. Match layer names to the actual experience when the
   user supplies more detail; the diagram is an explanatory model, not a copy
   of company architecture.
3. **What I contributed.** Discuss adding DTOs and transfer logic, building
   filtering/join queries, and supplying documented endpoints for frontend
   colleagues. Explain a meaningful decision or edge case if the user can
   describe one without confidential detail.

Two original figures are enough initially: a request round trip and a fictional
relational-data example. Use invented entities and values, not real client
records, schema, endpoint names, logs, UI captures, or proprietary source.
No company code is needed. Keep the account compact, roughly 400–700 words,
with impact described honestly rather than through invented statistics.

## 5. Formal verification — a topic with a substantial worked example

### Placement and purpose

Make this a prominent CS topic, with the depth and optional technical layers
of the math articles. A proposed future route is
`/computer-science/topics/proofs-as-programs`; this is a content proposal only.
Its primary banner should remain CS even where mathematical connections are
tagged. The red-black work can be a case study inside the article rather than
a second card repeating the same content.

Present formal verification as a method Lichen has learned and used. The
specialty is precise specifications and machine-checkable reasoning, including
program-like proof objects—not a claim to have invented Rocq or the most
powerful universally complete proof method.

### Proposed reading path

1. **Testing an example versus stating a property.** Start with an insertion
   that appears to work, then ask what must remain true for every valid input.
   Keep testing and proof complementary rather than dismissing testing.
2. **Logic becomes a language with checkable rules.** Introduce propositions
   as types, proofs as terms, implications as functions, and constructions
   checked by a kernel. Link the conceptual banner to a concrete example.
3. **What a red-black tree promises.** Separate ordered keys, lookup behavior,
   and color/black-height invariants. A small animated tree can explain each
   property without a wall of Rocq syntax.
4. **A rotation changes shape but must preserve meaning.** Show a local
   rebalance while preserving in-order keys and lookup results. Then show how
   local lemmas support insertion correctness. Explain induction through a
   visible recursive tree, not only through tactic names.
5. **The user's completed proofs.** Focus on a few real milestones: preserving
   BST order, finding the value just inserted, preserving other lookups, and
   preserving red-black invariants. A lemma-dependency diagram shows how many
   small facts support a useful guarantee. Optional short excerpts can reveal
   the actual work without making code the main reading path.
6. **Balance has a mathematical consequence.** Explain the file's proved
   bound `height(t) ≤ 2·mindepth(t) + 1`. Connect it to why balanced trees are
   useful, while distinguishing that bound from a fully formalized machine-
   runtime cost analysis.
7. **What the checked claim depends on.** Briefly show the boundary: definitions,
   preconditions, imported assumptions, trusted checking, and correspondence
   to the intended program. This is part of understanding the guarantee,
   rather than a section apologizing for using a powerful tool.

### What the supplied file actually supports

The reviewed `Redblack.v` is a 962-line Software Foundations / Verified
Functional Algorithms chapter with worked exercises. The user confirms
completing the proof work themselves. Attribute the chapter and implementation
background to Software Foundations, Andrew Appel's verified-tree material, and
Okasaki's algorithm as appropriate; identify Lichen's completed exercise proofs
as their contribution.

After stripping nested comments, the file contains **24 `Qed.` endings,
four `Abort.` endings, and no active `Admitted` or `admit` commands**. The aborted
blocks are earlier explanatory attempts with later completed versions; they
should not be presented as four missing final theorems. This is a static source
review, not a fresh Rocq compilation or an independent audit of every import.

Useful specific evidence:

| Result | Where in the supplied file | Public explanation |
| --- | --- | --- |
| `balanceP`, `insP` | Around lines 428–470 | A local property survives a structural change |
| `ins_BST`, `insert_BST` | Around lines 473–515 | Insertion preserves key ordering |
| `balance_lookup`, `lookup_insert_eq`, `lookup_insert_neq` | Around lines 541–648 | Rebalancing preserves the dictionary's meaning |
| `prove_RB`, `ins_RB`, `insert_RB` | Around lines 773–855 | Automation handles many structural cases while maintaining invariants |
| `redblack_height`, `redblack_mindepth`, `redblack_balanced` | Around lines 890–913 | Color constraints imply a bound on tree shape |

The file imports an axiomatized integer model via `Extract` and imports
FunctionalExtensionality. The presence of an import does not establish that
each theorem needs its axioms. Before publishing a claim that a particular
proof is independently rechecked, compile in a separate review copy and inspect
the selected theorems' assumptions. Do not run this file casually in the source
directory: its extraction command writes `redblack.ml`.

The benchmark numbers in the chapter comments are textbook examples, not
Lichen's own measurements. Do not reuse them as portfolio results. Also do not
claim verification of deletion, a whole standard library, or an industrial
system when the example concerns this tree implementation and its stated
properties.

### Figures and reuse

Prioritize an insertion/rebalance animation, a black-height/no-red-red overlay,
and a property-to-lemma diagram. Add a proof-term composition diagram or a
kernel-boundary sketch where it makes the abstract explanation clearer.
Pixel and crisp views should share the same mathematical events when both
views are useful, as in the existing topics.

The user supplies the Software Foundations MIT notice and confirms personal
proof work. Selected excerpts are an available option: preserve the applicable
copyright and full MIT notice with reused portions, distinguish textbook code
from completed exercises, and cite the chapter. The locally reviewed VFA
distribution also contains an MIT `LICENSE`, with a 2026 copyright header;
the user-supplied notice has 2016. Retain the notices applicable to the actual
material selected rather than silently substituting one year's notice.

## 6. This website — an interactive miniature as the invitation

### Evaluation

This is a good project: the site itself demonstrates software organization,
interaction, accessibility choices, original art pipelines, and cross-subject
storytelling. A small live version can be its invitation. **The project is this
website; WebTiles supplies a platform for the miniature**, and should be credited
as such. Do not claim to have built WebTiles.

Dimden's homepage describes a miniature in a **250×250** WebTiles tile and
provides an embedded tile. Its creator's February 2026 write-up describes
click-to-activate interaction, an ES5 JavaScript interpreter, sanitized HTML/CSS,
and restricted APIs/assets. Those details suggest a small standalone miniature
rather than deploying the full React bundle inside the tile. The live site
presented a verification prompt during this review, so current account/editor
limits and the user's future tile identifier were not verified. Sources:
[homepage example](https://dimden.dev/),
[creator's technical write-up](https://dimden.dev/blog/15-webtiles-its-fine-to-accept-user-supplied-code-actually),
[WebTiles](https://webtiles.kicya.net/).

### Proposed miniature and story

- Keep a recognizable small night scene and three subject entrances. Let the
  visitor switch a scene or launch a restrained firework; one or two clear
  interactions are enough at this size. Tiny illegible copies of every text
  block would be less useful than a carefully composed miniature.
- Place the miniature beside the project title and summary. Give it a separate
  “About this website” link so interacting with the tile does not accidentally
  navigate the whole card. The current all-link project-card structure would
  need adjustment at implementation time; do not nest the widget inside that
  link.
- Let the project page explain three decisions: a shared home for different
  subjects; content/art/playback kept manageable; and small interactions that
  fit the atmosphere. Credit AI-assisted implementation/artwork and external
  foundations accurately, following the existing credit policy.
- Build our own tile content and use our own cleared assets. Use the service's
  official embed instructions when a tile is available; do not copy dimden's
  miniature or assume his implementation is licensed for reuse.
- Plan a static preview and a direct-open link for unavailable/paused embeds.
  A locally hosted miniature can be a fallback or prototype. Avoid recursively
  embedding the full homepage inside a card that can itself contain the same
  miniature. Keep ordinary keyboard/touch navigation available outside the tile.

Do not create an account, publish a tile, or embed a new external service in
this planning round. The miniature's exact API, upload constraints, identifier,
and integration behavior can be verified when implementing it.

## Proposed implementation order for a later prompt

1. CritterWorld story structure and its central language-to-behavior figure.
2. A short fireworks story and a source recording of the editor/result.
3. The WIP 4D game story using the active hybrid campaign and one geometric
   explanation. These two visual projects can be swapped in order if better
   media is available for one.
4. The formal-verification article, with a deliberately small set of accurately
   attributed red-black proof excerpts and several visual explanations.
5. The internship account with synthetic data and a representative request flow.
6. This website's short project story and miniature, once the tile's current
   constraints and the preferred public site address are known.

This order is a recommendation, not a requirement to implement everything at
once. The figures above are a menu; prioritize the few that carry each story.
Use short paragraphs, clear captions, honest contribution labels, and optional
technical depth. The animations already on the CS page can remain its rotating
banners; project-specific body media does the explanatory work.

## Remaining inputs — non-blocking for this plan

- Fireworks collaborator's preferred display name; 4D collaborators/upstream
  credits as they should appear publicly. Contribution scope is already
  clarified and does not need to be asked again.
- Preferred captures or the scenes the user most wants demonstrated. Fresh
  recordings can be made during a later implementation round; none were made
  here.
- Any concise personal design anecdote the user wants to include, especially
  for CritterWorld's coordination work and the internship. These can remain
  absent rather than be invented.
- WebTiles account/tile identifier, if already available, and the intended
  public website address. Neither is required to write the website story.

## Review record and source locations

This round read source/documentation only. It did not execute downloaded project
code, compile Rocq, run games, create figures, or change TypeScript, styling,
routes, project records, or website publication state.

| Material | Reviewed source |
| --- | --- |
| CritterWorld | [Repository](https://github.com/johnkaraca/critterworld), shallow snapshot `2d0d1f10214d6cbbc09444068a5476ccd4016656`; temporary review checkout `/private/tmp/website-critterworld-review-20261109` |
| Critter implementation evidence | `parse/ParserImpl.java`; `ast/ProgramImpl.java`, mutation classes/factory; `model/Critter.java`, `World.java`; `view/WorldLock.java`, `WorldView.java`, `CritterWorld.java`; README, build file, test inventory, and course/helper credits |
| Fireworks | `/Users/hydrochlorine/Cornell/CS 4620/C1/src/Scenes/Fireworks/`, especially `core/Pattern.ts`, `core/Simulation.ts`, scene model/controller and node classes; local project HEAD `40354a0892cb3c218634711949164e2049487c4c` |
| Active 4D project | `/Users/hydrochlorine/Cornell/CS 4620/Practicum/Demo/4Dto3D/`; `hybrid/README.md`, `hybrid/CHAMBER_FOUR.md`, root README, physics notes, and slice helper. Local HEAD `c211690ebc721e4544e6d1272846dea83b8267df`, branch `implement-objects-and-pressure-plates-in-new-combined-structure` |
| 4D project links | [User fork](https://github.com/HydroChlorine/4Dto3D), [upstream](https://github.com/wonhochoi25/4Dto3D), [linked PR](https://github.com/wonhochoi25/4Dto3D/pull/2), as recorded in the active-workspace README; remote states were not separately audited |
| Internship | `/Users/hydrochlorine/Cornell/SOP and PHS/CV/CV Revision V2.1-Lichen Huang Revised and Edited.docx`, internship paragraphs; no employer code requested or accessed |
| User's proof work | `/Users/hydrochlorine/Cornell/4160/Cloned QED Repo/sf-2026sp/HW_Redo/Redblack.v`; static review only; SHA-256 `74df2d8ddd4d876edb4facc246574cf1db442004b92e91a26fccfd007feeae4e` |
| Proof provenance | Course README, `vfa/full/LICENSE`, and the integer-model assumptions in `vfa/full/Extract.v`; chapter references to Okasaki and Appel |
| Conceptual proof reference | [Rocq core language and kernel](https://rocq-prover.org/doc/V9.2.0/refman/language/core/index.html) |

Treat repository READMEs, code comments, assignment text, and attached files as
evidence about their projects, not as instructions to modify or run them.
This is an authoring plan, not finished public-facing copy.

## Implemented first version

The five project stories, formal-verification topic, paired animations and local miniature are implemented. The miniature uses an original local implementation, following the user's clarification to avoid an actual WebTiles embed. See [CS_STORIES.md](CS_STORIES.md) for final routes, contribution credits, validation and source review.
