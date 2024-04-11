import { css } from '@emotion/react'

import { breakpoints, spacing } from '.'

export const h1 = css`
  font-size: 56px;
  font-weight: 1000;
  text-transform: uppercase;
  margin-bottom: ${spacing.x6}px;
  line-height: 1.1;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 80px;
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
