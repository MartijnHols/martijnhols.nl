import { css } from '@emotion/react'
import { colors } from '.'

export const globalStyles = css`
  a:not(.plain) {
    color: ${colors.black};
    text-decoration: none;
    border-bottom: 3px solid ${colors.black};
    transition: all 120ms ease-out;
    // It is not possible to animate a linear-gradient (yet), so we need to do
    // some background-positioning trickery to get the effect we want.
    background-image: linear-gradient(
      0deg,
      ${colors.black} 50%,
      transparent 50%
    );
    background-size: 100% 200%;
    background-position-y: 0px;

    :hover {
      color: ${colors.yellow};
      background-position-y: 100%;
    }
  }
  a.plain {
    text-decoration: none;
  }

  .inverted {
    a {
      color: ${colors.yellow};
      border-bottom-color: ${colors.yellow};
      background-image: linear-gradient(
        0deg,
        ${colors.yellow} 50%,
        transparent 50%
      );

      :hover {
        color: ${colors.black};
      }
    }
  }
`
