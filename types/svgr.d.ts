declare module '*.svg' {
  import { FC, SVGProps } from 'react'

  // Make aria-hidden required
  type IconProps = SVGProps<SVGSVGElement> & {
    /**
     * Describe the interactive element with an aria-label if the icon doesn't
     * have a (sufficiently describing) label.
     */
    'aria-hidden': true
  }

  const content: FC<IconProps>

  export default content
}
declare module '*.svg?url' {
  import { StaticImageData } from 'next/image'

  const content: StaticImageData

  export default content
}
