import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'

const Container = styled.div`
  min-height: 100vh;
  background: var(--white);
`

interface Props {
  children: ReactNode
}

const PageWrapper = ({ children, ...others }: Props) => (
  <>
    <Container {...others}>{children}</Container>
    <Global
      styles={css`
        body {
          // The body is made black since the top and bottom bars are black,
          // this ensures overpulling has the same bg as the bars. The
          // Container changes it back to white, so it actually looks white.
          background: var(--black);
        }
      `}
    />
  </>
)

export default PageWrapper
