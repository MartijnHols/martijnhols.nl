import { StaticImageData } from 'next/image'

export default interface ImageInfo extends StaticImageData {
  alt?: string
}
