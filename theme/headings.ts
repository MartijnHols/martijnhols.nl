import { css } from '@emotion/react'
import { breakpoints, spacing } from '.'

export const h1 = css`
  font-size: 3.5em;
  font-weight: 1000;
  margin-bottom: ${spacing.x6}px;
  line-height: 1.1;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 5em;
  }
  @media (min-width: ${breakpoints.DESKTOP}px) {
    font-size: 6.25em;
  }
`
export const h2 = css`
  font-size: 2.2em;
  line-height: 1.2;
  padding-top: 0.1em;
  border-top: 0.16em solid currentColor;
  display: inline-block;
  font-weight: 800;
  margin-top: 0.5em;
  margin-bottom: 0; // inline-block doesn't margin-collapse, so the next element will have to take care of it

  @media (min-width: ${breakpoints.DESKTOP}px) {
    font-size: 2.5em;
  }
`
export const h3 = css`
  font-size: 1.875em;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.3px;
  margin-top: ${spacing.x4}px;
  margin-bottom: 0;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 2em;
  }
`
export const h4 = css`
  font-size: 1.25em;
  margin-bottom: ${spacing.x2}px;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 1.375em;
  }
  @media (min-width: ${breakpoints.DESKTOP}px) {
    font-size: 1.875em;
  }
`
export const h5 = css`
  font-size: 1.125em;
  margin-bottom: ${spacing.x1}px;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 1.25em;
  }
  @media (min-width: ${breakpoints.DESKTOP}px) {
    font-size: 1.5em;
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
