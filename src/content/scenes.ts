export const SCENE_INTERVAL_MS = 10_000
export const scenes = [
  {
    id: 'spring-night',
    label: 'Spring moonlight',
    weather: 'clear',
    description:
      'Chunky green tree silhouettes and moonlight on Baker Laboratory’s stone columns and the glass Physical Sciences Building.',
  },
  {
    id: 'summer-dawn',
    label: 'Before sunrise',
    weather: 'clear',
    description:
      'Dark summer foliage and the last stars before sunrise around Baker Laboratory and the Physical Sciences Building.',
  },
  {
    id: 'autumn-wind',
    label: 'Autumn moonlight',
    weather: 'wind',
    description:
      'Muted copper leaves blowing in the moonlight around Baker Laboratory and the Physical Sciences Building.',
  },
  {
    id: 'summer-rain',
    label: 'Summer night rain',
    weather: 'rain',
    description:
      'Dark green trees, glowing windows, and summer night rain at Baker Laboratory and the Physical Sciences Building.',
  },
  {
    id: 'autumn-rain',
    label: 'Autumn night rain',
    weather: 'rain',
    description:
      'Dark amber tree silhouettes, glowing windows, and night rain at Baker Laboratory and the Physical Sciences Building.',
  },
  {
    id: 'winter-snow',
    label: 'Winter moonlight',
    weather: 'snow',
    description:
      'Bare pixel branches, dark blue snow, and moonlit snowfall at Baker Laboratory and the Physical Sciences Building.',
  },
].map((scene) => ({
  ...scene,
  gif: `/art/baker-psb/v2/${scene.id}.gif`,
  still: `/art/baker-psb/v2/${scene.id}.png`,
}))
export type CampusScene = (typeof scenes)[number]
export type SceneSelection = 'shuffle' | string

// Select a different scene every time, including when Math.random is near 1.
export function randomSceneIndex(
  current: number,
  count = scenes.length,
  random = Math.random,
): number {
  if (count < 2) return 0
  const offset = 1 + Math.min(count - 2, Math.floor(random() * (count - 1)))
  return (current + offset) % count
}
