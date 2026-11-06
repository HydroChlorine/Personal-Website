import { useState } from 'react'
import { Outlet } from 'react-router'
import { SiteHeader } from './layout/SiteHeader'
import { Sidebar } from './layout/Sidebar'
import { SiteFooter } from './layout/SiteFooter'
import { AmbientScene } from './scene/AmbientScene'
import type { Weather } from './scene/AmbientScene'
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
  const [weather, setWeather] = useState<Weather>('clear')
  const [motion, changeMotion] = useState(initialMotion)
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
      <AmbientScene weather={weather} motion={motion} />
      <div className="content-layout">
        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
        <Sidebar
          weather={weather}
          setWeather={setWeather}
          motion={motion}
          setMotion={setMotion}
        />
      </div>
      <SiteFooter />
    </div>
  )
}
