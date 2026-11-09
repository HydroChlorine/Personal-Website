export const CHEMISTRY_SCENE_INTERVAL_MS = 30_000
export const chemistryScenes = [
  {
    id: 'reflux',
    label: 'Under reflux',
    title: ['A little heat,', 'a lot of patience.'],
    subtitle: 'An oil bath, a reflux condenser, and a quiet stir.',
    description:
      'Pixel-art round-bottom flask in a warm oil bath, with a reflux condenser and an inert-gas balloon above it.',
  },
  {
    id: 'cold-reaction',
    label: 'In the cold bath',
    title: ['Slowing things', 'down.'],
    subtitle: 'A cold reaction flask, tucked into a frosty Dewar.',
    description:
      'Pixel-art reaction flask held in a silver Dewar cold bath, with frost and low drifting cold vapor.',
  },
  {
    id: 'screening',
    label: 'Reaction screening',
    title: ['One question.', 'Many conditions.'],
    subtitle: 'Small vials. Different conditions. A chance to learn.',
    description:
      'Slim black-capped dram vials with colored solutions and turning stir bars sit in metal reaction blocks on a circular adapter over a magnetic stir plate.',
  },
  {
    id: 'workup-column',
    label: 'Workup → chromatography',
    title: ['From mixture', 'to molecule.'],
    subtitle: 'Separate the layers. Follow the bands. Collect a fraction.',
    description:
      'A longer pixel-art sequence of liquid layers draining from a separatory funnel, then colored bands moving down a chromatography column into collection vials.',
  },
  {
    id: 'hplc-ms',
    label: 'HPLC–MS analysis',
    title: ['Separate.', 'Then identify.'],
    subtitle: 'A tiny injection opens another window into the mixture.',
    description:
      'A pixel microsyringe approaches an HPLC injector; a chromatogram traces across a screen beside a mass spectrometer.',
  },
  {
    id: 'nmr',
    label: 'NMR spectroscopy',
    title: ['A signal from', 'structure.'],
    subtitle: 'A slender sample tube enters the magnet.',
    description:
      'A pixel-art NMR sample tube lowers into the top bore of a cylindrical NMR magnet, with a signal glowing at the console.',
  },
].map((scene) => ({
  ...scene,
  gif: `/art/chemistry/v1/${scene.id}.gif`,
  still: `/art/chemistry/v1/${scene.id}.png`,
}))
export type ChemistryScene = (typeof chemistryScenes)[number]

export function isChemistryContext(
  pathname: string,
  search: string,
  projectSlugs: readonly string[],
  noteSlugs: readonly string[] = [],
): boolean {
  const segments = pathname.split('/').filter(Boolean)
  if (segments[0] === 'chemistry') return true
  if (segments[0] === 'projects') {
    if (segments.length === 1)
      return new URLSearchParams(search).get('subject') === 'chemistry'
    return segments.length === 2 && projectSlugs.includes(segments[1]!)
  }
  return (
    segments[0] === 'notebook' &&
    segments.length === 2 &&
    noteSlugs.includes(segments[1]!)
  )
}
