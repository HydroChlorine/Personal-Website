import { useCallback, useEffect, useState } from 'react'

// Each caller retains its own position. Hidden tabs and inactive subjects do
// not consume the visitor's reading time; a manual advance restarts the clock.
export function useSceneCycle(
  count: number,
  active: boolean,
  motion: boolean,
  interval = 30_000,
) {
  const [index, setIndex] = useState(0)
  const nextScene = useCallback(
    () => setIndex((current) => (current + 1) % count),
    [count],
  )
  useEffect(() => {
    if (!active || !motion) return
    let timer: number | undefined
    const arm = () => {
      window.clearTimeout(timer)
      if (document.visibilityState === 'visible')
        timer = window.setTimeout(nextScene, interval)
    }
    arm()
    document.addEventListener('visibilitychange', arm)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', arm)
    }
  }, [active, motion, index, nextScene, interval])
  return { index, nextScene }
}
