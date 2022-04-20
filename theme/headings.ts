import { css } from '@emotion/react'

import { fontSizes, spacing } from '.'

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
    margin-bottom: ${spacing.x2}px;
    font-size: ${fontSizes.h1}px;
  }
  h2 {
    margin-bottom: ${spacing.x2}px;
    font-size: ${fontSizes.h2}px;
  }
  h3 {
    margin-bottom: ${spacing.x1}px;
    font-size: ${fontSizes.h3}px;
  }
  h4 {
    margin-bottom: ${spacing.x1}px;
    font-size: ${fontSizes.h4}px;
  }
  h5 {
    margin-bottom: ${spacing.x1}px;
    font-size: ${fontSizes.h5}px;
  }
  h6 {
    margin-bottom: ${spacing.x1}px;
    font-size: ${fontSizes.h6}px;
  }
`
