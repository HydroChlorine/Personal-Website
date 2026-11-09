export const computerScienceScenes = [
  {
    id: 'objects',
    label: 'Java / objects & a simple factory',
    title: ['One interface.', 'Many shapes.'],
    subtitle: 'Build an object. Give it a job. Let the implementation vary.',
    description:
      'A pixel coding desk shows a Java Shape interface, then a simple factory creating a circle or square behind the same draw call.',
  },
  {
    id: 'logic',
    label: 'Logic / truth tables & deductions',
    title: ['Start with', 'the rules.'],
    subtitle: 'From true and false to statements we can reason about.',
    description:
      'A truth table highlights all four pairs of Boolean inputs; two conjunction circuits compute P and Q in opposite orders with equal outputs.',
  },
  {
    id: 'architecture',
    label: 'Architecture / load → add → store',
    title: ['Inside', 'the machine.'],
    subtitle: 'A value moves from memory, through a register, and back.',
    description:
      'An illustrative eight-bit machine loads five from memory into R0, adds one, and stores six at another address, with moving data and changing register bits.',
  },
  {
    id: 'web',
    label: 'Web / client → server → database',
    title: ['A request.', 'A round trip.'],
    subtitle: 'Follow a small message through the pieces of a web application.',
    description:
      'A browser requests notes from an application server, which queries a database; a row returns to the server and a response updates the browser.',
  },
  {
    id: 'graphics',
    label: 'Graphics / model → pixels → interface',
    title: ['Make an idea', 'visible.'],
    subtitle: 'Vertices, transformations, and light become something to see.',
    description:
      'A rotating cube is shown as a wireframe and a shaded pixel rendering, then inside a small browser interface with scene objects and materials.',
  },
  {
    id: 'proof',
    label: 'Formal verification / proofs as programs',
    title: ['Logic, made', 'checkable.'],
    subtitle: 'Propositions as types. Proofs as programs. Checked at the core.',
    description:
      'A proposition unfolds into typed function blocks. Matching proof objects flow through the blocks, which compose into one proof object and light up under a conceptual kernel check.',
  },
].map((scene) => ({
  ...scene,
  gif: `/art/computer-science/v1/${scene.id}.gif`,
  still: `/art/computer-science/v1/${scene.id}.png`,
  mobileGif: `/art/computer-science/v1/${scene.id}-mobile.gif`,
  mobileStill: `/art/computer-science/v1/${scene.id}-mobile.png`,
}))
export type ComputerScienceScene = (typeof computerScienceScenes)[number]
