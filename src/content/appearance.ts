export const palettes = [
  {
    id: 'moonrise',
    name: 'Moonrise',
    note: 'Ink blue · lantern amber',
    colors: ['#a5c8e4', '#e0b582', '#9dd1da'],
  },
  {
    id: 'ion',
    name: 'Ion',
    note: 'Midnight · neon cyan',
    colors: ['#7bc9d8', '#d7acb0', '#a3dace'],
  },
] as const
export type PaletteId = (typeof palettes)[number]['id']
export type SkyWeather = 'off' | 'rain' | 'snow'

export type WeatherMode = 'auto' | SkyWeather

export function defaultWeatherForMonth(
  month: number,
  random = Math.random,
): SkyWeather {
  if (!Number.isInteger(month) || month < 0 || month > 11)
    throw new RangeError('Expected a zero-based calendar month')
  if (month <= 2 || month >= 10) return 'snow'
  if (month === 5 || month === 6) return 'rain'
  return random() < 0.5 ? 'off' : 'rain'
}

export function initialWeather(
  date = new Date(),
  random = Math.random,
): SkyWeather {
  return defaultWeatherForMonth(date.getMonth(), random)
}
