import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { ComponentProps, ReactNode } from 'react'
import iPhone15OverlayImage from './assets/iphone-15-overlay.png'

const Container = styled.div(
  ({ theme }) => css`
    position: relative;
    display: inline-block;
    filter: drop-shadow(
      calc(var(--box-shadow-distance) * -1) var(--box-shadow-distance) 0
        ${theme.colors.yellow}
    );
  `,
)
const OverlayImage = styled(Image)`
  position: relative;
  z-index: 1;
  pointer-events: none;
`
const ScreenImageContainer = styled.div`
  position: absolute;
  left: 7.75%;
  right: 7.75%;
  top: 3.5%;

  > img {
    border-radius: 32px;
    width: 100%;
  }
`

interface Props extends ComponentProps<typeof Container> {
  children: ReactNode
  width: number
}

const Iphone15Overlay = ({ children, width, ...others }: Props) => (
  <Container {...others}>
    <OverlayImage src={iPhone15OverlayImage} alt="" width={width} />
    <ScreenImageContainer>{children}</ScreenImageContainer>
  </Container>
)

export default Iphone15Overlay
