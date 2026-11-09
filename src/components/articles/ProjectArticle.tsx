import { useState } from 'react'
import { useOutletContext } from 'react-router'
import { figureSources } from './figureSources'
import type {
  ArticleFigure as Figure,
  ProjectArticle as Article,
} from '../../content/types'

function ArticleFigure({
  figure,
  motion,
}: {
  figure: Figure
  motion: boolean
}) {
  const [pixel, setPixel] = useState(Boolean(figure.pixel))
  const { source, mobileSource, fullSize } = figureSources(
    figure,
    pixel,
    motion,
  )
  return (
    <figure className="article-figure">
      {figure.pixel && (
        <div
          className="figure-options"
          role="group"
          aria-label="Figure illustration style"
        >
          <button
            type="button"
            aria-pressed={pixel}
            onClick={() => setPixel(true)}
          >
            Pixel sketch
          </button>
          <button
            type="button"
            aria-pressed={!pixel}
            onClick={() => setPixel(false)}
          >
            Crisp diagram
          </button>
        </div>
      )}
      <a
        href={fullSize}
        target="_blank"
        rel="noreferrer"
        aria-label="Open this figure at full size"
      >
        <picture>
          {mobileSource && (
            <source
              media="(max-width: 600px)"
              srcSet={mobileSource}
              width={450}
              height={figure.mobileHeight ?? 850}
            />
          )}
          <img
            className={pixel ? 'pixel-figure' : ''}
            src={source}
            alt={figure.alt}
            loading="lazy"
            width={figure.width ?? 900}
            height={figure.height ?? 520}
          />
        </picture>
      </a>
      <figcaption>{figure.caption}</figcaption>
    </figure>
  )
}
export function ProjectArticle({ article }: { article: Article }) {
  const { motion } = useOutletContext<{ motion: boolean }>()
  return (
    <article
      className="panel project-article"
      aria-label={
        article.kind === 'topic' ? 'Mathematics article' : 'Project story'
      }
    >
      <header className="article-opening">
        <p className="eyebrow">{article.kicker}</p>
        {article.introduction.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </header>
      <nav className="article-contents" aria-label="In this article">
        <span className="small-label">
          Inside this {article.kind === 'topic' ? 'topic' : 'project'}
        </span>
        <ol>
          {article.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>
                {section.title.replace(/^\d+\s*\/\s*/, '')}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      {article.sections.map((section) => (
        <section
          className="article-section"
          id={section.id}
          key={section.id}
          aria-labelledby={`${section.id}-heading`}
        >
          <h2 id={`${section.id}-heading`}>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.equations?.map((equation) => (
            <figure className="article-equation" key={equation.expression}>
              <figcaption>{equation.label}</figcaption>
              <pre>
                <code>{equation.expression}</code>
              </pre>
            </figure>
          ))}
          {section.figure && (
            <ArticleFigure figure={section.figure} motion={motion} />
          )}
          {section.figures?.map((figure) => (
            <ArticleFigure key={figure.src} figure={figure} motion={motion} />
          ))}
          {section.aside && (
            <aside className="article-aside">
              <h3>{section.aside.title}</h3>
              <p>{section.aside.text}</p>
            </aside>
          )}
          {(section.code ||
            section.table ||
            section.list ||
            section.sources ||
            section.detailParagraphs) && (
            <details className="article-details">
              <summary>
                {article.kind === 'topic'
                  ? 'Under the surface / mathematics & references'
                  : 'A little more detail & source code'}
              </summary>
              {section.detailParagraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.code && (
                <figure className="article-code">
                  <figcaption>{section.code.label}</figcaption>
                  <pre>
                    <code>{section.code.text}</code>
                  </pre>
                </figure>
              )}
              {section.table && (
                <div className="article-table">
                  <table>
                    <caption>
                      {section.table.caption ??
                        'Six intended calculation states'}
                    </caption>
                    <thead>
                      <tr>
                        {section.table.headers.map((header) => (
                          <th scope="col" key={header}>
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((value, index) =>
                            index === 0 ? (
                              <th scope="row" key={value}>
                                {value}
                              </th>
                            ) : (
                              <td key={value}>{value}</td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {section.list && (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.sources && (
                <div className="article-sources">
                  <span>
                    {article.kind === 'topic' ? 'Read further' : 'In the code'}
                  </span>
                  {section.sources.map((link) => (
                    <a key={link.href} href={link.href}>
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </details>
          )}
        </section>
      ))}
    </article>
  )
}
