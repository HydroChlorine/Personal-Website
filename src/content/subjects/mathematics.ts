import type { Subject } from '../types'
export const mathematics: Subject = {
  id: 'mathematics',
  name: 'Mathematics',
  number: '02',
  tagline: 'Patterns worth following. Problems worth getting lost in.',
  introduction:
    'I like being able to draw an idea, try it in a computation, and then ask why it works. Numerical analysis, computational algebra, and dynamics keep giving me reasons to do all three. This is where I’m collecting those connections, including the ones that lead back to chemistry.',
  interests: [
    'Numerical analysis',
    'Differential equations',
    'Dynamics',
    'Computational algebra',
    'Fourier analysis',
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
