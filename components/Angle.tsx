import { css } from '@emotion/react'
import styled from '@emotion/styled'

import ContactButtonGlobalHover from './ContactButtonGlobalHover'

const Container = styled('div', {
  shouldForwardProp: (prop) => prop !== 'inverted',
})<{ inverted?: boolean }>(
  ({ theme, inverted }) => css`
    position: relative;
    height: calc(10px + 100vw / 2000 * 30);
    background: linear-gradient(
      to bottom right,
      /* We need some margin to prevent a jagged edge */
        ${inverted ? 'transparent' : theme.colors.black} 49.5%,
      ${inverted ? theme.colors.black : 'transparent'} 50.5%
    );
  `,
)
const TopAngle = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: calc(10px + 100vw / 2000 * 30);
  clip-path: polygon(0 0, 100% 0, 0 100%);
`
const BottomAngle = styled(TopAngle)`
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
`

interface Props {
  inverted?: boolean
}

const Angle = ({ inverted, ...others }: Props) => (
  <Container inverted={inverted} {...others}>
    <TopAngle>
      <ContactButtonGlobalHover
        inverted={!inverted}
        aria-hidden
        tabIndex={-1}
      />
    </TopAngle>
    <BottomAngle>
      <ContactButtonGlobalHover inverted={inverted} aria-hidden tabIndex={-1} />
    </BottomAngle>
  </Container>
)

export default Angle
