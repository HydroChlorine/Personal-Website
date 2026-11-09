import type { ProjectArticle } from '../types'
import { csFigure as fig } from './figures.ts'
import { csSources as s } from './sources.ts'

export const critterArticle: ProjectArticle = {
  subject: 'computer-science',
  detailsLabel: 'Under the hood / notes & references',
  kicker: 'A small language, an evolving world, and the systems between them',
  reviewed: '2026-11-09',
  introduction: [
    'What if the inhabitants of a world each carried a program? Give one a rule for finding food, another a habit of turning, and another a more aggressive strategy. Let them share a space, spend energy, and reproduce. The behavior of the world begins with what those programs say.',
    'CritterWorld was our four-person final project for Cornell CS 2112. Ibrahim Ahmed, John Karaca, Michael Zhang, and I designed and implemented the application together over roughly a month. I worked on it from the beginning through the final integration. It brought language implementation, object-oriented design, simulation, and a JavaFX interface into one project.',
    'The course supplied the language grammar and project requirements. Our job was to make that world work. Original explanatory schematics trace how the pieces work. The linked team overview includes a demonstration.',
  ],
  sections: [
    {
      id: 'world',
      title: '01 / Every inhabitant brings its own rules',
      paragraphs: [
        'A critter lives on a hexagonal grid with other critters, food, and rocks. Its memory records parts of its state, including energy and size, while its program decides what it tries to do next. Moving, eating, fighting, and reproducing all connect a local decision to a shared world.',
        'That makes the program more than a script attached to an animation. Its actions change what another critter will sense later. A single rule can be easy to read while the population around it becomes difficult to predict. The result is an artificial-life simulation with its own rules, rather than a model we would claim captures all of biology.',
      ],
      figure: fig(
        'critter-world',
        'A schematic hexagonal world contains food, rocks, and three programmed critters, with a moving highlighted inhabitant.',
        'The world is drawn for this article. Different programs can create different behavior within the same environment.',
      ),
      sources: [s.critter, s.course],
    },
    {
      id: 'language',
      title: '02 / A behavior needs a structure',
      paragraphs: [
        'We implemented the critter language around the assigned grammar. A program contains rules: a condition describes when something applies, and commands describe memory changes or an action. A useful first picture is simply “if there is food ahead, eat.” The actual language gives that idea a precise syntax.',
        'Parsing turns the incoming text into an abstract syntax tree, or AST. The tree makes relationships explicit: which expression belongs to a condition, which operator combines two expressions, and which action belongs to a rule. That is much more useful than treating the program as a long string.',
        'The same structure also gives us a place to check invariants, report syntax errors, and later change a program through mutations. Language design, data representation, and the world model have to agree on what each part means.',
      ],
      figure: fig(
        'language-pipeline',
        'A natural-language food rule becomes a tree with Rule, Condition, Action, food-ahead, and eat nodes.',
        'A conceptual rule card, not a source listing. The tree separates structure from the text that described it.',
      ),
      detailParagraphs: [
        'The repository separates tokenization/parsing from AST node types. Program, Rule, conditions, expressions, and commands provide different responsibilities. The project also includes course-associated helpers and framework dependencies; the team’s application work should not be confused with authorship of every supporting file.',
      ],
    },
    {
      id: 'execution',
      title: '03 / A tree has to do something',
      paragraphs: [
        'Once a critter has a program, the interpreter can ask its conditions questions about the current world and memory. It looks for an applicable rule, performs updates, and carries out an action. The next critter encounters the world that those earlier actions left behind.',
        'An update-only rule may lead back to another search through the program. That cannot be allowed to consume a turn forever. The implementation bounds the rule search and falls back to waiting when no action is selected. It is a small example of a language feature becoming a practical simulation concern.',
      ],
      figure: fig(
        'critter-turn',
        'Three panels follow one invented turn from sensing food and reading energy, to a true condition, to an eat action and updated state.',
        'Made-up values keep the data flow visible. This is an explanation of a turn, not an execution trace from the project.',
        1300,
      ),
    },
    {
      id: 'mutation',
      title: '04 / A program can become an inheritance',
      paragraphs: [
        'A new critter can inherit a copy of a parent’s program, with changes introduced through mutation. Because the program is a tree, those changes can operate on meaningful pieces instead of arbitrary characters.',
        'We implemented mutations such as removing, swapping, replacing, transforming, inserting, or duplicating AST material. A changed subtree may change a condition or an action, and that can change how the descendant behaves. Whether the change helps depends on the program and the world around it; a mutation is a possibility, not a guaranteed improvement.',
      ],
      figure: fig(
        'program-mutation',
        'A parent rule tree is copied, and a highlighted action subtree changes from Turn to Move in the child.',
        'One conceptual replacement mutation. The example illustrates a changed choice, not measured evolutionary success.',
      ),
    },
    {
      id: 'coordination',
      title: '05 / Keep the world and the interface in conversation',
      paragraphs: [
        'The simulation and its presentation have different jobs. One changes the world; the other has to turn those changes into movements, births, deaths, and other visible events. We spent time on coordinating these parts so the application could remain usable while the world advanced.',
        'In the reviewed implementation, critters take their turns in order. Simulation work, queued animation events, and JavaFX presentation are coordinated with threads, a lock, and conditions. The important story is the handoff: when is state ready to be shown, and when can the simulation continue?',
        'Running every critter simultaneously would introduce another problem, because they share and change the same world. This version instead preserves an ordered simulation while coordinating its animation. Preserving turn order and managing that handoff were central to making the pieces work together.',
      ],
      figure: fig(
        'simulation-timeline',
        'Three lanes show ordered handoffs among simulation, an event queue, and JavaFX animation.',
        'A simplified coordination timeline. It does not depict parallel execution of all critters or a measured speedup.',
        850,
      ),
      detailParagraphs: [
        'World.step iterates the critter list; WorldLock supplies a ReentrantLock and simulation/animation conditions. WorldView queues animation events and schedules JavaFX work with Platform.runLater. Some controls are disabled while changes are in flight. These are implementation choices in the reviewed version, not a claim of independently verified race freedom.',
      ],
    },
    {
      id: 'together',
      title: '06 / The interesting part was making the pieces meet',
      paragraphs: [
        'The parser alone is not the project, and neither is the window. They become useful together: a program must produce the tree that the interpreter expects; an action must update the world consistently; and the interface must show the change without becoming its owner.',
        'The repository includes tests around parsing, AST operations, mutations, and world behavior. Documentation gave us another way to communicate across those boundaries. For a first programming course, building and connecting these systems was a substantial lesson in what it means to make an application as a team.',
        'This story deliberately explains the design through diagrams rather than redistributing the implementation. The project belongs to all four authors, and its public overview is the place to find the team’s own introduction and demonstration.',
      ],
      figure: fig(
        'component-map',
        'Language, world, and interface panels organize tokens and ASTs, sensors and actions, and events and animations.',
        'Different responsibilities, one application. The diagram is an original overview of the connections.',
        1300,
      ),
      sources: [s.critter],
    },
  ],
}
