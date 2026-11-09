import type { ProjectArticle } from '../types'
import { csFigure as fig } from './figures.ts'

export const fireworksArticle: ProjectArticle = {
  subject: 'computer-science',
  detailsLabel: 'Under the hood / notes & references',
  kicker: 'Paint a small design. Give it a sky.',
  reviewed: '2026-11-09',
  introduction: [
    'A firework is already a picture in motion. For this graphics project, we wanted to let someone design part of that picture before launching it: choose regions of color and different pulse styles, then see what opens in the sky.',
    'I built the infrastructure and the initial working implementation. The ideas developed through both collaborators, so the broader project is a shared creation. It was built within the course’s AniGraph environment; the rendering framework is not my own engine.',
    'The figures below are original particle illustrations of the design ideas. They are not recordings of the course application. The small sky fireworks on this website are a related, separately implemented interaction.',
  ],
  sections: [
    {
      id: 'paint',
      title: '01 / Start with the shape of the burst',
      paragraphs: [
        'The editor is a wheel of paintable cells. A region can carry a spark color, a pulse style, or a timing marker. The useful idea is to keep the larger arrangement recognizable when it becomes many moving particles.',
        'Painting the design makes the simulation feel less like a list of parameters. A patch of warm color or a different kind of pulse becomes a choice you can see before launch, then recognize again when the burst unfolds.',
      ],
      figure: fig(
        'painted-burst',
        'A colored design wheel is paired with a spreading particle burst that retains the wheel’s color regions.',
        'An illustrative pattern-to-burst mapping. The underlying sample directions are shared across the comparisons.',
      ),
    },
    {
      id: 'launch',
      title: '02 / Launch a copy, then keep creating',
      paragraphs: [
        'A launch takes a snapshot of the design and settings. That matters for a simple reason: editing the next firework should not silently recolor one that is already flying.',
        'The implementation separates the editable pattern, the launch and burst lifecycle, and the particles that render the result. It also supports time- or height-based triggering. The visitor does not need to know those boundaries to enjoy the effect, but those boundaries make the interaction behave sensibly.',
      ],
      figure: fig(
        'frozen-design',
        'The design wheel changes to mint while a previously launched burst retains its earlier mixture of colors.',
        'The editor changes; the earlier launch retains its own snapshot.',
      ),
    },
    {
      id: 'feel',
      title: '03 / A few choices change the whole feeling',
      paragraphs: [
        'Trails make a particle’s recent motion visible. Wind bends the burst, while gravity, drag, and pulse timing change how it opens and settles. A clear design can become soft, energetic, or lingering without needing an entirely different system.',
        'That combination of a controllable design and an unpredictable-looking motion is what I wanted to carry into the website’s sky. Here the interaction is smaller: click the background, follow the launch, and watch it open. The course project has its own editor and richer controls.',
      ],
      figure: fig(
        'wind-trails',
        'Three synthetic bursts compare a clear launch, added wind, and the same windy launch without trails.',
        'A visual comparison of motion and persistence, using the same generated directions—not a performance benchmark.',
        1300,
      ),
      detailParagraphs: [
        'The reviewed project uses a fixed-step particle simulation, seeded variation, gravity/drag, a noise-driven wind field, reusable particle storage, and trail history. These support the visual effect; the first story does not need to enumerate every tuning control. Attribution distinguishes my initial infrastructure from the collaborators’ shared ideas and the course framework.',
      ],
    },
  ],
}
