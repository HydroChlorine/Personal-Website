# Credits and attribution record

## Rules for future additions

Before incorporating third-party code, artwork, fonts, audio, or a template, identify its author, exact source, license/version, whether modification and redistribution are allowed, and required notices. Keep license copies, record modifications, and update the public Credits page. Credit alone is not permission. If permission is unclear, do not incorporate it. Do not apply a blanket project license to third-party material.

## Inspiration only

| Reference | Source | Use in this project | Permission status |
| --- | --- | --- | --- |
| dimden's hotel | https://dimden.dev/ | General inspiration: a personal online home, pixel-art atmosphere, ambient weather | Footer states All Rights Reserved. No permission to reuse assumed. No source, artwork, sound, text, or other assets incorporated. |
| Michael Xing | https://michaelxing.com/ and https://michaelxing.com/about/ | General inspiration: a personal project collection and growing archive | Homepage states AGPLv3 for publicly accessible author-written code and CC BY-SA 4.0 for other authored content, subject to its terms. No code/content incorporated, so no derivative template used. |

References reviewed November 6, 2026. These observations are not a license grant or a conclusion that every asset on either site shares one license. Verify the exact source and terms again before any future reuse.

Public inspiration acknowledgments live in `src/content/credits.ts` and appear at `/credits`, linked from every page footer.

## Original project material

- `public/art/night-workshop.svg`: original vector pixel illustration created for this site during development with Codex. No downloaded/reference-site artwork, tracing, sprites, or textures used.
- `public/favicon.svg` and `src/components/ui/PixelIcon.tsx`: original grid drawings created for this site.
- Layout, styles, decorative weather behavior, and interface components were authored for this project; no third-party website template used.
- Typography uses visitor system fonts; no external font files are redistributed.
- Biographical content comes from the user's supplied references and direction. Research figures, photos, papers, and course artifacts have not been imported.

## Software dependencies

Direct dependencies were checked against their installed package metadata and shipped license files:

| Dependency | Version when introduced | License | Source |
| --- | --- | --- | --- |
| React and React DOM | 19.3.1 | MIT | https://github.com/facebook/react |
| React Router | 8.5.1 | MIT | https://github.com/remix-run/react-router |
| Vite | 8.3.5 | MIT, with additional bundled notices | https://github.com/vitejs/vite |
| TypeScript | 7.0.2 | Apache-2.0 | https://github.com/microsoft/TypeScript |
| Vite React plugin | 6.1.2 | MIT | https://github.com/vitejs/vite-plugin-react |
| Oxlint | 1.89.0 | MIT | https://github.com/oxc-project/oxc |

MIT permits reuse and modification with preservation of copyright/license notices. Apache-2.0 permits reuse and modification under its license conditions, including preserving applicable notices. Dependency source code has not been modified. Full shipped text, not this summary, controls the terms.

`third-party-licenses/README.md` records all installed direct and transitive packages, including build tools, and links their copied notices. `public/licenses/THIRD_PARTY_NOTICES.txt` publishes those notices from `/licenses/THIRD_PARTY_NOTICES.txt`. Run `npm run licenses` to update both inventories when dependency versions change. Prettier is an MIT-licensed development-only formatter; its installed license is included in the inventory. Lockfile versions are authoritative.

## Future asset register

For each new item, record: title/path, author, original URL, license and license URL, date checked, permission basis, changes, retained notice path, and public credit location. Add original research/photography authors and collaborators when those assets are selected.
