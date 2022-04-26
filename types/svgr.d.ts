declare module '*.svg' {
  import { FC, SVGProps } from 'react'

  // Make aria-label required
  type IconProps = SVGProps<SVGSVGElement> & {
    /**
     * An accessible version of the image in case the image is substantional to
     * the meaning of the interface element. If the image is merely visible,
     * provide an empty string instead.
     */
    'aria-label': SVGProps<SVGSVGElement>['aria-label']
  }

  const content: FC<IconProps>

  export default content
}
