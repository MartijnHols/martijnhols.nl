import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { colors } from '../theme'
import ContactButton from './ContactButton'

// This fixes a rendering bug in Chrome where an invisible line appears when the content is scaled
export const clipPathBorderFix = css`
  margin-bottom: -0.5px;
  margin-top: -0.5px;
`

const Container = styled.div`
  position: relative;
`
const TopAngle = styled('div', {
  shouldForwardProp: (prop) => prop !== 'inverted',
})<{ inverted?: boolean }>(
  ({ inverted }) => css`
    position: absolute;
    width: 100%;
    height: calc(10px + 100vw / 2000 * 30);
    clip-path: polygon(0 0, 100% 0, 0 100%);
    background: ${inverted ? colors.dominant : colors.complementary};
    ${clipPathBorderFix}
  `,
)
const BottomAngle = styled('div', {
  shouldForwardProp: (prop) => prop !== 'inverted',
})<{ inverted?: boolean }>(
  ({ inverted }) => css`
    height: calc(10px + 100vw / 2000 * 30);
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
    background: ${inverted ? colors.complementary : colors.dominant};
    ${clipPathBorderFix}
  `,
)

interface Props {
  inverted?: boolean
}

const Angle = ({ inverted }: Props) => (
  <Container>
    <TopAngle inverted={inverted}>
      <ContactButton inverted={!inverted} aria-hidden tabIndex={-1} />
    </TopAngle>
    <BottomAngle inverted={inverted}>
      <ContactButton inverted={inverted} aria-hidden tabIndex={-1} />
    </BottomAngle>
  </Container>
)

export default Angle
