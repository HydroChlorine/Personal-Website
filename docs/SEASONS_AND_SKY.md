# Seasons, atmosphere, and the little sky

## Seasonal sequence

The initial scene uses `new Date().getMonth()` in the visitor's own timezone. There is no geolocation, network lookup, hemisphere inference, or live weather service.

| Local months | Initial season |
| --- | --- |
| November–March | Winter |
| April–June | Spring |
| July–August | Summer, randomized first variant |
| September–October | Autumn, randomized first variant |

Each summer/autumn visit to that season chooses its first variant at random, then shows the other exactly once. After finishing a season, advance spring → summer → autumn → winter → spring. Winter and spring each have one scene. The ordering is renewed on every season entry, rather than shuffling a permanently fixed list.

The interval is **30 seconds** of uninterrupted visible playback. A manual advance starts a fresh 30-second interval. Pausing stops the timer and substitutes a real PNG still. A hidden tab does not advance, and returning starts a fresh interval. The local month chooses the initial state; the visit then follows the cycle independently of the calendar clock.

The pure rules live in `src/content/scenes.ts`; timing/visibility behavior lives in `src/hooks/useCampusScene.ts`. `npm test` covers all months, both orders of each two-scene season, a full cycle, immutable transitions, the 30-second constant, and a UTC boundary viewed in two different visitor timezones. CI runs these tests before the build.

## Discreet manual interaction

Implemented: click or tap the banner to follow the next scene in the same natural order. There is no persistent Next button, scene selector, or on-page interval announcement. The cursor and a faint star on hover/focus offer a small clue. The surface remains a real button for keyboard and assistive-technology access: Enter/Space advances it. Manual advancement also works while paused, showing the next still.

Alternatives considered for later refinement:

- Restrict the hotspot to the building entrance or the moon: more playful, but less discoverable and a smaller touch target.
- Make the season caption subtly interactive: clear contextual meaning, but less of a hidden discovery.
- Drag/swipe through the window: tactile, but risks competing with page scrolling and selecting text on phones.

The broad clickable window is the initial choice because it follows the visitor's expectation that an interesting illustrated scene may respond, without adding another visible control.

## Night palettes

The two live palettes are **Moonrise** (ink blue, steel-blue highlights, lantern amber) and **Ion** (midnight navy, neon cyan, muted warm rose). The direction is distant neon on a dark Hong Kong/Tokyo street: restrained colored light against deep blue surfaces. Afterglow has been retired; old saved Afterglow preferences fall back to Moonrise. No reference-site artwork or colors were copied.

Open **Atmosphere** in the sidebar (below navigation on a phone) to compare them. Tokens cover the shell, controls, sky and effects; the approved v2 GIF bytes remain unchanged. Tokens live in `src/styles/tokens.css`; metadata and preferences live in `src/content/appearance.ts` and `src/hooks/useAppearance.ts`.

## Local calendar weather

**Auto** is the default. It uses the visitor's local month, independently of the cycling campus GIF:

| Local months | Global overlay |
| --- | --- |
| November–March | Snow |
| June–July | Rain |
| April–May, August–October | 50% clear / 50% rain |

The random choice is made once per page load and remains stable during the visit. Off, Rain, and Snow are explicit persistent overrides; Auto restores the calendar choice. The new preference key is `site-weather-mode-v2`. The old overlay preference is ignored so the previous default Off does not suppress the new automatic behavior. No location permission, network lookup, or live weather is used. Rain already baked into a campus GIF is unaffected by the global overlay setting.

## Layered weather and shared wind

Four Canvas layers run far → near, with population weights **46 / 29 / 17 / 8%**. Distant particles are smaller, slower and dimmer; near particles are larger, faster, brighter and less numerous. Each particle also varies in speed, size, opacity, streak length and flutter phase. Rain has stepped pixel streaks; some foreground snowflakes have chunky crosses.

`src/lib/skyPhysics.ts` defines a continuous wind field from slow gusts and smoothly interpolated spatial noise. Weather, rocket flights and burst particles sample that same field. Wind is always enabled, with deliberately weaker influence on fireworks. It has no separate user control.

## Background sky and fireworks

`SkyEnvironment.tsx` retains the original faint pixel crescent, sparse stars, constellations and colored haze. Click exposed sky to launch from a Gaussian distribution centered at the bottom of the **viewport**, with standard deviation 5.5% of its width and bounds at 32–68%. Launches remain visible while browsing a long page. Content clicks do not launch fireworks; the footer star provides keyboard access.

Initial horizontal and vertical velocities are solved for each target and flight duration. Constant downward gravity gives the requested parabolic trajectory (vertical position is quadratic in time). A very small wind displacement is tapered to zero at both endpoints so detonation still lands at the clicked point. The trail follows the arc. Burst particles receive weak shared-wind acceleration, gravity and damping.

The renderer is independent original project code, inspired by Lichen's particle-simulation interests. It imports no course framework or effect library. A 3px logical grid preserves pixel scale; precipitation is bounded at 64–160 particles, rockets at six and sparks at 400. Animation frames stop when weather is off and the last spark has faded.

## Finite material response

Weather builds through **twenty discrete levels, every 15 seconds**, reaching its fixed maximum after **five minutes of active visible exposure**. This timing is unchanged in the finer-surface revision.

The surface art is generated by `scripts/draw-weather-surfaces.py` into `public/art/weather/` (21 original SVG textures). Three deterministic seeds provide coherent, gently changing snow-cap heights, translucent frost with connected dendrites, and long irregular rain tracks with sparse beads. Frost develops inward from all four edges, reaching up to 36px at maximum while fading toward the reading area. Texture coordinates retain a 2048px vertical scale, avoiding short repeated edge marks or stretching a tiny motif over a long article. Narrow viewports compress the cap profile while keeping its top connected; SVGs explicitly allow independent horizontal/vertical scaling so earlier accumulation levels do not letterbox.

The top snow blanket has a continuous underside and small height variations rather than disconnected rectangular chunks. Its shades follow local depth beneath the upper surface. Ground snow (now up to 26px) is **level across the entire document**, with fixed vertical color stops: equal depths have equal shades, regardless of horizontal position or total accumulation. There are no stepped ground silhouettes, alternating blocks, or repeated wave stripes. Rain on glass uses fine connected runoff, scattered beads, restrained edge highlights and two diagonal reflections. There is no water layer at the document bottom. These are artistic material cues, not a thermal or fluid simulation. Decorations ignore pointer events and preserve the banner's contrast layer.

Changing actual weather clears the response immediately. Changing palettes, campus scenes or routes does not restart it. Pause freezes accumulation; hidden tabs do not add exposure time. Rules live in `src/hooks/useWeatherExposure.ts` and `src/styles/weather-surfaces.css`; timing constants live beside the physics helpers.

Previews: [settled snow](previews/2026-11-07/weather-snow.jpg), [rain and developing reflections](previews/2026-11-07/weather-rain.jpg). Earlier palette screenshots are historical studies, including the retired Afterglow experiment.

## Motion and verification

Pause animation stops GIF playback, seasonal progression, global particles, decorative twinkling, fireworks and exposure growth. The reduced-motion preference is honored and monitored. Banner clicks while paused change only the still; the footer spark is disabled. Hidden tabs stop rendering. No sound is used.

`npm test` covers the seasonal rules plus all calendar weather months, timezone boundaries, both probabilistic outcomes, layer ordering/density/variation, bounded recycling, Gaussian launch distribution, curved flight endpoints under wind, wind continuity/bounds, and the exposure delay/cap. Browser checks cover the actual layered canvas, settled snow, weather reset and wet-frame rendering. `npm run build` verifies the production bundle.

Fine-surface review (2026-11-12): production build and 44 tests pass; all 21 SVGs parse successfully. Production CSS was reviewed at 5, 10 and 20 exposure levels on desktop and at 390px width. Maximum frost leaves the text readable and a decorated link remains clickable. The temporary comparison page was removed. Review images: `assets/widget-review/fine-weather-surfaces.png` and `fine-frost-phone.png`; these show staged exposure levels, not an elapsed-time recording.

Snow-depth adjustment: maximum top-cap height is now 12px (previously 24px), with a proportionally halved upward offset; maximum ground depth is 26px (previously 52px). All twenty 15-second levels and the five-minute cap remain. Frost strength/reach and rain side textures are unchanged. The ground water layer is removed; the two rain-glass diagonal reflections are restored.
