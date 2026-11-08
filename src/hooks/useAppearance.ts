import { useEffect, useLayoutEffect, useState } from 'react'
import { initialWeather, palettes } from '../content/appearance'
import type { PaletteId, WeatherMode } from '../content/appearance'

function savedPalette(): PaletteId {
  try {
    const saved = localStorage.getItem('site-palette')
    return palettes.find((palette) => palette.id === saved)?.id ?? 'moonrise'
  } catch {
    return 'moonrise'
  }
}
function savedWeatherMode(): WeatherMode {
  try {
    const saved = localStorage.getItem('site-weather-mode-v2')
    return saved === 'off' || saved === 'rain' || saved === 'snow'
      ? saved
      : 'auto'
  } catch {
    return 'auto'
  }
}
export function useAppearance() {
  const [palette, setPalette] = useState<PaletteId>(savedPalette)
  const [calendarWeather] = useState(() => initialWeather())
  const [weatherMode, setWeather] = useState<WeatherMode>(savedWeatherMode)
  const weather = weatherMode === 'auto' ? calendarWeather : weatherMode
  useLayoutEffect(() => {
    document.documentElement.dataset.palette = palette
    const themeColor = document.querySelector('meta[name="theme-color"]')
    themeColor?.setAttribute(
      'content',
      getComputedStyle(document.documentElement)
        .getPropertyValue('--bg')
        .trim(),
    )
    try {
      localStorage.setItem('site-palette', palette)
    } catch {
      /* Optional preference storage. */
    }
  }, [palette])
  useEffect(() => {
    try {
      localStorage.setItem('site-weather-mode-v2', weatherMode)
    } catch {
      /* Optional preference storage. */
    }
  }, [weatherMode])
  return { palette, setPalette, weather, weatherMode, setWeather }
}
