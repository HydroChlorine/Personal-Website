import { useEffect, useRef, useState } from 'react'
import type { SkyWeather } from '../content/appearance'
import { weatherExposure, WEATHER_SETTLE_CAP } from '../lib/skyPhysics'

export function useWeatherExposure(weather: SkyWeather, motion: boolean) {
  const elapsed = useRef(0)
  const [exposure, setExposure] = useState({ weather, seconds: 0 })
  useEffect(() => {
    elapsed.current = 0
    setExposure({ weather, seconds: 0 })
  }, [weather])
  useEffect(() => {
    if (!motion || weather === 'off' || elapsed.current >= WEATHER_SETTLE_CAP)
      return
    let last = performance.now()
    const resetClock = () => {
      last = performance.now()
    }
    const timer = window.setInterval(() => {
      const now = performance.now()
      if (document.visibilityState === 'visible') {
        elapsed.current = Math.min(
          WEATHER_SETTLE_CAP,
          elapsed.current + Math.min((now - last) / 1000, 2),
        )
        setExposure({ weather, seconds: elapsed.current })
        if (elapsed.current >= WEATHER_SETTLE_CAP) window.clearInterval(timer)
      }
      last = now
    }, 1000)
    document.addEventListener('visibilitychange', resetClock)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', resetClock)
    }
  }, [weather, motion])
  const seconds = exposure.weather === weather ? exposure.seconds : 0
  return weather === 'off' ? 0 : weatherExposure(seconds)
}
