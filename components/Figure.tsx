import styled from '@emotion/styled'
import { ComponentProps, ReactNode } from 'react'
import CopyPasteOnly from './CopyPasteOnly'
import Link from './Link'

const StyledFigure = styled.figure`
  text-align: center;
`
const FigCaption = styled.figcaption`
  font-size: 14px;
`

interface Props extends Omit<ComponentProps<typeof Link>, 'className'> {
  caption: ReactNode
  captionLink?: boolean
  href: string
  /** An Image */
  children: ReactNode
  className?: string
}

const Figure = ({
  children,
  caption,
  captionLink = true,
  href,
  className,
  ...others
}: Props) => (
  <StyledFigure className={className}>
    <span style={{ fontSize: 0 }}>Picture:&nbsp;</span>
    <Link href={href} className="plain" {...others}>
      {children}
    </Link>
    <FigCaption>
      <CopyPasteOnly>Caption:&nbsp;</CopyPasteOnly>
      {captionLink ? (
        <Link href={href} {...others}>
          {caption}
        </Link>
      ) : (
        caption
      )}
      <CopyPasteOnly>
        <br />
        <br />
      </CopyPasteOnly>
    </FigCaption>
  </StyledFigure>
)

export default Figure
