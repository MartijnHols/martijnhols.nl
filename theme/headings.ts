import { css } from '@emotion/react'
import { breakpoints } from '.'

export const h1 = css`
  font-size: 3.5em;
  font-weight: 1000;
  margin-bottom: var(--spacing6);
  line-height: 1.1;
  text-decoration: underline var(--yellow);

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 5em;
  }
  @media (min-width: ${breakpoints.DESKTOP}px) {
    font-size: 6.25em;
  }
`
export const h2 = css`
  font-size: 2.25em;
  line-height: 1.5;
  display: inline-block;
  font-weight: 800;
  margin-top: 1.5em;
  margin-bottom: 0; // inline-block doesn't margin-collapse, so the next element will have to take care of it

  ::before {
    content: '';
    width: 120px;
    background: var(--yellow);
    height: 9px;
    transform: skew(-45deg);
    margin-left: 5px;
    display: block;
    margin-bottom: 0.25em;
  }

  @media (min-width: ${breakpoints.DESKTOP}px) {
    font-size: 2.5em;
  }
`
export const h3 = css`
  font-size: 1.75em;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.3px;
  margin-top: 1.5em;
  margin-bottom: 0;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 1.75em;
  }
`
export const h4 = css`
  font-size: 1.1em;
  margin-bottom: -1em;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 1.25em;
  }
`
export const h5 = css`
  font-size: 1em;
  margin-bottom: -1em;
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
