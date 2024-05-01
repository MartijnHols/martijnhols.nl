import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Container = styled.div(
  ({ theme }) => css`
    margin: 0 auto;
    width: 100%;
    max-width: 81.25em;
    padding-left: 0.8em;
    padding-right: 0.8em;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      padding-left: ${theme.spacing.x6}px;
      padding-right: ${theme.spacing.x6}px;
    }
    @media (min-width: ${theme.breakpoints.DESKTOP}px) {
      padding-left: ${theme.spacing.x10}px;
      padding-right: ${theme.spacing.x10}px;
    }
  `,
)

export default Container
