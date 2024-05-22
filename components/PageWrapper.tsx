import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'

const Container = styled.div(
  ({ theme }) => css`
    min-height: 100vh;
    background: ${theme.colors.white};
  `,
)

interface Props {
  children: ReactNode
}

const PageWrapper = ({ children, ...others }: Props) => (
  <>
    <Container {...others}>{children}</Container>
    <Global
      styles={(theme) => css`
        body {
          background: ${theme.colors.black};
        }
      `}
    />
  </>
)

export default PageWrapper
