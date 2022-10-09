import { css } from '@emotion/react'

import { colors } from '.'

export const globalStyles = css`
  a:not(.plain) {
    color: ${colors.black};
    text-decoration: none;
    border-bottom: 3px solid currentColor;

    position: relative;
    z-index: 1;
    --transition-duration: 120ms;
    transition: all var(--transition-duration) ease-out;
    // This is a bummer, but it's the easiest way to workaround broken
    // transition for wrapping links. Let's not make long links.
    white-space: nowrap;

    ::after {
      content: '';
      position: absolute;
      left: -2px;
      right: -2px;
      top: -2px;
      bottom: -2px;
      z-index: -1;
      background: ${colors.black};
      transform: scaleY(0);
      transition: transform var(--transition-duration) ease-out;
      transform-origin: bottom;
    }

    :hover {
      color: ${colors.yellow};
      border-bottom-width: 0;

      ::after {
        transform: scaleY(1);
      }
    }
  }
  a.plain {
    text-decoration: none;
  }

  .inverted {
    a {
      color: ${colors.yellow};

      ::after {
        background: ${colors.yellow};
      }

      :hover {
        color: ${colors.black};
      }
    }
  }
`
