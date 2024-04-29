import { css } from '@emotion/react'
import { breakpoints, colors, spacing } from '.'

export const h1 = css`
  font-size: 56px;
  font-weight: 1000;
  text-transform: uppercase;
  margin-bottom: ${spacing.x6}px;
  line-height: 1.1;
  transform: rotate(-1deg);
  text-shadow: -4px 4px ${colors.yellow};
  text-shadow:
    -1px 1px 0 ${colors.yellow},
    -2px 2px 0 ${colors.yellow},
    -3px 3px 0 ${colors.yellow},
    -4px 4px 0 ${colors.yellow};

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 80px;
    text-shadow: -7px 7px ${colors.yellow};
    // It doesn't fit the theme, but stretching it makes the text more readable
    text-shadow:
      -1px 1px 0 ${colors.yellow},
      -2px 2px 0 ${colors.yellow},
      -3px 3px 0 ${colors.yellow},
      -4px 4px 0 ${colors.yellow},
      -5px 5px 0 ${colors.yellow},
      -6px 6px 0 ${colors.yellow},
      -7px 7px 0 ${colors.yellow};
  }
  @media (min-width: ${breakpoints.DESKTOP}px) {
    font-size: 100px;
  }
`
export const h2 = css`
  font-size: 40px;
  line-height: 1.3;
  text-transform: uppercase;
  border-top: ${spacing.x2}px solid currentColor;
  display: inline-block;
  text-transform: uppercase;
  font-weight: 800;
  margin-top: ${spacing.x5}px;
  margin-bottom: ${spacing.x1}px; // the rotation also adds some margin
  transform: rotate(-1deg);

  /* border-top: none;
  --distance: 4px;
  text-shadow: calc(var(--distance) * -1) var(--distance) ${colors.yellow};
  position: relative;
  ::before {
    content: '';
    position: absolute;
    top: -${spacing.x2}px;
    left: 0;
    width: 100%;
    height: ${spacing.x2}px;
    background: currentColor;
    box-shadow: calc(var(--distance) * -1) var(--distance) 0 0 ${colors.yellow};
  } */

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 54px;
  }
`
export const h3 = css`
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.3px;
  margin-top: ${spacing.x4}px;
  margin-bottom: ${spacing.x2}px;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 36px;
  }
  @media (min-width: ${breakpoints.DESKTOP}px) {
    font-size: 40px;
  }
`
export const h4 = css`
  font-size: 20px;
  margin-bottom: ${spacing.x2}px;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 22px;
  }
  @media (min-width: ${breakpoints.DESKTOP}px) {
    font-size: 30px;
  }
`
export const h5 = css`
  font-size: 18px;
  margin-bottom: ${spacing.x1}px;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 20px;
  }
  @media (min-width: ${breakpoints.DESKTOP}px) {
    font-size: 24px;
  }
`

export const globalStyles = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    break-after: avoid;
  }
  h1 {
    ${h1}
  }
  h2 {
    ${h2}
  }
  h3 {
    ${h3}
  }
  h4 {
    ${h4}
  }
  h5 {
    ${h5}
  }
`
