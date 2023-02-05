import { css } from '@emotion/react'

import { breakpoints, spacing } from '.'

export const h1 = css`
  font-size: 120px;

  @media (max-width: ${breakpoints.DESKTOP_MAX}px) {
    font-size: 100px;
  }
  @media (max-width: ${breakpoints.TABLET_MAX}px) {
    font-size: 80px;
  }
  @media (max-width: ${breakpoints.MOBILE_MAX}px) {
    font-size: 60px;
  }
`
export const h2 = css`
  font-size: 60px;
  line-height: 1.3;
  font-weight: 800;

  @media (max-width: ${breakpoints.MOBILE_MAX}px) {
    font-size: 45px;
  }
`
export const h3 = css`
  font-size: 40px;

  @media (max-width: ${breakpoints.TABLET_MAX}px) {
    font-size: 36px;
  }
  @media (max-width: ${breakpoints.MOBILE_MAX}px) {
    font-size: 30px;
  }
`
export const h4 = css`
  font-size: 30px;

  @media (max-width: ${breakpoints.TABLET_MAX}px) {
    font-size: 22px;
  }
  @media (max-width: ${breakpoints.MOBILE_MAX}px) {
    font-size: 20px;
  }
`
export const h5 = css`
  font-size: 24px;

  @media (max-width: ${breakpoints.TABLET_MAX}px) {
    font-size: 20px;
  }
  @media (max-width: ${breakpoints.MOBILE_MAX}px) {
    font-size: 18px;
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
  }
  h1 {
    margin-bottom: ${spacing.x6}px;
    ${h1}
  }
  h2 {
    margin-top: ${spacing.x8}px;
    margin-bottom: ${spacing.x4}px;
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
