# Website structure

The site remains a local React + TypeScript + Vite application. React Router supplies individual URLs and browser history. There is no backend, CMS, external weather service, analytics, or third-party website template.

## File map

```text
src/
  App.tsx                    Routes and navigation title/focus handling
  main.tsx                   React root
  config/site.ts             Main navigation
  components/
    SiteLayout.tsx           Shared shell and animation preference
    layout/                  Header, sidebar/navigation, footer
    scene/                   Original illustration and decorative weather
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
    scene.css                Illustration and weather
    layout.css               Shell, navigation, responsive rules
    components.css           Reusable components and page layouts
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

The two initial research entries are explicitly content outlines. No coursework project, mathematical demo, publication, personal favorite, or metric has been invented. Empty collections render designed placeholders; add actual entries before showcasing that work.

## Visual direction

Coarse dark anime-influenced Baker Laboratory/PSB GIFs on a 384 × 128 logical grid, a shared 32-color palette, a compact banner, and overlaid headline. The original night workshop SVG remains archived. System monospace headings provide a temporary pixel-adjacent tone without redistributing a font. Art and palette are replaceable independently of the content.

The scene catalog and rotation hook choose a new random seasonal GIF every 10 seconds, excluding the current scene. Manual scene selection holds a season. Pausing substitutes a PNG still and stops rotation; reduced-motion settings are respected and monitored. No live weather or location is accessed. See `ART_ASSETS.md` for sources, prompts, animation, and asset directories.

## Current boundaries

No deployment or Git push has been performed. No CMS or Markdown rendering has been added; typed content files are the current editing interface. Draft Markdown files are authoring worksheets and do not render automatically. Interactive demos, publication downloads, photos, and a public CV remain to be supplied. The initial client-rendered site is not prerendered for search engines; revisit static generation if publishing becomes a major focus.
