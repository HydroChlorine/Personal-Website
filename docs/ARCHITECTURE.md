# Website structure

The site remains a local React + TypeScript + Vite application. React Router supplies individual URLs and browser history. There is no backend, CMS, external weather service, analytics, or third-party website template.

## File map

```text
src/
  App.tsx                    Routes and navigation title/focus handling
  main.tsx                   React root
  config/site.ts             Main navigation
  hooks/                     Season sequence, appearance preferences, finite weather exposure
  lib/skyPhysics.ts          Shared wind, layered precipitation, ballistic flights
  components/
    SiteLayout.tsx           Shared shell and animation preference
    layout/                  Header, sidebar/navigation, footer
    scene/                   Campus/laboratory windows and discreet manual advance
    articles/                Structured project stories and figure comparison
    sky/                     Original sky, pixel fireworks, and appearance controls
    ui/                      Panels, icons, project cards, subject links
  pages/
    HomePage.tsx             Welcome and connections into the site
    AboutPage.tsx            Personal introduction and short timeline
    subjects/                Chemistry, Mathematics, Computer Science
    ProjectsPage.tsx         Shared collection and subject filtering
    ProjectDetailPage.tsx    Reusable project description
    NotebookPage.tsx         Dated writing collection
    NoteDetailPage.tsx       Reusable note page
    PlaygroundPage.tsx       Future real demo links
    PersonalPage.tsx         Interests, gallery, and collected links
    ContactPage.tsx          Email, GitHub, and optional CV
    CreditsPage.tsx          Public attribution and notices
    NotFoundPage.tsx         Unknown paths and missing records
  content/
    types.ts                 Content schemas
    scenes.ts                Scene catalog and pure seasonal transition rules
    appearance.ts            Two UI palettes and local-calendar weather rules
    chemistryScenes.ts       Six lab vignettes and chemistry route context
    profile.ts               Bio, contact, timeline, personal details
    subjects/                Introductions, interests, planned shelves
    projects/                One file per selected project plus index
    notes/                   Empty collection ready for real writing
    playground/              Empty collection ready for real demos
    gallery/                 Empty collection ready for media
    links/                   Empty collection ready for resources
    credits.ts               Inspiration acknowledgments
    drafts/                  Unpublished collection templates
  styles/
    tokens.css               Colors and typography
    scene.css                Illustrated window and hidden advance surface
    sky.css                  Faint background decoration and appearance controls
    weather-surfaces.css     Finite snow/frost and wet material response
    layout.css               Shell, navigation, responsive rules
    components.css           Reusable components and page layouts
    article.css              Long-form project stories and figures
  index.css                  Global rules and reduced-motion support
public/
  art/                       Original project illustration
  media/                     Future user-selected images and video
  documents/                 Future public CV and other public documents
  licenses/                  Full public dependency notices
third-party-licenses/         Dependency inventory and copied notices
ATTRIBUTIONS.md              Inspiration, reuse, and attribution record
WEBSITE_CONTENT_PLAN.md      Content direction and inventory
```

## URLs

`/`, `/about`, `/chemistry`, `/mathematics`, `/computer-science`, `/projects`, `/projects/:slug`, `/notebook`, `/notebook/:slug`, `/playground`, `/personal`, `/contact`, and `/credits`.

Browser history and direct URL loads use React Router. `vercel.json` rewrites application routes to `index.html` while leaving static asset directories alone. A different host must provide equivalent SPA fallback behavior. Unknown paths show an in-app 404; static hosting fallback can still return HTTP 200 for that app shell.

## Content and presentation

Content lives outside the page components. Shared project records can belong to several subjects, with a single detail page. Adding a project or note does not require a new page component. Per-subject page wrappers leave room for different subject layouts later.

Catalyst Discovery now has a source-linked retrospective article with original figures; the metathesis entry remains a content outline. No coursework project, mathematical demo, publication, personal favorite, or metric has been invented. Empty collections render designed placeholders; add actual entries before showcasing that work.

## Visual direction

Coarse dark anime-influenced Baker Laboratory/PSB GIFs on a 384 × 128 logical grid, a shared 32-color palette, a compact banner, and overlaid headline. The original night workshop SVG remains archived. System monospace headings provide a temporary pixel-adjacent tone without redistributing a font. Art and palette are replaceable independently of the content.

The scene catalog chooses the initial season from the visitor's local month, completes both summer/autumn variants, and follows the natural seasonal order every 30 seconds. The banner itself advances the cycle on click/tap or keyboard activation. Pausing substitutes a PNG still and stops progression. See `SEASONS_AND_SKY.md` for the rules, tests, palette choices, original pixel sky/fireworks, and automatic local-calendar global weather. No live weather or location is accessed. GIF artwork is unchanged by these palette experiments.

## Current boundaries

No deployment or Git push has been performed. No CMS or Markdown rendering has been added; typed content files are the current editing interface. Draft Markdown files are authoring worksheets and do not render automatically. Interactive demos, publication downloads, photos, and a public CV remain to be supplied. The initial client-rendered site is not prerendered for search engines; revisit static generation if publishing becomes a major focus.

Chemistry routes and chemistry-tagged project/note details use their own six-scene laboratory window. The campus cycle remains on other pages. See `CHEMISTRY.md` for route context, GIF recipes, pause behavior, and the Catalyst Discovery article.

Mathematics context, original numerical banner assets, responsive companions, and model checks are documented in [MATHEMATICS.md](MATHEMATICS.md). `sceneContext` resolves chemistry before mathematics for shared entries; `useSceneCycle` supplies the common subject-scene clock. Future project writing follows [CONTENT_STYLE.md](CONTENT_STYLE.md).

The three illustrated math articles use `/mathematics/topics/:slug`, `src/content/mathematics/`, and `MathematicsTopicPage`. The shared article renderer accepts optional topic labels, equations, detail paragraphs, and table captions while preserving chemistry defaults. See [MATH_TOPICS.md](MATH_TOPICS.md) for assets, numerical checks, and content scope.
