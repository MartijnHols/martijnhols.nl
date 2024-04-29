import { css } from '@emotion/react'
import { colors } from '.'

export const globalStyles = css`
  a:not(.plain) {
    --link-color: ${colors.black};
    color: var(--link-color);
    text-decoration: none;
    border-bottom: 3px solid var(--link-color);
    transition: all 120ms ease-out;
    // It is not possible to animate a linear-gradient (yet), so we need to do
    // some background-positioning trickery to get the effect we want.
    background-image: linear-gradient(
      0deg,
      var(--link-color) 50%,
      transparent 50%
    );
    background-size: 100% 200%;
    background-position-y: 0px;

    :hover {
      color: ${colors.white};
      background-position-y: 100%;
    }
  }
  a.plain {
    text-decoration: none;
  }

  .inverted {
    a {
      --link-color: ${colors.white};

      :hover {
        color: ${colors.black};
      }
    }
  }
`
