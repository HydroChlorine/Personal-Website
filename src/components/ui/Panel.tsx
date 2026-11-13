import { usePanelTypography } from '../typography/typographyContext'
import type { ReactNode } from 'react'
import { TextStyleSwitch } from '../typography/Typography'
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
  const typography = usePanelTypography()
  return (
    <section className={`panel ${className}`} data-text-style={typography.mode}>
      <div className="panel-typebar">
        <TextStyleSwitch {...typography} />
      </div>
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
      {title && <h3>{title}</h3>}
      {typeof children === 'string' ? (
        <p>{children}</p>
      ) : (
        <div className="shelf-description">{children}</div>
      )}
    </div>
  )
}
