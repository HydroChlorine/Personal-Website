import type { ArticleFigure, ProjectArticle } from '../types'
const commit = '212866d4f6cf813746d8251891038b9435eea012'
const root = `https://github.com/HydroChlorine/Catalyst-Discovery/blob/${commit}`
const source = (label: string, file: string) => ({
  label,
  href: `${root}/${file}`,
})
function illustration(
  name: string,
  height: number,
  mobileHeight: number,
  alt: string,
  caption: string,
): ArticleFigure {
  const path = `/media/catalyst-discovery/${name}`
  return {
    src: `${path}.svg`,
    mobileSrc: `${path}-mobile.svg`,
    width: 900,
    height,
    mobileHeight,
    alt,
    caption,
    pixel: {
      gif: `${path}-pixel.gif`,
      still: `${path}-pixel.png`,
      mobileGif: `${path}-pixel-mobile.gif`,
      mobileStill: `${path}-pixel-mobile.png`,
    },
  }
}
export const catalystArticle: ProjectArticle = {
  kicker: 'A first-year project, revisited',
  reviewed: '2026-11-08',
  sourceCommit: commit,
  introduction: [
    'Could a little code help me decide which molecules to look at next? That was the question behind Catalyst Discovery, a project I started as a freshman while finding my way between chemistry and programming.',
    'The idea was to give the computer a familiar molecular starting point, let it explore some variations, and use calculations to guide the next round. Here’s a walk through the pieces—and a few thoughts I still want to come back to.',
  ],
  sections: [
    {
      id: 'the-loop',
      title: '01 / The idea was a loop',
      paragraphs: [
        'Make a few guesses. Give them a shape. Calculate, keep a record, and look for patterns. Then use what you’ve learned to choose another batch. I liked the idea that each round could make the next one a little more informed.',
        'I put together Python tools for generating structures, preparing calculation inputs, and keeping energy records, along with a small prediction interface. A person still does the chemistry checks and runs the calculations; the software connects the steps.',
      ],
      figure: illustration(
        'workflow',
        520,
        850,
        'A loop through proposing molecules, preparing shapes, calculating and checking, recording energies, learning patterns and choosing the next batch.',
        'The loop I wanted to build. Follow the moving spark from one step to the next.',
      ),
      sources: [
        source(
          'The interface',
          'Database_and_Reinforcement_Learning/main_gui.py',
        ),
        source(
          'Original workflow drawing',
          'Design_documents/Overall_process.png',
        ),
      ],
    },
    {
      id: 'growing-structures',
      title: '02 / Same starting point, different possibilities',
      paragraphs: [
        'Think of the starting molecule as a shared frame with a couple of open sockets. The program chooses small molecular fragments from a pool—chains, rings, oxygen- or nitrogen-containing groups—and attaches them to that frame. Change an attachment and you get another member of the family.',
        'Some fragments bring extra sockets of their own. A carbon-containing linker can leave a reserved attachment site for another group, a little like plugging an outlet extender into an existing socket. The asterisk (*) means “something can attach here.” Carbon atoms act as ordinary linkers; the asterisk simply reserves a place for the next attachment.',
        'Those sites also give the structure room to grow in another way: if two open ends sit in suitable positions, the generator can try joining them into a ring. After the edits, RDKit helps check the molecular graph and remove duplicate drawings.',
      ],
      figure: illustration(
        'generator',
        620,
        1030,
        'A fragment pool contains A, a five-membered ring; B, a six-membered ring; and C, a phenyl ring with alternating double bonds. Below, each different group is attached to the same nitrogen-containing scaffold, leaving a second asterisk site open.',
        'A shared core with three different additions: a five-membered ring, a six-membered ring, and phenyl. These are schematic attachment examples, not a set of reported catalyst candidates.',
      ),
      figures: [
        illustration(
          'attachments',
          520,
          950,
          'An attachment site accepts a carbon linker that carries another reserved asterisk. A branching fragment provides two open sites, and suitably positioned ends can join into a five-membered ring.',
          'An attachment can leave another place to grow. Some fragments extend a branch, some add branches, and nearby open ends can meet to make a ring.',
        ),
      ],
      code: {
        label: 'The starting scaffold, written as SMILES',
        text: String.raw`[*]/[N+](N[*])=C\C1=CC=CC=C1`,
      },
      sources: [
        source(
          'Fragment pool, attachment sites and ring attempts',
          'smiles_generator.py',
        ),
        source('Batch generation', 'generator_main.py'),
      ],
    },
    {
      id: 'geometry',
      title: '03 / Giving a drawing some shape',
      paragraphs: [
        'A flat molecular drawing tells you which atoms are connected. A calculation also needs to know where they sit in space. The next tools turn that drawing into a starting 3D arrangement and write input files for Gaussian, a quantum chemistry program.',
        'I also worked on preparing starting guesses for several steps along a reaction: the starting structure, possible transition states, and the structures in between. The calculations would then help check and refine those guesses. This was one way to make the repetitive preparation work less manual.',
      ],
      figure: illustration(
        'geometry',
        520,
        950,
        'A flat connected molecular sketch becomes a three-dimensional arrangement, then a calculation input containing atoms, coordinates and settings.',
        'Connections → a starting shape → a calculation input. The shapes here illustrate the handoff between tools.',
      ),
      table: {
        headers: ['Slot', 'Intended calculation state'],
        rows: [
          ['E1', 'Starting structure'],
          ['E2', 'Cycloaddition transition-state guess'],
          ['E3', 'Cycloaddition product'],
          ['E4', 'Proton-transfer product'],
          ['E5', 'Cycloreversion transition-state guess'],
          ['E6', 'Final product / new hydrazine structure'],
        ],
      },
      sources: [
        source('Six-state preparation driver', 'Utils/Utils_Main.py'),
        source(
          'Starting structure and first transition-state guess',
          'Utils/Starting_Material_and_First_TS.py',
        ),
        source(
          'Proton transfer and cycloreversion',
          'Utils/cycloreversion_ts.py',
        ),
      ],
    },
    {
      id: 'the-predictor',
      title: '04 / Finding a language for the model',
      paragraphs: [
        'One of the harder questions was how to describe a molecule to the model. SMILES is handy for storing a structure as text, but adding groups or closing new rings can change the length and arrangement of that text quite a lot. We hadn’t found an input representation that captured the changing structures in a useful, efficient way.',
        'So we used molecular weight (MolWt) as a first placeholder. It gave every molecule one consistent number and let us connect the database, predictor, and candidate-selection steps while the bigger representation question was still open.',
        'That choice kept the workflow moving, though molecular weight carries only a small part of a molecule’s story. I’d like to return to this with a representation that can describe the connections and local environments as well as the size of the molecule.',
      ],
      figure: illustration(
        'one-feature',
        560,
        1000,
        'A chain, a five-membered ring and an aromatic ring have different text encodings. The workflow uses molecular weight as a consistent placeholder input while a richer structural representation remains a future direction.',
        'The tricky handoff: how do changing molecular drawings become consistent model inputs? MolWt was the first stand-in while we worked on that question.',
      ),
      sources: [
        source(
          'Molecular-weight input and the random-forest predictor',
          'Database_and_Reinforcement_Learning/model_trainer.py',
        ),
        source(
          'Keeping the energy records',
          'Database_and_Reinforcement_Learning/database.py',
        ),
      ],
    },
    {
      id: 'choosing-candidates',
      title: '05 / Choosing what to explore next',
      paragraphs: [
        'The goal was a smaller, more useful set of suggestions. Instead of giving every new structure the same amount of calculation time, the model could compare its predicted energies and help decide which candidates looked interesting enough for a closer look.',
        'In the version I wrote, the program generates a batch, predicts energy values, and filters and ranks the suggestions using two energy differences. What I wanted the whole loop to feel like was a conversation: propose something, check it properly, bring the result back, and use that new information to ask a better next question.',
      ],
      figure: illustration(
        'shortlist',
        520,
        950,
        'A larger pool of sketches passes through prediction and comparison, yielding a smaller shortlist. A calculation and review step feeds new records back into the loop.',
        'The aim: turn a large pool of possibilities into a manageable next batch, then let new calculations inform the following round.',
      ),
      code: {
        label: 'How this early version compares suggestions',
        text: 'd₁ = Ê₂ − Ê₁        d₂ = Ê₅ − Ê₄\naccept if |d₁| ≤ τ and |d₂| ≤ τ\nrank by |d₁| + |d₂|',
      },
      sources: [
        source(
          'Generation, filtering and ranking',
          'Database_and_Reinforcement_Learning/rl_generator.py',
        ),
      ],
    },
    {
      id: 'what-i-take-forward',
      title: '06 / A few thoughts for later',
      paragraphs: [
        'If I pick this up again, I’d like to start with a small collection of well-understood calculations, try a few ways of representing the structures, and see which suggestions are actually worth following. I’m also curious about letting the model say “I’m not sure”—sometimes an uncertain suggestion could be the most interesting thing to investigate.',
        'There’s another question I’ve been turning over for a while. Could we work in the other direction: first explore an idealized energy landscape mathematically—look for a useful valley, or an easier route between states—and then ask which molecules might create something close to it?',
        'I don’t know how far that idea can go. We’d have to find landscapes that chemistry can actually realize, and think about the whole reaction path as well as individual high or low points. But moving back and forth between a mathematical picture and a molecule you could make is exactly the kind of question that keeps this project interesting to me.',
      ],
      figure: illustration(
        'landscape',
        540,
        1000,
        'A stylized desired energy landscape with a marked valley leads through a question mark to several possible molecular structures, showing a speculative inverse-design question.',
        'A question for later: could a desired energy landscape guide the search for structures? This is a conceptual sketch of an idea, not a calculated surface.',
      ),
    },
  ],
}
