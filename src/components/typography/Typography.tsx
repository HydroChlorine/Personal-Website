import { TypographyContext } from './typographyContext'
import { useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import {
  parseTextStyle,
  textStyleKey,
  splitLetterAccent,
} from './textStyleState'
import type { TextStyle } from './textStyleState'

export function TypographyProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState(() => {
    let mode: TextStyle = 'pixel'
    try {
      mode = parseTextStyle(localStorage.getItem(textStyleKey))
    } catch {
      /* Storage is optional. */
    }
    return { mode, revision: 0 }
  })
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === textStyleKey || event.key === null)
        setPreference((old) => ({
          mode: parseTextStyle(event.newValue),
          revision: old.revision + 1,
        }))
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])
  const setMode = (mode: TextStyle) => {
    setPreference((old) => ({ mode, revision: old.revision + 1 }))
    try {
      localStorage.setItem(textStyleKey, mode)
    } catch {
      /* Keep the choice for this visit. */
    }
  }
  return (
    <TypographyContext.Provider value={{ ...preference, setMode }}>
      <div className="typography-root" data-text-style={preference.mode}>
        {children}
      </div>
    </TypographyContext.Provider>
  )
}
export function TextStyleSwitch({
  mode,
  setMode,
  site = false,
}: {
  mode: TextStyle
  setMode: (mode: TextStyle) => void
  site?: boolean
}) {
  return (
    <div
      className="text-style-switch"
      role="group"
      aria-label={
        site ? 'Default text style for the site' : 'Text style for this panel'
      }
    >
      <span aria-hidden="true">{site ? 'Site text' : 'Text'}</span>
      {(['pixel', 'sharp'] as const).map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={mode === value}
          title={
            site
              ? `Use ${value} text across the site`
              : `Use ${value} text in this panel`
          }
          onClick={() => setMode(value)}
        >
          {value === 'pixel' ? 'Pixel' : 'Sharp'}
        </button>
      ))}
    </div>
  )
}
export function SiteTextStyleSwitch() {
  const { mode, setMode } = useContext(TypographyContext)
  return <TextStyleSwitch mode={mode} setMode={setMode} site />
}
export function PersonalText({
  text,
  word,
  letterIndex = 0,
}: {
  text: string
  word: string
  letterIndex?: number
}) {
  const parts = splitLetterAccent(text, word, letterIndex)
  return parts ? (
    <>
      {parts.before}
      <span className="playful-letter">{parts.letter}</span>
      {parts.after}
    </>
  ) : (
    <>{text}</>
  )
}
