# Lichen Huang personal website

A personal home for chemistry, mathematics, computer science, and things I make.
Built with React, TypeScript, Vite, and React Router. The first layout uses an
original pixel landscape and a quiet nighttime palette; detailed content is
still being collected.

## Develop locally

Use Node.js 26.x and npm. With nvm, run `nvm use` (or `nvm install` if needed).

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, normally http://localhost:5173. Stop with Ctrl+C.

```sh
npm run build   # Strict TypeScript checks and production output in dist/
npm run preview # Local preview of an existing production build
npm run lint    # Optional linting
```

## Where to work

- [Architecture and route map](docs/ARCHITECTURE.md)
- [Content authoring guide](docs/CONTENT_GUIDE.md)
- [Content plan](WEBSITE_CONTENT_PLAN.md)
- [Attribution and reuse record](ATTRIBUTIONS.md)
- [Seasonal art assets and refinement guide](docs/ART_ASSETS.md)
- [Current pixel-art direction](docs/ART_DIRECTION.md)
- [Dependency licenses](third-party-licenses/README.md)

Page layouts live in `src/pages/`, reusable components in `src/components/`,
content in `src/content/`, styles in `src/styles/`, and public media in `public/`.
Draft worksheets reserve future topics without publishing invented content.

The footer links to `/credits`. No source, artwork, sound, or assets from the
reference personal websites have been copied. Their influence is acknowledged.
Dependencies retain their license notices, also available on the public site.

## Deployment later

The origin is https://github.com/HydroChlorine/Personal-Website.git. This work
has not been committed, pushed, or deployed. When ready, review and commit the
source, push to GitHub, then import the repository into Vercel using the Vite
preset, `npm run build`, and output directory `dist`. Use Node.js 26.x.

`vercel.json` provides application-route fallback for direct links and refreshes.
If hosting elsewhere, configure equivalent SPA fallback. After verifying the
hosted site, connect a purchased domain using the DNS records provided by the
host. No Vercel CLI or global React installation is required.

The site currently needs no secrets or backend. Weather is decorative, not live
location data. Future values prefixed `VITE_` are exposed to visitors; local
`.env` files and Vercel account state are ignored by Git.

Run `npm run format` to format source files and `npm run licenses` after dependency changes to refresh copied legal notices. Review the license changes before publishing.
