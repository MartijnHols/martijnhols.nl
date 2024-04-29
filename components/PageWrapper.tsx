import { css } from '@emotion/react'
import styled from '@emotion/styled'

const PageWrapper = styled.div(
  ({ theme }) => css`
    min-height: 100vh;
    background: ${theme.colors.white};
  `,
)

export default PageWrapper
