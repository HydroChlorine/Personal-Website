import { useEffect, useRef } from 'react'
import type { PaletteId, SkyWeather } from '../../content/appearance'
import {
  createPrecipitation,
  createRocketFlight,
  flightPoint,
  stepPrecipitation,
  windAt,
} from '../../lib/skyPhysics'
import type {
  Point,
  RocketFlight,
  PrecipitationParticle,
} from '../../lib/skyPhysics'

interface Rocket {
  flight: RocketFlight
  age: number
  position: Point
  trail: Point[]
}
interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  age: number
  life: number
  color: string
  size: number
}
const stars = Array.from({ length: 45 }, (_, index) => ({
  x: (index * 67 + 13) % 100,
  y: (index * 43 + 7) % 100,
  large: index % 9 === 0,
}))

// Original bounded pixel-canvas renderer; no course framework or effect library.
export function SkyEnvironment({
  motion,
  weather,
  palette,
}: {
  motion: boolean
  weather: SkyWeather
  palette: PaletteId
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const element = canvas,
      ctx = context,
      PIXEL = 3
    let width = 0,
      height = 0,
      frame = 0,
      lastTime = 0
    let rockets: Rocket[] = [],
      sparks: Spark[] = [],
      precipitation: PrecipitationParticle[] = []
    const style = getComputedStyle(document.documentElement)
    const colors = ['--accent', '--secondary', '--sky-star'].map((name) =>
      style.getPropertyValue(name).trim(),
    )
    function resize() {
      width = Math.ceil(window.innerWidth / PIXEL)
      height = Math.ceil(window.innerHeight / PIXEL)
      element.width = width
      element.height = height
      ctx.imageSmoothingEnabled = false
      rockets = []
      sparks = []
      precipitation =
        weather === 'off' ? [] : createPrecipitation(width, height, weather)
      wake()
    }
    function burst(rocket: Rocket) {
      const color = colors[Math.floor(Math.random() * colors.length)]!
      for (let i = 0; i < 54; i++) {
        const angle = (i / 54) * Math.PI * 2 + Math.random() * 0.12
        const speed = 11 + Math.random() * 24
        sparks.push({
          x: rocket.flight.target.x,
          y: rocket.flight.target.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          age: 0,
          life: 1.8 + Math.random() * 1.2,
          color: i % 7 === 0 ? colors[2]! : color,
          size: i % 5 === 0 ? 2 : 1,
        })
      }
      sparks = sparks.slice(-400)
    }
    function render(timestamp: number) {
      frame = 0
      if (!motion || document.visibilityState !== 'visible') return
      const dt = lastTime
        ? Math.min((timestamp - lastTime) / 1000, 0.04)
        : 0.016
      lastTime = timestamp
      const time = timestamp / 1000
      ctx.clearRect(0, 0, width, height)
      if (weather !== 'off') {
        ctx.fillStyle = colors[2]!
        // Far layers are generated first and drawn behind the nearer particles.
        for (const p of precipitation) {
          const velocity = stepPrecipitation(
            p,
            weather,
            dt,
            time,
            width,
            height,
          )
          ctx.globalAlpha = p.alpha
          const x = Math.round(p.x),
            y = Math.round(p.y)
          const size = Math.max(
            1,
            Math.round(
              p.size +
                (weather === 'snow' && p.layer === 3 && p.phase > 4 ? 0.7 : 0),
            ),
          )
          if (weather === 'snow') {
            ctx.fillRect(x, y, size, Math.max(1, size - 1))
            if (size === 3) ctx.fillRect(x + 1, y - 1, 1, 4)
          } else {
            const length = Math.max(2, Math.round(p.length))
            for (let step = 0; step < length; step++)
              ctx.fillRect(
                Math.round(x - (velocity.x / p.speed) * step),
                y - step,
                size,
                1,
              )
          }
        }
      }
      const ascending: Rocket[] = []
      for (const rocket of rockets) {
        rocket.age += dt
        rocket.position = flightPoint(rocket.flight, rocket.age, time)
        rocket.trail.push(rocket.position)
        if (rocket.trail.length > 13) rocket.trail.shift()
        ctx.fillStyle = colors[1]!
        rocket.trail.forEach((point, i) => {
          ctx.globalAlpha = (0.65 * (i + 1)) / rocket.trail.length
          ctx.fillRect(Math.round(point.x), Math.round(point.y), 1, 1)
        })
        ctx.globalAlpha = 0.95
        ctx.fillRect(
          Math.round(rocket.position.x),
          Math.round(rocket.position.y),
          1,
          2,
        )
        if (rocket.age >= rocket.flight.duration) burst(rocket)
        else ascending.push(rocket)
      }
      rockets = ascending
      const alive: Spark[] = []
      for (const spark of sparks) {
        spark.age += dt
        if (spark.age >= spark.life) continue
        const wind = windAt(time, spark.x, spark.y)
        // Weather feels a wind velocity; firework drift gets only a tiny acceleration.
        spark.vx += wind.x * 1.2 * dt
        spark.vy += (16 + wind.y * 0.8) * dt
        spark.vx *= Math.exp(-0.5 * dt)
        spark.vy *= Math.exp(-0.2 * dt)
        spark.x += spark.vx * dt
        spark.y += spark.vy * dt
        ctx.fillStyle = spark.color
        const alpha = (1 - spark.age / spark.life) ** 1.4
        ctx.globalAlpha = alpha * 0.8
        ctx.fillRect(
          Math.round(spark.x),
          Math.round(spark.y),
          spark.size,
          spark.size,
        )
        ctx.globalAlpha = alpha * 0.2
        ctx.fillRect(
          Math.round(spark.x - spark.vx * 0.06),
          Math.round(spark.y - spark.vy * 0.06),
          1,
          1,
        )
        alive.push(spark)
      }
      sparks = alive
      ctx.globalAlpha = 1
      if (weather !== 'off' || rockets.length || sparks.length)
        frame = requestAnimationFrame(render)
      else lastTime = 0
    }
    function wake() {
      if (motion && !frame && document.visibilityState === 'visible')
        frame = requestAnimationFrame(render)
    }
    function launch(x: number, y: number) {
      if (!motion || rockets.length >= 6) return
      const flight = createRocketFlight(
        { x: x / PIXEL, y: y / PIXEL },
        width,
        height,
      )
      rockets.push({ flight, age: 0, position: flight.origin, trail: [] })
      wake()
    }
    function onSkyClick(event: MouseEvent) {
      if (
        event.button !== 0 ||
        event.defaultPrevented ||
        !(event.target instanceof Element)
      )
        return
      if (event.target.matches('body, html, #root, [data-sky-surface]'))
        launch(event.clientX, event.clientY)
    }
    function onWish() {
      launch(window.innerWidth * 0.84, window.innerHeight * 0.24)
    }
    function onVisibility() {
      cancelAnimationFrame(frame)
      frame = 0
      lastTime = 0
      if (document.visibilityState === 'hidden') {
        rockets = []
        sparks = []
        ctx.clearRect(0, 0, width, height)
      } else wake()
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('click', onSkyClick)
    window.addEventListener('site:sky-spark', onWish)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', onSkyClick)
      window.removeEventListener('site:sky-spark', onWish)
      document.removeEventListener('visibilitychange', onVisibility)
      ctx.clearRect(0, 0, width, height)
    }
  }, [motion, weather, palette])
  return (
    <>
      <div className="sky-backdrop" aria-hidden="true">
        <div className="sky-haze" />
        <svg
          className="sky-moon"
          viewBox="0 0 64 64"
          shapeRendering="crispEdges"
        >
          <path
            fill="currentColor"
            d="M34 2h12v4h-8v4h-4v8h-4v16h4v8h4v4h8v4H34v-4h-8v-4h-4v-8h-4V18h4v-8h4V6h8z"
          />
        </svg>
        <svg
          className="sky-constellation"
          viewBox="0 0 1000 800"
          preserveAspectRatio="none"
        >
          <path d="M25 90L100 190L40 335L130 430M870 115L950 255L915 420L985 540" />
          <path d="M120 710L310 760L470 700" />
        </svg>
        {stars.map((star, i) => (
          <i
            className={`sky-star ${star.large ? 'large' : ''}`}
            key={i}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDelay: `${-(i % 9)}s`,
            }}
          />
        ))}
      </div>
      <canvas ref={canvasRef} className="sky-effects" aria-hidden="true" />
    </>
  )
}
