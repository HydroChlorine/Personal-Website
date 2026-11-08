import { useCallback, useEffect, useState } from 'react'
import {
  initialSeasonState,
  nextSeasonState,
  SCENE_INTERVAL_MS,
} from '../content/scenes'

export function useCampusScene(motion: boolean) {
  const [state, setState] = useState(() => initialSeasonState())
  const nextScene = useCallback(() => {
    // Keep the updater deterministic under React StrictMode.
    const roll = Math.random()
    setState((current) => nextSeasonState(current, () => roll))
  }, [])
  useEffect(() => {
    if (!motion) return
    let timer: number | undefined
    function arm() {
      window.clearTimeout(timer)
      if (document.visibilityState === 'visible')
        timer = window.setTimeout(nextScene, SCENE_INTERVAL_MS)
    }
    arm()
    document.addEventListener('visibilitychange', arm)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', arm)
    }
  }, [motion, state.scene.id, nextScene])
  return { scene: state.scene, nextScene }
}
