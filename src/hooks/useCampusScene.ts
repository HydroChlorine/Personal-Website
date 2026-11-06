import { useEffect, useState } from 'react'
import { randomSceneIndex, scenes, SCENE_INTERVAL_MS } from '../content/scenes'
import type { SceneSelection } from '../content/scenes'

export function useCampusScene(motion: boolean) {
  const [selection, setSelection] = useState<SceneSelection>('shuffle')
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * scenes.length),
  )
  useEffect(() => {
    if (!motion || selection !== 'shuffle') return
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible')
        setIndex((current) => randomSceneIndex(current))
    }, SCENE_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [motion, selection])
  function chooseScene(value: SceneSelection) {
    if (value === 'shuffle') {
      setSelection(value)
      return
    }
    const next = scenes.findIndex((scene) => scene.id === value)
    if (next !== -1) {
      setIndex(next)
      setSelection(value)
    }
  }
  function nextScene() {
    setSelection('shuffle')
    setIndex((current) => randomSceneIndex(current))
  }
  return { scene: scenes[index]!, selection, chooseScene, nextScene }
}
