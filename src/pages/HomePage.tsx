import { Link } from 'react-router'
import { profile } from '../content/profile'
import { subjects } from '../content/subjects'
import { projects } from '../content/projects'
import { Panel } from '../components/ui/Panel'
import { ProjectCard } from '../components/ui/ProjectCard'
import { SubjectLink } from '../components/ui/SubjectLink'
import { PixelIcon } from '../components/ui/PixelIcon'
export function HomePage() {
  return (
    <>
      <section className="welcome panel">
        <div>
          <p className="eyebrow">HELLO, WANDERER</p>
          <h1>
            Welcome. I’m Lichen<span className="accent">.</span>
          </h1>
          <p>{profile.introduction}</p>
          <Link className="text-link" to="/about">
            A little more about me <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="welcome-stamp" aria-hidden="true">
          <PixelIcon name="chemistry" />
          <span>
            Lab
            <br />
            APPROVED
          </span>
        </div>
      </section>
      <section className="explore-section">
        <div className="section-label">
          <h2>Three threads, one person</h2>
          <span>FOLLOW A CURIOSITY ↓</span>
        </div>
        <div className="subject-links">
          {subjects.map((subject) => (
            <SubjectLink subject={subject} key={subject.id} />
          ))}
        </div>
      </section>
      <section className="work-section">
        <div className="section-label">
          <h2>On the workbench</h2>
          <Link to="/projects">All projects ↗</Link>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.slug} />
          ))}
        </div>
      </section>
      <div className="home-bottom">
        <Panel eyebrow="LOOSE LEAVES" title="The notebook">
          <p>
            A place for things I figure out, things I’m still figuring out, and
            the occasional detour.
          </p>
          <Link className="text-link" to="/notebook">
            Open the notebook →
          </Link>
        </Panel>
        <Panel eyebrow="TAKE A LOOK AROUND" title="A little room to play">
          <p>
            Graphics, interactive experiments, and small creations will find a
            home here.
          </p>
          <Link className="text-link" to="/playground">
            Visit the playground →
          </Link>
        </Panel>
      </div>
      <p className="home-postscript">
        <span aria-hidden="true">✦</span> Still unpacking. There are a few empty
        shelves, and plenty of room to grow.
      </p>
    </>
  )
}
