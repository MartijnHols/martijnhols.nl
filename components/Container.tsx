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
      padding-left: var(--spacing6);
      padding-right: var(--spacing6);
    }
    @media (min-width: ${theme.breakpoints.DESKTOP}px) {
      padding-left: var(--spacing10);
      padding-right: var(--spacing10);
    }
  `,
)

export default Container
