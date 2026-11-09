import { inspirations } from '../content/credits'
import { PageHeading } from '../components/ui/PageHeading'
import { Panel } from '../components/ui/Panel'
import { mathematicsReferences } from '../content/mathematicsReferences'
import { computerScienceReferences } from '../content/computerScienceReferences'
export function CreditsPage() {
  return (
    <>
      <PageHeading eyebrow="WITH THANKS" title="Credits & inspirations">
        A place to keep track of the people and tools behind this little corner.
      </PageHeading>
      <Panel title="Places that inspired this one">
        {inspirations.map((item) => (
          <article className="credit-entry" key={item.href}>
            <h3>
              <a href={item.href}>{item.name} ↗</a>
            </h3>
            <p>{item.note}</p>
          </article>
        ))}
      </Panel>
      <Panel title="Artwork & type">
        <p>
          The coarse moonlight and predawn Baker Laboratory and Physical
          Sciences Building scenes were created with OpenAI image generation
          using architectural references, then animated for this website. The
          reference photographs are not published here. These are artistic
          interpretations, not official Cornell imagery.
        </p>
        <div className="inline-links">
          <a href="https://chemistry.cornell.edu/">
            Baker architectural reference ↗
          </a>
          <a href="https://nowack.lassp.cornell.edu/lab">
            PSB architectural reference ↗
          </a>
        </div>
        <p>
          The nighttime workshop illustration and pixel icons were created for
          this website. The interface uses system fonts; no external font files
          or reference-site artwork are included.
        </p>
      </Panel>
      <Panel title="At the chemistry bench">
        <p>
          The six laboratory vignettes were created with OpenAI image
          generation, then animated with original pixel sprites and motion for
          this site. They are stylized illustrations; the instrument displays
          are decorative. Prompts and source masters are retained with the
          project.
        </p>
        <p>
          The Catalyst Discovery article is based on Lichen’s own public Python
          repository. Its workflow and representation diagrams were drawn anew
          for the article; they show concepts, not measured results.
        </p>
        <a href="https://github.com/HydroChlorine/Catalyst-Discovery">
          Catalyst Discovery source ↗
        </a>
      </Panel>
      <Panel title="At the mathematics desk">
        <p>
          The six illustrated topic stories add 46 original mathematical
          diagrams, with animated pixel and crisp views, static pause
          companions, and phone layouts. Their source references are linked
          within each story. The examples use synthetic data and analytic
          models, not experimental results.
        </p>
        <a href="/mathematics">Explore the mathematics stories ↗</a>
        <p>
          The six night-study scenes, their desk artwork, and the diagrams were
          drawn with original Python, NumPy, and Pillow code for this website.
          Curves, matrix steps, the Lorenz trajectory, and the synthetic Fourier
          example are calculated rather than copied from reference images. No
          reference-site code or artwork is included.
        </p>
        <details>
          <summary>Mathematical references</summary>
          <ul>
            {mathematicsReferences.map((reference) => (
              <li key={reference.href}>
                <a href={reference.href}>{reference.label} ↗</a>
              </li>
            ))}
          </ul>
        </details>
      </Panel>
      <Panel title="At the keyboard">
        <p>
          The six computer science scenes were drawn and animated for this site
          with original Python, NumPy, and Pillow code. They share the original
          mathematics desk and palette, with new monitor artwork for objects,
          logic, architecture, the web, graphics, and Rocq proofs. Phone layouts
          and static pause images are included.
        </p>
        <p>
          The machine and web exchange are teaching sketches; the proof scene
          illustrates typed proof objects and kernel checking. No course
          screenshots, external artwork, logos, or third-party implementation
          code are included.
        </p>
        <details>
          <summary>Computer science references</summary>
          <ul>
            {computerScienceReferences.map((reference) => (
              <li key={reference.href}>
                <a href={reference.href}>{reference.label} ↗</a>
              </li>
            ))}
          </ul>
        </details>
      </Panel>
      <Panel title="Computer science stories & the miniature">
        <p>
          The five project stories and the formal-verification article add 23
          original diagram concepts, with paired pixel/crisp animations, phone
          layouts, and pause stills. The schematics and synthetic examples were
          created for this website with AI-assisted illustration code.
        </p>
        <p>
          CritterWorld was created by Ibrahim Ahmed, Lichen Huang, John Karaca,
          and Michael Zhang for Cornell CS 2112. The fireworks story credits
          Lichen’s infrastructure and initial implementation, the collaborators’
          shared ideas, and the AniGraph course framework. The ongoing 4D game
          credits Lichen’s gameplay and mathematical contributions within the
          collaborative 4Dto3D project. The internship illustrations contain
          abstract records and no employer source code.
        </p>
        <div className="inline-links">
          <a href="https://github.com/johnkaraca/critterworld">
            CritterWorld team overview ↗
          </a>
          <a href="https://github.com/wonhochoi25/4Dto3D">4Dto3D upstream ↗</a>
        </div>
        <p>
          The red-black-tree case study uses Lichen’s completed Software
          Foundations exercises. The chapter, algorithm, and supporting
          definitions retain their own authorship; the short excerpt is
          accompanied by the retained MIT notices.
        </p>
        <div className="inline-links">
          <a href="https://softwarefoundations.cis.upenn.edu/vfa-current/Redblack.html">
            Software Foundations chapter ↗
          </a>
          <a href="/licenses/SOFTWARE_FOUNDATIONS_MIT.txt">
            Read the MIT notices ↗
          </a>
        </div>
        <p>
          The interactive miniature reuses this site’s own homepage sections and
          artwork in a condensed layout. The idea of a miniature personal
          website comes from dimden’s WebTiles example, explicitly credited
          beside the widget. This site hosts its own miniature.
        </p>
        <a href="https://dimden.dev/">
          dimden’s original miniature-site idea ↗
        </a>
      </Panel>
      <Panel title="The little sky">
        <p>
          The faint moon, constellations, palette experiments, pixel weather,
          and fireworks were created for this website. The firework interaction
          is inspired by Lichen’s own particle-simulation work; no course
          framework or third-party effect library is included.
        </p>
      </Panel>
      <Panel title="Open-source foundations">
        <p>
          Built with React, React Router, TypeScript, and Vite. React and React
          Router are MIT licensed; TypeScript is Apache-2.0 licensed; Vite is
          MIT licensed with bundled dependency notices.
        </p>
        <a className="text-link" href="/licenses/THIRD_PARTY_NOTICES.txt">
          Read third-party license notices ↗
        </a>
        <p className="small-note">
          Additional dependency licenses are recorded with the source. Credits
          will grow as new material is added.
        </p>
      </Panel>
    </>
  )
}
