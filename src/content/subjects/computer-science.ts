import type { Subject } from '../types'
export const computerScience: Subject = {
  id: 'computer-science',
  name: 'Computer Science',
  number: '03',
  tagline: 'Things to build, break, and understand.',
  introduction:
    'Programming is another way I like to make things—and to understand the tools I use. I’m interested in how software is organized, how a machine carries out an instruction, and how a mathematical idea becomes something I can compute, prove, or see.',
  interests: [
    'Software & systems',
    'Scientific computing',
    'Formal verification',
    'Computer graphics',
    '…',
  ],
  shelves: [
    {
      title: 'Graphics & interactive work',
      description:
        'Rendered scenes, recordings, and things you can eventually try in the browser.',
    },
    {
      title: 'Software & small tools',
      description:
        'Class projects, independent creations, and useful little programs.',
    },
    {
      title: 'Under the hood',
      description:
        'Notes on implementation, proof, algorithms, and engineering decisions.',
    },
  ],
}
