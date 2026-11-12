import type { ReactNode } from 'react'
export function Panel({
  title,
  eyebrow,
  children,
  className = '',
}: {
  title?: string
  eyebrow?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`panel ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {title && <h2>{title}</h2>}
      {children}
    </section>
  )
}
export function EmptyShelf({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="empty-shelf">
      <span className="shelf-mark" aria-hidden="true">
        + + +
      </span>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  )
}
