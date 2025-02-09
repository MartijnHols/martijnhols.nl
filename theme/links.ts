import { css } from '@emotion/react'

export const globalStyles = css`
  a:not(.plain) {
    --link-color: var(--black);
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
      color: var(--white);
      background-position-y: 100%;
    }
  }
  a.plain {
    text-decoration: none;
  }

  .inverted {
    a {
      --link-color: var(--white);

      :hover {
        color: var(--black);
      }
    }
  }
`
