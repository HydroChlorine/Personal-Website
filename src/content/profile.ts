export const profile = {
  name: 'Lichen Huang',
  handle: 'HydroChlorine',
  location: 'Cornell University · Ithaca, NY',
  introduction:
    "Hi, I'm Lichen. I study chemistry, mathematics, and computer science at Cornell. This is a place for the things I make, the questions I get caught up in, and whatever I learn along the way.",
  email: 'lh728@cornell.edu',
  github: 'https://github.com/HydroChlorine',
  // Add a public PDF to public/documents, then set this to its URL.
  cvUrl: null as string | null,
  now: 'Building a home for my projects, experiments, and notes.',
  about: [
    'Hi there this is lichen, someone who should primarily be categorized as a chemist, love dreaming and thinking about silly things.',
    'During undergrad, I study chemistry, mathematics, and computer science. Work in the Lambert Group on organocatalysis.',
    'This site is just getting started. Over time, I want it to hold research stories, class projects, small experiments, and a few things that don’t belong on a CV.',
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
      detail: 'Undergraduate research in organocatalysis',
    },
    {
      date: 'Summer 2025',
      title: 'Global InfoTech',
      detail: 'Software engineering internship · Java, Spring Boot, and MySQL',
    },
    {
      date: '2023',
      title: 'Nanjing University',
      detail:
        'Earlier research involving fluorescent probes and photosensitizers',
    },
  ],
}
