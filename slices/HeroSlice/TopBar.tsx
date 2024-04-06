import { css } from '@emotion/react'
import styled from '@emotion/styled'

import AngleWithContaintButton from '../../components/AngleWithContaintButton'
import LanguageSwitcher from '../../components/LanguageSwitcher'

const StyledAngle = styled(AngleWithContaintButton)``
const Sticky = styled.div(
  ({ theme }) => css`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: ${theme.zIndex.topBar};

    ${StyledAngle} {
      pointer-events: none;
    }
  `,
)
const Container = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.black};
    color: ${theme.colors.yellow};
    height: 1em;
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
    // Resize at the same rate as Angle so it fits perfectly
    padding: calc(5px + 100vw / 2000 * 6) 7px 0 calc(7px + 100vw / 2000 * 7);
    font-size: calc(10px + 100vw / 2000 * 12);
    font-weight: 500;
    transform: rotate(-1.15deg);
    transform-origin: left;
  `,
)

interface Props {
  showLanguageSwitcher?: boolean
}

const TopBar = ({ showLanguageSwitcher = false }: Props) => (
  <Sticky>
    <Container className="inverted">
      <Content>{showLanguageSwitcher && <LanguageSwitcher />}</Content>
    </Container>

    <StyledAngle />
  </Sticky>
)

export default TopBar
