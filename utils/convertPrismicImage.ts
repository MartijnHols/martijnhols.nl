import { ImageField, FilledImageFieldImage } from '@prismicio/client'
import { StaticImageData } from 'next/image'
import disablePrismicImageOptimizations from './disablePrismicImageOptimizations'

export interface ImageInfo extends StaticImageData {
  alt?: string
}

function convertPrismicImage(image: FilledImageFieldImage): ImageInfo
function convertPrismicImage(image: ImageField): ImageInfo | undefined
function convertPrismicImage(image: ImageField): ImageInfo | undefined {
  if (!image.url) {
    return undefined
  }

  return {
    src: disablePrismicImageOptimizations(image.url),
    alt: image.alt ?? undefined,
    width: image.dimensions.width,
    height: image.dimensions.height,
  }
}

export default convertPrismicImage
