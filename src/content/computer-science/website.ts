import type { ProjectArticle } from '../types'
import { csFigure as fig } from './figures.ts'

export const websiteArticle: ProjectArticle = {
  subject: 'computer-science',
  kicker: 'Leave a little room for wandering',
  reviewed: '2026-11-09',
  introduction: [
    'A small home for chemistry, mathematics, computer science, and whatever catches my curiosity next. I wanted it to feel like a place to spend a little time in. There are a few things here that only reveal themselves when you linger.',
  ],
  sections: [
    {
      id: 'weather',
      title: '01 / A sky with some distance',
      paragraphs: [
        'The weather has four layers: distant flakes are smaller, dimmer, and more numerous; nearer ones pass brighter and faster. A little wandering wind keeps the rain and snow from moving in perfect formation.',
      ],
      figure: fig(
        'site-layers',
        'A moonlit scene with four depths of drifting snow, from faint distant specks to bright foreground flakes.',
        'Somewhere between the quiet distance and a flake passing close by.',
        1300,
      ),
    },
    {
      id: 'settling',
      title: '02 / Stay a little longer',
      paragraphs: [
        'After a short while, the weather begins to leave a trace. Snow settles on the tops of the panels and catches along their edges; rain gives the signs a damp sheen. The effect grows slowly, then settles too. Changing the weather gives the scene a fresh start.',
      ],
      figure: fig(
        'local-atmosphere',
        'Neon signs in a night sky slowly gather a soft cap of snow while a small firework opens overhead.',
        'A light left on, snow gathering, a brief spark in the sky.',
        1300,
      ),
    },
    {
      id: 'spark',
      title: '03 / Make a wish',
      paragraphs: [
        'Try an empty patch of sky. A firework travels out from near the bottom center, curves toward your chosen spot, and opens there. A small invitation to leave a little color behind.',
      ],
    },
  ],
}
