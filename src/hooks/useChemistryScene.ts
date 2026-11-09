import { useCallback, useEffect, useState } from 'react'
import {
  chemistryScenes,
  CHEMISTRY_SCENE_INTERVAL_MS,
} from '../content/chemistryScenes'

export function useChemistryScene(active: boolean, motion: boolean) {
  const [index, setIndex] = useState(0)
  const nextScene = useCallback(
    () => setIndex((current) => (current + 1) % chemistryScenes.length),
    [],
  )
  useEffect(() => {
    if (!active || !motion) return
    let timer: number | undefined
    const arm = () => {
      window.clearTimeout(timer)
      if (document.visibilityState === 'visible')
        timer = window.setTimeout(nextScene, CHEMISTRY_SCENE_INTERVAL_MS)
    }
    arm()
    document.addEventListener('visibilitychange', arm)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', arm)
    }
  }, [active, motion, index, nextScene])
  return { scene: chemistryScenes[index]!, nextScene }
}
