import type { Subject } from '../types'
export const chemistry: Subject = {
  id: 'chemistry',
  name: 'Chemistry',
  number: '01',
  tagline: 'Molecules, reactions, and a little trial and error.',
  introduction:
    'I’m interested in making molecules and finding new ways to make them react. In the Lambert Group at Cornell, I work on organocatalysis: using organic molecules to help chemical transformations happen.',
  interests: [
    'Organic synthesis',
    'Organocatalysis',
    'Reaction discovery',
    'Computational chemistry',
  ],
  shelves: [
    {
      title: 'From the laboratory',
      description:
        'A place for research stories, reaction schemes, and observations from the bench.',
    },
    {
      title: 'Molecules in pictures',
      description:
        'Selected structures, spectra, and laboratory photographs will live here.',
    },
    {
      title: 'Papers & presentations',
      description:
        'Public papers, posters, and talks will be collected here when available.',
    },
  ],
}
