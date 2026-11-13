# First release review — 13 November 2026

This review covers the current local React site. No deployment, domain purchase, push or hosting-account changes were performed.

## Completed in this round

- A tilted yellow neon **Publication** annotation and original sparkling star now appear on the ring-closing paper’s shared project cards (Home, Projects, Chemistry), related-story previews and the article panel. One project metadata field controls all placements. The accessible label and tooltip retain “Research manuscript · preparing for journal submission”; the annotation is a category, not an acceptance claim.
- The shimmer respects Pause animation and the reduced-motion preference. The annotation stays in document flow, including on phones, so it does not cover content or typography controls.
- Chemistry no longer renders the empty **Molecules in pictures** or **Papers & presentations** shelves. Their planning metadata is retained for later use.

## Main cleanup before the first public version

These are visible copy/presentation issues, rather than missing applications or articles. They were identified for the next editing pass; this review does not rewrite the owner's personal voice.

| Where | What visitors currently see | Suggested next change |
| --- | --- | --- |
| Home — bottom | “Still unpacking. There are a few empty shelves…” | Remove this postscript. It describes an earlier stage of the site. |
| Home — playground card | “Graphics, interactive experiments, and small creations will find a home here.” | Use present-tense copy inviting visitors to the two existing demos. |
| Projects — introduction | “A growing collection, with a few outlines to start.” | Introduce the existing research and software stories directly. |
| Projects — final panel | “Room for the next thing” and promises that graphics/mathematical projects “will join” | Remove the filler panel or replace it with a short, intentional invitation. Those collections already exist. |
| About | “sumshine,” several rough sentences, past-tense undergraduate wording beside an expected May 2027 graduation, an empty paragraph in `profile.about` | Proofread the short biography and personal bullets; confirm tense/dates. The bullets are real content, not an empty shelf, even though the fallback styling is named `EmptyShelf`. |
| Sidebar / footer | “Site in the making,” “Building a home…,” “a work in progress” | Optional consistency pass: use a current personal update or a quieter signature if the first release should feel complete. These do not block any functionality. |
| Chemistry project reference drawers | The shared renderer labels external paper references “In the code” | Use an appropriate “References” label for chemistry project articles. This is a small shared-component copy issue. |

Primary source files: `src/pages/HomePage.tsx`, `src/pages/ProjectsPage.tsx`, `src/pages/AboutPage.tsx`, `src/content/profile.ts`, `src/components/layout/Sidebar.tsx`, `src/components/layout/SiteFooter.tsx`, `src/components/articles/ProjectArticle.tsx`.

## Intentional works in progress — fine to keep

- **Short project discussion paper**: clearly marked work in progress, expected mid December 2026, with a real description. It does not show the generic “A closer look, soon” panel.
- **Four-dimensional Godot game**: has an illustrated project story and explicitly describes the prototype's ongoing status. The playground says no browser build or package is available there. Shipping a Godot build is not required for this first release.
- The notebook has a real **Hello, world!** entry. It does not need a large archive to launch.
- The older `PersonalPage.tsx` contains unused placeholder shelves, but `/personal` redirects to `/about`, and the personal corner is absent from navigation. Those unused components are not visitor-facing unfinished pages.
- Generic empty-state components remain in source for empty collections and unknown entries. All current project records have an article or explicit WIP content; none reaches the generic project placeholder.

## Launch checks still to do

1. **Public contact details:** review the current public CV at `/documents/lichen-huang-cv.pdf` and email in `src/content/profile.ts`. The PDF is present and the link opens a new tab. Replace the PDF if the newer version is ready.
2. **4D releases link:** verify that `https://github.com/HydroChlorine/4Dto3D/releases` is public and useful, or hide that button until a release exists. The local link is present, but this audit could not independently verify the remote release page. No broken-release claim is made.
3. **Production preview:** test the actual host's output, particularly direct navigation/refresh on a project, math topic, chemistry snippet and each playground demo; the CV, fonts and licenses should still load. Local dev-route success does not establish production-host behavior. The repository already has a Vite build and SPA rewrite configuration.
4. **Phone performance:** measure a real hosted visit with the sky/weather and miniature enabled. `public/` occupies roughly 138 MB on disk, including many paired crisp/pixel animations (about 119 MB in media). This is the whole collection, **not** the initial page download; article images are lazy-loaded and crisp versions are selected by the reader. Optimizing heavy GIFs can be a later pass if the first load is comfortable.
5. **Domain-dependent polish:** after choosing the public URL, add canonical/social sharing metadata and consider a sitemap. The site currently has a generic description, favicon and route-specific client-side titles, but no canonical URLs, Open Graph preview or sitemap. These improve sharing/discovery and need not hold up an initial preview release.

## Verification and scope

- Browser review: all **45 catalogued paths**, including the navigation pages, eight projects, six math topics, one CS topic, fifteen chemistry snippets, the notebook entry, two demos, `/personal` redirect and `/miniature`.
- Fully loaded detail views were checked after their expected heading appeared; transient lazy-loading messages are not counted as unfinished content.
- Both playground demos render their actual interfaces. This was a readiness skim, not a new exhaustive gameplay/performance test.
- **1,076 unique content-referenced local asset paths** checked: no missing files. No unresolved internal content links were found in that catalog.
- Publication annotations verified on a chemistry project card, article panel and related-story link. At a **390 px** viewport, document width remains **390 px**, with no horizontal overflow. No browser console errors were captured during this review.
- Empty chemistry section headings are absent from the rendered page.
- **49 tests pass**, production build passes, lint completes with the existing unrelated warnings.
- Review captures: `assets/launch-review/publication-card.png`, `publication-article.png`, `publication-phone.png`.

The core first-release content is present. The remaining editorial work is chiefly removing stale scaffolding language and polishing About, followed by the normal hosted-preview checks above.
