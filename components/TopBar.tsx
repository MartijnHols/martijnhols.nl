import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'
import Angle from './Angle'
const Sticky = styled.div(
  ({ theme }) => css`
    position: sticky;
    top: 0;
    width: 100%;
    z-index: ${theme.zIndex.topBar};

    ${StyledAngle} {
      pointer-events: none;
    }
  `,
)

const StyledAngle = styled(Angle)`
  pointer-events: none;
`
const Container = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.black};
    color: ${theme.colors.yellow};

    --font-size: 14px;
    // Resize everything at the same rate as Angle so it fits perfectly
    --font-size: calc(12px + 100vw / 2000 * 11);
    --line-height: calc(var(--font-size) + 14px + 100vw / 2000 * 20);
    height: calc(var(--line-height) - var(--angle-height));
  `,
)
const Content = styled.div(
  ({ theme }) => css`
    position: relative;
    z-index: 1;
    color: ${theme.colors.yellow};
    // Fallbacks
    padding: 6px 7px 0 8px;
    font-size: 14px;
    padding: 0 calc(7px + 100vw / 2000 * 7);
    font-size: var(--font-size);
    line-height: calc(var(--line-height));
    font-weight: 500;
    transform: rotate(-2deg);
    transform-origin: left;

    a:not(.plain) {
      // max-width! on mobile the font-size gets quite small, and so it needs
      // an override
      @media (max-width: ${theme.breakpoints.TABLET}px) {
        border-bottom-width: 2px;
      }
    }

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      transform: rotate(-1.15deg);
    }
  `,
)

interface Props {
  children?: ReactNode
}

const TopBar = ({ children }: Props) => (
  <Sticky>
    <Container className="inverted">
      <Content>{children}</Content>
    </Container>

    <StyledAngle />
  </Sticky>
)

export default TopBar
