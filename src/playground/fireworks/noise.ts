/** Original smooth value noise: no copied simplex implementation or dependency. */
export function makeNoise2D(random: () => number) {
  const seed = Math.floor(random() * 0x7fffffff)
  function lattice(x: number, y: number) {
    let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ seed
    h = Math.imul(h ^ (h >>> 13), 1274126177)
    return ((h ^ (h >>> 16)) >>> 0) / 2147483648 - 1
  }
  return (x: number, y: number) => {
    const ix = Math.floor(x),
      iy = Math.floor(y),
      u = x - ix,
      v = y - iy
    const sx = u * u * (3 - 2 * u),
      sy = v * v * (3 - 2 * v)
    const a = lattice(ix, iy) * (1 - sx) + lattice(ix + 1, iy) * sx
    const b = lattice(ix, iy + 1) * (1 - sx) + lattice(ix + 1, iy + 1) * sx
    return a * (1 - sy) + b * sy
  }
}
