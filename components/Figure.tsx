import styled from '@emotion/styled'
import { ComponentProps, ReactNode } from 'react'
import { colors } from '../theme'
import CopyPasteOnly from './CopyPasteOnly'
import Link from './Link'

const StyledFigure = styled.figure`
  text-align: center;
  // vertical equal to paragraph margin, for horizontal the article padding will
  // take care of it
  margin: 1em 0;

  img {
    border: 7px solid black;
    box-shadow: -7px 7px 0 0px ${colors.yellow};
    margin-bottom: 7px;
    transition: all 120ms ease-out;

    :hover {
      box-shadow: -11px 11px 0 0px ${colors.yellow};
      transform: translate(4px, -4px);
    }
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
