import { ImageField, FilledImageFieldImage } from "@prismicio/types";
import { StaticImageData } from "next/image";

import disablePrismicImageOptimizations from "./disablePrismicImageOptimizations";

interface ImageInfo {
  src: StaticImageData;
  alt?: string;
  width: number
  height: number
}

function convertPrismicImage(image: FilledImageFieldImage): ImageInfo;
function convertPrismicImage(image: ImageField): ImageInfo | undefined;
function convertPrismicImage(image: ImageField): ImageInfo | undefined {
  if (!image.url) {
    return undefined;
  }

  return {
    src: {
      src: disablePrismicImageOptimizations(image.url),
      width: image.dimensions.width,
      height: image.dimensions.height,
    },
    alt: image.alt ?? undefined,
    width: image.dimensions.width,
    height: image.dimensions.height,
  };
}

export default convertPrismicImage;
