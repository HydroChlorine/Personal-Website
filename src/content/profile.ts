export const profile = {
  name: 'Lichen Huang',
  handle: 'HydroChlorine',
  location: 'Cornell University · Ithaca, NY',
  introduction:
    "Hi, I'm Lichen. I study chemistry, mathematics, and computer science at Cornell. This is a place for the things I make, the questions I get caught up in, and whatever I learn along the way.",
  email: 'lh728@cornell.edu',
  github: 'https://github.com/HydroChlorine',
  // Replace this PDF in place when a new public CV is ready.
  cvUrl: '/documents/lichen-huang-cv.pdf',
  now: 'Building a home for my projects, experiments, and notes.',
  about: [
    'Hi there this is lichen, probably a chemist or alchemist, love dreaming and thinking about silly things.',
    'Did chemistry, mathematics, and computer science for undergrad. Worked in a great group on organocatalysis.',
    '',
  ],
  // Personal favorites and hobbies can be added here once chosen.
  personalDetails: [] as { label: string; text: string }[],
  milestones: [
    {
      date: '2024–present',
      title: 'Cornell University',
      detail:
        'Chemistry, Mathematics, and Computer Science · expected graduation May 2027',
    },
    {
      date: '2025–present',
      title: 'Lambert Group',
      detail: 'Undergraduate researcher',
    },
    {
      date: 'Summer 2025',
      title: 'Global InfoTech',
      detail: 'Software engineering internship · Java, Spring Boot, and MySQL',
    },
    {
      date: '2023',
      title: 'Nanjing University - Guo Group',
      detail:
        'Earlier research on fluorescent probes and photosensitizers',
    },
  ],
}
