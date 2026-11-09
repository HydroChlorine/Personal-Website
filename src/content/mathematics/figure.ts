import type { ArticleFigure } from '../types'
export function mathFigure(
  name: string,
  alt: string,
  caption: string,
  height = 520,
  mobileHeight = 800,
): ArticleFigure {
  const path = `/media/mathematics/topics/${name}`
  return {
    src: `${path}.svg`,
    mobileSrc: `${path}-mobile.svg`,
    width: 900,
    height,
    mobileHeight,
    alt,
    caption,
    crisp: {
      gif: `${path}-crisp.gif`,
      mobileGif: `${path}-crisp-mobile.gif`,
    },
    pixel: {
      gif: `${path}-pixel.gif`,
      still: `${path}-pixel.png`,
      mobileGif: `${path}-pixel-mobile.gif`,
      mobileStill: `${path}-pixel-mobile.png`,
    },
  }
}
