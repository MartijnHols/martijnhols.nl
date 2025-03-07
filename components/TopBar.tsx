import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { breakpoints } from '../theme'
import AngleBottom from './AngleBottom'

const Sticky = styled.div`
  @media print {
    display: none;
  }
`

const StyledAngle = styled(AngleBottom)`
  pointer-events: none;
`
const Container = styled.div`
  background: var(--black);
  color: var(--white);

  --font-size: 1rem;
  // Resize everything at the same rate as Angle so it fits perfectly
  --font-size: calc(12px + 100vw / 2000 * 11);
  --line-height: calc(var(--font-size) + 14px + 100vw / 2000 * 20);
  height: calc(var(--line-height) - var(--angle-height));

  a {
    --link-color: var(--white);
  }
`
const Content = styled.div`
  position: relative;
  z-index: 1;
  // Fallbacks
  padding: 6px 7px 0 8px;
  padding: 0 calc(7px + 100vw / 2000 * 7);
  font-size: var(--font-size);
  line-height: calc(var(--line-height));
  font-weight: 500;
  transform: rotate(-2deg);
  transform-origin: left;

  a:not(.plain) {
    // max-width! on mobile the font-size gets quite small, and so it needs
    // an override
    @media (max-width: ${breakpoints.TABLET}px) {
      border-bottom-width: 2px;
    }
  }

  @media (min-width: ${breakpoints.TABLET}px) {
    transform: rotate(-1.15deg);
  }
`

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
