import styled from '@emotion/styled'
import { ReactNode } from 'react'

const Container = styled.div`
  min-height: 100vh;
`

interface Props {
  children: ReactNode
}

const PageWrapper = ({ children, ...others }: Props) => (
  <Container {...others}>{children}</Container>
)

export default PageWrapper
