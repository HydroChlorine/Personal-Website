import { useSceneCycle } from './useSceneCycle'
import {
  chemistryScenes,
  CHEMISTRY_SCENE_INTERVAL_MS,
} from '../content/chemistryScenes'

export function useChemistryScene(active: boolean, motion: boolean) {
  const { index, nextScene } = useSceneCycle(
    chemistryScenes.length,
    active,
    motion,
    CHEMISTRY_SCENE_INTERVAL_MS,
  )
  return { scene: chemistryScenes[index]!, nextScene }
}
