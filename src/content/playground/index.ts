import type { PlaygroundEntry } from '../types'
export const playground: PlaygroundEntry[] = [
  {
    title: 'Paint a firework',
    label: 'GRAPHICS / MAKE SOMETHING GLOW',
    description:
      'Paint a burst, mix colors and pulses, then send a frozen copy of your design into the sky. Change the wind, gravity, and trails, or just keep launching.',
    href: '/playground/fireworks',
    story: '/projects/paint-a-firework',
    subjects: ['computer-science'],
    image: '/media/playground/fireworks.png',
    imageAlt:
      'A split pink-and-blue firework from the playable browser simulator.',
  },
  {
    title: 'CritterWorld',
    label: 'ARTIFICIAL LIFE / PROGRAM A LITTLE CREATURE',
    description:
      'An independent browser edition of our team project. Watch programmable creatures forage, fight and reproduce—or write a behavior of your own and let it loose.',
    href: '/playground/critterworld',
    story: '/projects/critterworld',
    subjects: ['computer-science'],
    image: '/media/playground/critterworld.png',
    imageAlt:
      'The playable browser world, with colored critters, green food and rock hexes.',
  },
]
