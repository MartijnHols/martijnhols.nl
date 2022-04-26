/**
 * Prismic automatically applies image optimizations flags (for Imgix) to images
 * served through its documents. These optimizations reduce the quality of
 * images, while we already have our own image optimizer (through next.js).
 */
const disablePrismicImageOptimizations = (prismicCdnUrl: string) => {
  const imageUrl = new URL(prismicCdnUrl)
  // Remove the `auto` flag to disable Prismic's (Imgix) optimizations. This
  // improves image quality as applying optimizations twice is ineffective.
  // See https://community.prismic.io/t/image-optimization-service-faq/5426
  imageUrl.searchParams.delete('auto')
  // The next/image component takes care of the correct width/heights for each
  // image and may even use srcSet to scale higher for retina images etc. Remove
  // Prismic's restraints to get the highest possible base image quality.
  imageUrl.searchParams.delete('w')
  imageUrl.searchParams.delete('h')
  // We do want to maintain `rect` since the CDN editor may have selected a
  // specific part of an image to show, instead of the whole image.

  return imageUrl.toString()
}

export default disablePrismicImageOptimizations
