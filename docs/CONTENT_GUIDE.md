# Adding content

## Profile and subjects

Edit `src/content/profile.ts` for the personal introduction, contact, timeline, and favorites. Edit individual files in `src/content/subjects/` for each subject's introduction and shelves. Current text is intentionally brief.

## Projects

Create a TypeScript file in `src/content/projects/` using the `Project` type and export its record from that folder's `index.ts`. Required fields: slug, title, subjects, kind, summary, body, readiness, and links. Optional `media` provides an image URL, alt text, and caption. `readiness: 'outline'` labels the page's writing status, not whether the underlying research is unfinished. Use `published` only when the account is ready. Match slugs to stable URLs.

A project appears in the shared collection and every relevant subject. Keep one account of collaborative work, clearly state your contribution, and credit its collaborators. Do not publish class solutions or employer/research material unless appropriate to share.

## Notebook

Add `Note` entries to `src/content/notes/index.ts` (split into files when useful). Supply slug, title, ISO date, subjects, summary, and paragraphs. Index and detail pages already exist. No fake entries have been seeded.

## Other collections

`src/content/playground/index.ts` lists actual demo links. `src/content/gallery/index.ts` lists images with alt text and captions. `src/content/links/index.ts` lists personally selected links with commentary. Empty collections are intentional.

## Media and public files

Use `public/media/projects/`, `chemistry/`, `mathematics/`, or `personal/` and reference files with URLs such as `/media/projects/example.webp`. Everything under `public/` is publicly served: do not put application drafts or private files there. Put the approved public CV in `public/documents/` and set `profile.cvUrl` to its URL; no nonworking download link is displayed before it exists.

Original site art belongs in `public/art/`. For third-party content, first check permission and update `ATTRIBUTIONS.md`, retain required notices, and add the public credit to `src/content/credits.ts` or the relevant caption/page. Current third-party notice copies are in `third-party-licenses/` and `public/licenses/`.

## Before publishing a revision

Check content and links in the browser, check the small-screen layout, and run `npm run build`. Linting is available separately with `npm run lint`. Confirm dates, publication status, and individual contributions when adding research content. The content plan remains the source of ideas; unfilled worksheets under `src/content/drafts/` are not automatically published.

Run `npm run format` to format source files and `npm run licenses` after dependency changes to refresh copied legal notices. Review the license changes before publishing.
