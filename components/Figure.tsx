import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ComponentProps, ReactNode } from 'react'
import { breakpoints } from '../theme'
import CopyPasteOnly from './CopyPasteOnly'

const StyledFigure = styled.figure`
  text-align: center;
  // vertical equal to paragraph margin, for horizontal the article padding will
  // take care of it
  margin: 1.5em 0;
`
const ImageContainer = styled.div`
  > img,
  .img {
    display: inline-block;
    border: var(--spacing1) solid var(--black);
    box-shadow: calc(var(--box-shadow-distance) * -1) var(--box-shadow-distance)
      0 0 var(--yellow);
    margin-bottom: var(--box-shadow-distance);
  }
`
const FigCaption = styled.figcaption`
  font-size: 85%;
  margin-top: 0.25em;
  color: var(--black700);
`

export const floatRightTabletCss = css`
  @media (min-width: ${breakpoints.TABLET}px) {
    float: right;
    margin-left: 1em;
    margin-bottom: 1em;
  }
`

interface Props extends ComponentProps<typeof StyledFigure> {
  caption?: ReactNode
  /** An Image */
  children: ReactNode
}

const Figure = ({ children, caption, ...others }: Props) => (
  <StyledFigure {...others}>
    <CopyPasteOnly>Picture:&nbsp;</CopyPasteOnly>
    <ImageContainer>{children}</ImageContainer>
    {caption && (
      <FigCaption>
        <CopyPasteOnly>Caption:&nbsp;</CopyPasteOnly>
        {caption}
        <CopyPasteOnly>
          <br />
          <br />
        </CopyPasteOnly>
      </FigCaption>
    )}
  </StyledFigure>
)

export default Figure
