import type { ArticleFigure } from '../types'

export function csFigure(
  name: string,
  alt: string,
  caption: string,
  mobileHeight = 1000,
): ArticleFigure {
  const path = `/media/computer-science/stories/${name}`
  return {
    src: `${path}.svg`,
    mobileSrc: `${path}-mobile.svg`,
    width: 900,
    height: 600,
    mobileHeight,
    alt,
    caption,
    pixel: {
      gif: `${path}-pixel.gif`,
      still: `${path}-pixel.png`,
      mobileGif: `${path}-pixel-mobile.gif`,
      mobileStill: `${path}-pixel-mobile.png`,
    },
    crisp: { gif: `${path}-crisp.gif`, mobileGif: `${path}-crisp-mobile.gif` },
  }
}
