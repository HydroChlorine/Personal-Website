import type { ProjectArticle } from '../types'
import { csFigure as fig } from './figures.ts'
import { csSources as s } from './sources.ts'

export const dimensionsArticle: ProjectArticle = {
  subject: 'computer-science',
  detailsLabel: 'Under the hood / notes & references',
  kicker: 'A work-in-progress game about finding another direction',
  reviewed: '2026-11-09',
  introduction: [
    'A wall can look unavoidable until there is another direction in which to move. This ongoing Godot project explores that thought through a four-dimensional world and a three-dimensional view into it.',
    'My contributions focus on gameplay and part of the mathematics. The project is collaborative and builds on the 4Dto3D work linked below. It is still a prototype: these are mechanics and ideas we are developing, not a finished game.',
    'The illustrations explain the geometry and current puzzle ideas. They are original schematics rather than screenshots from a playthrough.',
  ],
  sections: [
    {
      id: 'slice',
      title: '01 / A view is a choice about what to keep',
      paragraphs: [
        'Imagine a plane passing through a three-dimensional object. The shape in the plane is a cross-section: it contains only the intersection. A projection is different; it maps the whole object into fewer coordinates, so distant parts may overlap.',
        'The same distinction matters one dimension higher. The game uses slices of four-dimensional geometry. Choosing a three-dimensional slice determines what is visible there. The accompanying tesseract drawing gives a small example of why a slice and a shadow should not be confused.',
      ],
      figure: fig(
        'slice-shadow',
        'A rotated tesseract’s projected edge graph is compared with its computed intersection with a moving constant-W hyperplane.',
        'The section is computed from the tesseract’s edges and square faces, then drawn in a 2D view. It is a constructed teaching example.',
      ),
      sources: [s.game, s.upstream],
    },
    {
      id: 'navigate',
      title: '02 / Walk, inspect, return',
      paragraphs: [
        'The hybrid campaign combines first-person movement with a third-person inspection mode. One lets the player experience the space from within; the other helps make sense of the geometry. Both refer to the same underlying position.',
        'Switching between dimension sets changes the view rather than teleporting the player. A move along W may look stationary in an XYZ view while becoming obvious in a YZW view. That is a useful puzzle ingredient: learn which coordinate is missing from what you currently see.',
      ],
      figure: fig(
        'coordinate-views',
        'A single constructed 4D route is drawn in XYZ and YZW coordinate views, with identical X/W state readouts.',
        'Two views of one moving state. These coordinate plots explain the idea; they are not game-rendered camera captures.',
      ),
      detailParagraphs: [
        'The active hybrid campaign uses the existing 4D swept movement/collision path. The repository also contains a projection lab, a separate 4D physics core, and a projected native-3D-physics demo. Those prototypes have different jobs; this story focuses on the hybrid gameplay rather than attributing every subsystem to my own work.',
      ],
    },
    {
      id: 'fit',
      title: '03 / The key keeps its size; the route changes',
      paragraphs: [
        'One current chamber, “The Right Fit,” asks the player to carry a key through an opening that varies along W. The key does not shrink to solve it. The player must find a region where the entire key fits, including its thickness along the fourth coordinate.',
        'That last detail is useful. Seeing a wide opening in the current slice does not guarantee enough clearance across the full object. After passing through, the player releases the key into a geometric plate region to unlock the exit. The prototype uses no-gravity movement; this is a placement mechanic, not a weight puzzle.',
        'The game is still taking shape. The next useful evidence will be playthroughs: whether a new player can discover the spatial rule, connect the views, and use it deliberately. That is where the mathematical construction has to become understandable gameplay.',
      ],
      figure: fig(
        'key-aperture',
        'Three key positions at W=0, 2.1, and 3 show a narrow opening, partial-thickness obstruction, and full clearance.',
        'A schematic of the current chamber. The key’s full W interval matters, not just the opening at its center.',
        1300,
      ),
      aside: {
        title: 'Work in progress',
        text: 'Gameplay, explanations, and the campaign are still being developed. The examples describe the current prototype and my gameplay/mathematical contributions within a collaborative project.',
      },
      sources: [s.game, s.upstream],
    },
  ],
}
