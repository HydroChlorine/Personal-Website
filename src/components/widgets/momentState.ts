export function boundedLevel(value: number): number {
  return Number.isFinite(value) ? Math.min(1, Math.max(-1, value)) : 0
}
export function displayLevel(value: number): string {
  const level = boundedLevel(value)
  return `${level > 0 ? '+' : level < 0 ? '−' : ''}${Math.abs(level).toFixed(2)}`
}
export function moodNeedle(value: number) {
  const angle = (boundedLevel(value) * Math.PI) / 2
  return { x: 90 + 43 * Math.sin(angle), y: 63 - 43 * Math.cos(angle) }
}
export function energyLever(value: number) {
  const level = boundedLevel(value)
  const angle = (level * Math.PI) / 3
  return {
    x: 58 - 39 * Math.cos(angle),
    y: 48 - 39 * Math.sin(angle),
    pointerY: 48 - 31 * level,
  }
}
export function attentionPicture(value: number) {
  const level = boundedLevel(value)
  const name =
    level >= 0.65
      ? 'nyan.svg'
      : level >= 0.15
        ? 'nyan-fine.png'
        : level >= -0.2
          ? 'nyan-pixel.png'
          : level > -0.55
            ? 'nyan-soft.png'
            : level > -0.85
              ? 'nyan-hazy.png'
              : 'nyan-chaos.png'
  return {
    src: `/art/widgets/${name}`,
    blur:
      level >= 0
        ? 0.65 * (1 - level) ** 2
        : Math.max(0, -level) * 1.8 + (level > -0.2 ? 0.65 : 0),
    crisp: level >= 0.65,
  }
}
