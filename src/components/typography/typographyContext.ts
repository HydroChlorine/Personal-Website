import { createContext, useContext, useState } from 'react'
import type { TextStyle } from './textStyleState'

export const TypographyContext = createContext({
  mode: 'pixel' as TextStyle,
  revision: 0,
  setMode: (_mode: TextStyle) => {},
})
export function usePanelTypography() {
  const preference = useContext(TypographyContext)
  const [override, setOverride] = useState<{
    mode: TextStyle
    revision: number
  } | null>(null)
  return {
    mode:
      override?.revision === preference.revision
        ? override.mode
        : preference.mode,
    setMode: (mode: TextStyle) =>
      setOverride({ mode, revision: preference.revision }),
  }
}
