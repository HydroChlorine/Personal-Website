import { getMoonIllumination, getMoonPosition } from 'suncalc'

export const moonLocation = {
  name: 'Ithaca, NY',
  latitude: 42.4444,
  longitude: -76.4926,
  timeZone: 'America/New_York',
} as const

const phases = [
  'New Moon',
  'Waxing Crescent',
  'First Quarter',
  'Waxing Gibbous',
  'Full Moon',
  'Waning Gibbous',
  'Last Quarter',
  'Waning Crescent',
]

export function moonReading(date: Date) {
  // SunCalc 2 uses degrees, with azimuth clockwise from north.
  const position = getMoonPosition(
    date,
    moonLocation.latitude,
    moonLocation.longitude,
  )
  const light = getMoonIllumination(date)
  return {
    ...position,
    ...light,
    phaseName: phases[Math.round(light.phase * 8) % 8],
    rising:
      getMoonPosition(
        new Date(date.getTime() + 30_000),
        moonLocation.latitude,
        moonLocation.longitude,
      ).altitude > position.altitude,
    clock: new Intl.DateTimeFormat('en-US', {
      timeZone: moonLocation.timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date),
  }
}

export function moonPixels(fraction: number, limbAngle: number) {
  const angle = (limbAngle * Math.PI) / 180
  const across = 2 * Math.sqrt(fraction * (1 - fraction))
  const sun = [
    Math.sin(angle) * across,
    Math.cos(angle) * across,
    2 * fraction - 1,
  ]
  const cells = []
  for (let y = 0; y < 24; y++)
    for (let x = 0; x < 24; x++) {
      const nx = (x + 0.5 - 12) / 11.5,
        ny = (12 - y - 0.5) / 11.5
      if (nx * nx + ny * ny > 1) continue
      const z = Math.sqrt(1 - nx * nx - ny * ny)
      const lit = nx * sun[0] + ny * sun[1] + z * sun[2] > 0
      // Newly drawn lunar texture, not dimden's phase images.
      const crater = [
        [7, 8, 3],
        [15, 13, 3],
        [9, 17, 2],
        [17, 6, 2],
      ].some(([cx, cy, r]) => (x - cx) ** 2 + (y - cy) ** 2 < r * r)
      cells.push({
        x,
        y,
        fill: lit
          ? crater
            ? '#b5b8ae'
            : '#e5e3c9'
          : crater
            ? '#263346'
            : '#344155',
      })
    }
  return cells
}
