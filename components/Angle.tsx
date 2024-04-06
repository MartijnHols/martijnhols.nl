import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Angle = styled('div', {
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

export default Angle
