import type { ArticleFigure } from '../../content/types.ts'

export function figureSources(
  figure: ArticleFigure,
  pixel: boolean,
  motion: boolean,
) {
  if (pixel && figure.pixel)
    return {
      source: motion ? figure.pixel.gif : figure.pixel.still,
      mobileSource: motion ? figure.pixel.mobileGif : figure.pixel.mobileStill,
      fullSize: figure.pixel.still,
    }
  return {
    source: motion && figure.crisp ? figure.crisp.gif : figure.src,
    mobileSource:
      motion && figure.crisp ? figure.crisp.mobileGif : figure.mobileSrc,
    fullSize: motion && figure.crisp ? figure.crisp.gif : figure.src,
  }
}
