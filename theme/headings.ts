import { css } from '@emotion/react'

import { breakpoints, spacing } from '.'

export const h1 = css`
  font-size: 60px;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 80px;
  }
  @media (min-width: ${breakpoints.DESKTOP}px) {
    font-size: 100px;
  }
  @media (min-width: ${breakpoints.DESKTOP_LARGE}px) {
    font-size: 120px;
  }
`
export const h2 = css`
  font-size: 45px;
  line-height: 1.3;
  font-weight: 800;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 54px;
  }
`
export const h3 = css`
  font-size: 30px;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 36px;
  }
  @media (min-width: ${breakpoints.DESKTOP}px) {
    font-size: 40px;
  }
`
export const h4 = css`
  font-size: 20px;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 22px;
  }
  @media (min-width: ${breakpoints.DESKTOP}px) {
    font-size: 30px;
  }
`
export const h5 = css`
  font-size: 18px;

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
    margin-bottom: ${spacing.x6}px;
    ${h1}
  }
  h2 {
    margin-top: ${spacing.x4}px;
    margin-bottom: ${spacing.x2}px;
    ${h2}
  }
  h3 {
    margin-bottom: ${spacing.x3}px;
    ${h3}
  }
  h4 {
    margin-bottom: ${spacing.x2}px;
    ${h4}
  }
  h5 {
    margin-bottom: ${spacing.x1}px;
    ${h5}
  }
`
