import styled from '@emotion/styled'
import { ComponentProps, ReactNode } from 'react'
import CopyPasteOnly from './CopyPasteOnly'
import Link from './Link'

const StyledFigure = styled.figure`
  text-align: center;
  // vertical equal to paragraph margin, for horizontal the article padding will
  // take care of it
  margin: 1.5em 0;
`
const ImageLink = styled(Link)`
  > img {
    display: inline-block;
    border: 7px solid var(--black);
    box-shadow: calc(var(--box-shadow-distance) * -1) var(--box-shadow-distance)
      0 0 var(--yellow);
    margin-bottom: 9px;
    transition: all 120ms ease-out;
  }

  :hover > img {
    box-shadow: -11px 11px 0 0px var(--yellow);
    transform: translate(4px, -4px);
  }
`
const FigCaption = styled.figcaption`
  font-size: 90%;
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
    <CopyPasteOnly>Picture:&nbsp;</CopyPasteOnly>
    <ImageLink href={href} className="plain" {...others}>
      {children}
    </ImageLink>
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
