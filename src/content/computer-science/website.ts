import type { ProjectArticle } from '../types'
import { csFigure as fig } from './figures.ts'
import { csSources as s } from './sources.ts'

export const websiteArticle: ProjectArticle = {
  subject: 'computer-science',
  detailsLabel: 'Under the hood / design notes & references',
  kicker: 'A small place that can keep growing',
  reviewed: '2026-11-09',
  introduction: [
    'This website began as a way to introduce myself, but I wanted it to be more than a second copy of an application packet. Chemistry, mathematics, and computer science belong here together, along with things I make and questions I keep following.',
    'The miniature above is a small interactive interpretation of this place. Switch its subject views, change the sky, or click it to launch a firework. It is locally hosted for now; the idea of an interactive site in a tile was inspired by dimden’s WebTiles miniature.',
  ],
  sections: [
    {
      id: 'home',
      title: '01 / A home for work that crosses subjects',
      paragraphs: [
        'A project can belong to several subjects without needing several competing versions of its story. Catalyst Discovery is a useful example: it starts in chemistry, uses mathematical ideas, and becomes software.',
        'The site keeps project content separate from the shared layout and article renderer. That makes it easier to add a story, keep its references nearby, and give it an appropriate banner without rebuilding the whole page. The same figure component supplies pixel and crisp views, mobile versions, and stills when motion is paused.',
      ],
      figure: fig(
        'site-layers',
        'Three panels separate website content, shared presentation, and interactions such as scene rotation, weather, and fireworks.',
        'A simplified map of this website’s responsibilities. The miniature is a demo of the project, not a separate website platform.',
        1300,
      ),
      sources: [s.repository],
    },
    {
      id: 'sky',
      title: '02 / The atmosphere is an interaction too',
      paragraphs: [
        'The page should feel like a small night scene, with details that reward spending a little time here. The campus banner starts from the visitor’s local season; subject pages have their own scene sequences. Weather has depth, and background clicks send a firework toward the chosen spot.',
        'Those effects also need boundaries. Global pause selects still artwork and stops motion. Phone layouts keep the image below the words where necessary. Weather starts from the local calendar and preferences rather than a location lookup or a live weather service.',
      ],
      figure: fig(
        'local-atmosphere',
        'Examples connect a November clock to winter/snow, July to summer/rain, and visitor controls to motion and appearance.',
        'Examples from the site’s calendar rules. The miniature offers its own small controls for exploring the visual idea.',
        1300,
      ),
    },
    {
      id: 'miniature',
      title: '03 / A miniature is its own design problem',
      paragraphs: [
        'At 250 pixels across, a full page shrunk down would mostly become unreadable text. The miniature keeps a few recognizable ideas instead: a night sky, three subject entrances, changing scenes, and a small firework interaction.',
        'It has its own lightweight drawing code and no nested copy of the main site. The surrounding project link remains separate, so playing with it does not accidentally open a different page. Keyboard controls and a direct-open link make it usable beyond a mouse click.',
        'This miniature is hosted with the site and uses original drawing and interaction code. The miniature-site idea comes from dimden’s WebTiles example, which is explicitly credited beside the widget and in the site credits.',
      ],
      sources: [s.webtiles, s.repository],
    },
  ],
}
