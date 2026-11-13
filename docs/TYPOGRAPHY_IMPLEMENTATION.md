# Pixel / Sharp text

Implemented 12–13 November 2026. Pixelify Sans is the default, using the user's chosen left-hand specimen. DotGothic16, Departure Mono and VT323 remain planning alternatives, not production fonts.

## Controls and scope

- **Site text · Pixel / Sharp**, in the header: changes the site-wide default, clears active panel overrides and saves `site-text-style` in local storage. Invalid/missing storage defaults to Pixel. If storage is unavailable, the preference still works for the current visit. Other open same-origin views, including the miniature, receive storage updates.
- **Text · Pixel / Sharp**, at the start of a body panel or article: changes just that panel for its mounted lifetime. It does not write the site preference. Figures retain their independent illustration-style switches. The same compact two-button presentation is used for predictable comparisons.
- Main articles have one text switch above their opening, rather than a repeated switch at every subsection. Shared `Panel` content gets the same control; Home's custom welcome panel has a matching control. Linked preview cards inherit the site preference, with no nested buttons inside the link. Tiny sidebar widgets retain sharp labels and readouts. The miniature hides the extra controls while following the site default.

The header switch sits on a second, right-aligned row on phones; the panel switch sits in the upper right above its text. Both use native buttons and `aria-pressed`. Neither changes routes or resets figures/weather. Sharp restores the established system sans/mono stacks within the selected scope; Pixel uses Pixelify Sans. Pixel prose is enlarged in body panels to keep the reading texture comfortable. Code, equations, data tables, tiny labels, numbers and controls retain sharp faces.

## Hand-picked accents

`PersonalText` only decorates an explicitly named whole word in a chosen passage. It never walks or transforms the document. Current selections:

- Home introduction: the initial `l` in `learn`.
- About: the initial `l` in the first paragraph's `love`, and the first personal-favorites sentence's `love`.
- Hello, world notebook entry: the first `l` in `Hello`, a single opt-in doubled-letter experiment.

Each accent is a stable 8-degree synthetic oblique using a span, preserving the exact source string, selection, spacing, color and baseline. It is not an italic font cut and not semantic emphasis. No animation or glow is added. Technical article prose, figure labels, formulas, code, units and navigation receive no automatic decoration. Existing authored wording is preserved; absent selected words simply render unchanged. No global ll/ff or emotion-word substitution is enabled.

## Sources

- `src/components/typography/Typography.tsx`: preference provider, controls, personal-text rendering.
- `typographyContext.ts`: shared preference context and scoped panel hook.
- `textStyleState.ts`: safe preference parsing and whole-word accent selection.
- `src/styles/typography.css`: font, sizing, controls and scientific/readout exceptions.
- `src/components/ui/Panel.tsx`, `ProjectArticle.tsx`, Home and SiteHeader: control placement.
- `public/fonts/PixelifySans.ttf`, `public/licenses/PIXELIFY_SANS_OFL.txt`: original font and full OFL notice. The font is about 77 KiB and loads locally with `font-display: swap`; there is no third-party font request or system installation.

The original design study remains in `docs/design/typography/` as historical planning material.

## Verification

Production build and all 46 tests pass. Browser checks verified default Pixelify rendering, an independent Sharp override, a saved site-wide Sharp choice after reload, route changes, global preference resetting overrides, keyboard activation, and unchanged crisp-GIF selection after switching text. Equations retain the established sharp monospace face and technical articles have zero decorative-letter spans. Desktop and 390px phone views are readable with no horizontal overflow. Home/About/notebook accents preserve their exact source text. While checking About, an existing nested-paragraph issue in rich EmptyShelf content was corrected without rewriting the author’s text; empty shelf titles no longer emit empty headings. Lint retains only existing unrelated warnings. Preview tabs and the owned server were closed after review.

Screenshots: `assets/widget-review/pixel-text-home-desktop.png`, `pixel-text-home-phone.png`, `pixel-text-article-desktop.png`, and `pixel-text-article-phone.png`.
