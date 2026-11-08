export const SCENE_INTERVAL_MS = 30_000
export const scenes = (
  [
    {
      id: 'spring-night',
      label: 'Spring moonlight',
      season: 'spring',
      weather: 'clear',
      description:
        'Chunky green tree silhouettes and moonlight on Baker Laboratory’s stone columns and the glass Physical Sciences Building.',
    },
    {
      id: 'summer-dawn',
      label: 'Before sunrise',
      season: 'summer',
      weather: 'clear',
      description:
        'Dark summer foliage and the last stars before sunrise around Baker Laboratory and the Physical Sciences Building.',
    },
    {
      id: 'autumn-wind',
      label: 'Autumn moonlight',
      season: 'autumn',
      weather: 'wind',
      description:
        'Muted copper leaves blowing in the moonlight around Baker Laboratory and the Physical Sciences Building.',
    },
    {
      id: 'summer-rain',
      label: 'Summer night rain',
      season: 'summer',
      weather: 'rain',
      description:
        'Dark green trees, glowing windows, and summer night rain at Baker Laboratory and the Physical Sciences Building.',
    },
    {
      id: 'autumn-rain',
      label: 'Autumn night rain',
      season: 'autumn',
      weather: 'rain',
      description:
        'Dark amber tree silhouettes, glowing windows, and night rain at Baker Laboratory and the Physical Sciences Building.',
    },
    {
      id: 'winter-snow',
      label: 'Winter moonlight',
      season: 'winter',
      weather: 'snow',
      description:
        'Bare pixel branches, dark blue snow, and moonlit snowfall at Baker Laboratory and the Physical Sciences Building.',
    },
  ] as const
).map((scene) => ({
  ...scene,
  gif: `/art/baker-psb/v2/${scene.id}.gif`,
  still: `/art/baker-psb/v2/${scene.id}.png`,
}))
export type CampusScene = (typeof scenes)[number]
export type Season = 'spring' | 'summer' | 'autumn' | 'winter'
export const seasonOrder: readonly Season[] = [
  'spring',
  'summer',
  'autumn',
  'winter',
]
export interface SeasonState {
  season: Season
  scene: CampusScene
  remaining: CampusScene[]
}

// Calendar months come from Date.getMonth() in the visitor's own timezone.
export function seasonForMonth(month: number): Season {
  if (!Number.isInteger(month) || month < 0 || month > 11)
    throw new RangeError('Expected a zero-based calendar month')
  if (month <= 2 || month >= 10) return 'winter'
  if (month <= 5) return 'spring'
  if (month <= 7) return 'summer'
  return 'autumn'
}

function enterSeason(season: Season, random: () => number): SeasonState {
  const options = scenes.filter((scene) => scene.season === season)
  if (options.length === 2 && random() >= 0.5) options.reverse()
  return { season, scene: options[0]!, remaining: options.slice(1) }
}

export function initialSeasonState(
  date = new Date(),
  random = Math.random,
): SeasonState {
  return enterSeason(seasonForMonth(date.getMonth()), random)
}

export function nextSeasonState(
  state: SeasonState,
  random = Math.random,
): SeasonState {
  if (state.remaining.length)
    return {
      ...state,
      scene: state.remaining[0]!,
      remaining: state.remaining.slice(1),
    }
  const next =
    seasonOrder[(seasonOrder.indexOf(state.season) + 1) % seasonOrder.length]!
  return enterSeason(next, random)
}
