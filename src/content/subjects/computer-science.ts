import type { Subject } from '../types'
export const computerScience: Subject = {
  id: 'computer-science',
  name: 'Computer Science',
  number: '03',
  tagline: 'Things to build, break, and understand.',
  introduction:
    'Programming is another way I like to make things. My studies have taken me through software design, systems, algorithms, machine learning, formal verification, and computer graphics. Here is where the actual creations will go.',
  interests: [
    'Computer graphics',
    'Software & systems',
    'Formal verification',
    'Scientific computing',
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
