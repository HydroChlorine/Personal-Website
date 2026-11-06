import { useState } from 'react'
import { Outlet } from 'react-router'
import { SiteHeader } from './layout/SiteHeader'
import { Sidebar } from './layout/Sidebar'
import { SiteFooter } from './layout/SiteFooter'
import { AmbientScene } from './scene/AmbientScene'
import { useCampusScene } from '../hooks/useCampusScene'
import { useEffect } from 'react'
function initialMotion() {
  try {
    return (
      localStorage.getItem('site-motion') !== 'paused' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  } catch {
    return false
  }
}
export function SiteLayout() {
  const [motion, changeMotion] = useState(initialMotion)
  const { scene, selection, chooseScene, nextScene } = useCampusScene(motion)
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pauseForPreference = () => {
      if (preference.matches) changeMotion(false)
    }
    preference.addEventListener('change', pauseForPreference)
    return () => preference.removeEventListener('change', pauseForPreference)
  }, [])
  function setMotion(value: boolean) {
    changeMotion(value)
    try {
      localStorage.setItem('site-motion', value ? 'playing' : 'paused')
    } catch {
      /* Preferences may be unavailable. */
    }
  }
  return (
    <div className={`site-shell ${motion ? '' : 'motion-paused'}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <AmbientScene scene={scene} motion={motion} />
      <div className="content-layout">
        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
        <Sidebar
          selection={selection}
          chooseScene={chooseScene}
          nextScene={nextScene}
          motion={motion}
          setMotion={setMotion}
        />
      </div>
      <SiteFooter />
    </div>
  )
}
