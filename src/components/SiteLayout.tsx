import { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'
import { Outlet } from 'react-router'
import { SiteHeader } from './layout/SiteHeader'
import { Sidebar } from './layout/Sidebar'
import { SiteFooter } from './layout/SiteFooter'
import { AmbientScene } from './scene/AmbientScene'
import { useCampusScene } from '../hooks/useCampusScene'
import { useAppearance } from '../hooks/useAppearance'
import { useWeatherExposure } from '../hooks/useWeatherExposure'
import { SkyEnvironment } from './sky/SkyEnvironment'
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
  const { scene, nextScene } = useCampusScene(motion)
  const { palette, setPalette, weather, weatherMode, setWeather } =
    useAppearance()
  const coverage = useWeatherExposure(weather, motion)
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
    <div
      className={`site-world ${motion ? '' : 'motion-paused'}`}
      data-sky-surface
      data-weather={weather}
      data-weathered={coverage > 0}
      style={{ '--weather-amount': coverage } as CSSProperties}
    >
      <SkyEnvironment motion={motion} weather={weather} palette={palette} />
      <div className="site-shell" data-sky-surface>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <AmbientScene scene={scene} motion={motion} onNext={nextScene} />
        <div className="content-layout" data-sky-surface>
          <main id="main-content" tabIndex={-1} data-sky-surface>
            <Outlet />
          </main>
          <Sidebar
            palette={palette}
            setPalette={setPalette}
            weather={weather}
            weatherMode={weatherMode}
            setWeather={setWeather}
            motion={motion}
            setMotion={setMotion}
          />
        </div>
        <SiteFooter motion={motion} />
      </div>
      <div className="weather-ground" aria-hidden="true" />
    </div>
  )
}
