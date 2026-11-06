import type { Subject } from '../types'
export const mathematics: Subject = {
  id: 'mathematics',
  name: 'Mathematics',
  number: '02',
  tagline: 'Patterns worth following. Problems worth getting lost in.',
  introduction:
    'Numerical methods, differential equations, dynamics, and algebra are some of the areas I’ve been studying. This corner will hold explanations, computations, and the ideas I want to spend more time with.',
  interests: [
    'Numerical analysis',
    'Differential equations',
    'Dynamics',
    'Algebra',
  ],
  shelves: [
    {
      title: 'Numerical experiments',
      description:
        'Computations, comparisons, and pictures of what a method actually does.',
    },
    {
      title: 'Problems & proofs',
      description:
        'A place for interesting problems and the reasoning behind them.',
    },
    {
      title: 'Reading notes',
      description:
        'Ideas from courses and independent reading, revisited in my own words.',
    },
  ],
}
