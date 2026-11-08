// Original site-specific physics helpers. Canvas units are 3 CSS pixels.
export interface Point {
  x: number
  y: number
}
const clamp = (value: number, low: number, high: number) =>
  Math.min(high, Math.max(low, value))
const smooth = (t: number) => t * t * (3 - 2 * t)
const hash = (x: number, y: number) => {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return value - Math.floor(value)
}
export function smoothNoise(x: number, y: number): number {
  const ix = Math.floor(x),
    iy = Math.floor(y),
    u = smooth(x - ix),
    v = smooth(y - iy)
  const top = hash(ix, iy) * (1 - u) + hash(ix + 1, iy) * u
  const bottom = hash(ix, iy + 1) * (1 - u) + hash(ix + 1, iy + 1) * u
  return top * (1 - v) + bottom * v
}
export function windAt(time: number, x: number, y: number): Point {
  return {
    x:
      0.5 * Math.sin(time * 0.23) +
      0.22 * Math.sin(time * 0.57 + 0.8) +
      0.28 * (smoothNoise(x * 0.012 + time * 0.09, y * 0.01) * 2 - 1),
    y:
      0.12 * Math.sin(time * 0.31 + x * 0.01) +
      0.08 * (smoothNoise(x * 0.01, time * 0.12 + y * 0.01) * 2 - 1),
  }
}
export function gaussianSample(random = Math.random): number {
  return (
    Math.sqrt(-2 * Math.log(Math.max(1e-9, random()))) *
    Math.cos(2 * Math.PI * random())
  )
}
export interface RocketFlight {
  origin: Point
  target: Point
  velocity: Point
  gravity: number
  duration: number
}
export function createRocketFlight(
  target: Point,
  width: number,
  height: number,
  random = Math.random,
): RocketFlight {
  const origin = {
    x: clamp(
      width * (0.5 + gaussianSample(random) * 0.055),
      width * 0.32,
      width * 0.68,
    ),
    y: height + 3,
  }
  const end = {
    x: clamp(target.x, 1, width - 1),
    y: clamp(target.y, 3, height - 1),
  }
  const duration =
    0.95 +
    (Math.abs(end.x - origin.x) / width) * 0.45 +
    (Math.abs(end.y - origin.y) / height) * 0.35
  const gravity = 140
  return {
    origin,
    target: end,
    duration,
    gravity,
    velocity: {
      x: (end.x - origin.x) / duration,
      y: (end.y - origin.y - 0.5 * gravity * duration ** 2) / duration,
    },
  }
}
export function flightPoint(
  flight: RocketFlight,
  age: number,
  time: number,
): Point {
  const t = clamp(age, 0, flight.duration)
  const u = t / flight.duration
  const wind = windAt(
    time,
    flight.origin.x + flight.velocity.x * t,
    flight.origin.y + flight.velocity.y * t,
  )
  // Tiny interior deflection, zero at both ends: the burst still hits the click.
  const envelope = Math.sin(Math.PI * u)
  return {
    x: flight.origin.x + flight.velocity.x * t + wind.x * 0.7 * envelope,
    y:
      flight.origin.y +
      flight.velocity.y * t +
      0.5 * flight.gravity * t ** 2 +
      wind.y * 0.5 * envelope,
  }
}
export const precipitationLayers = [
  {
    weight: 0.46,
    rainSpeed: 38,
    snowSpeed: 4,
    alpha: 0.1,
    size: 1,
    length: 2,
    wind: 4,
  },
  {
    weight: 0.29,
    rainSpeed: 67,
    snowSpeed: 8,
    alpha: 0.17,
    size: 1,
    length: 3,
    wind: 7,
  },
  {
    weight: 0.17,
    rainSpeed: 108,
    snowSpeed: 14,
    alpha: 0.25,
    size: 1.5,
    length: 5,
    wind: 11,
  },
  {
    weight: 0.08,
    rainSpeed: 164,
    snowSpeed: 23,
    alpha: 0.39,
    size: 2,
    length: 7,
    wind: 16,
  },
] as const
export function layerCounts(total: number): number[] {
  const counts = precipitationLayers.map((layer) =>
    Math.floor(total * layer.weight),
  )
  counts[0]! += total - counts.reduce((sum, count) => sum + count, 0)
  return counts
}
export interface PrecipitationParticle {
  x: number
  y: number
  layer: number
  speed: number
  alpha: number
  size: number
  length: number
  phase: number
}
export function createPrecipitation(
  width: number,
  height: number,
  kind: 'rain' | 'snow',
  random = Math.random,
): PrecipitationParticle[] {
  const total = clamp(Math.round(width * 3 * 0.085), 64, 160)
  return layerCounts(total).flatMap((count, layer) => {
    const depth = precipitationLayers[layer]!
    return Array.from({ length: count }, () => ({
      x: random() * width,
      y: random() * height,
      layer,
      speed:
        (kind === 'rain' ? depth.rainSpeed : depth.snowSpeed) *
        (0.78 + random() * 0.44),
      alpha: depth.alpha * (0.72 + random() * 0.42),
      size: depth.size * (0.75 + random() * 0.45),
      length: depth.length * (0.75 + random() * 0.65),
      phase: random() * Math.PI * 2,
    }))
  })
}
export function stepPrecipitation(
  p: PrecipitationParticle,
  kind: 'rain' | 'snow',
  dt: number,
  time: number,
  width: number,
  height: number,
  random = Math.random,
): Point {
  const depth = precipitationLayers[p.layer]!
  const wind = windAt(time, p.x, p.y)
  const flutter = Math.sin(time * (0.6 + p.phase * 0.03) + p.phase)
  const vx =
    (kind === 'rain' ? -p.speed * 0.1 : flutter * (1 + p.layer)) +
    wind.x * depth.wind
  p.x += vx * dt
  p.y += p.speed * (1 + wind.y * 0.13 + flutter * 0.045) * dt
  if (p.y > height + 12) {
    p.y = -12 - random() * 8
    p.x = random() * width
  }
  if (p.x < -12) p.x = width + 10
  if (p.x > width + 12) p.x = -10
  return { x: vx, y: p.speed }
}
export const WEATHER_SETTLE_DELAY = 12
export const WEATHER_SETTLE_CAP = 90
export function weatherExposure(seconds: number): number {
  return clamp(
    (seconds - WEATHER_SETTLE_DELAY) /
      (WEATHER_SETTLE_CAP - WEATHER_SETTLE_DELAY),
    0,
    1,
  )
}
