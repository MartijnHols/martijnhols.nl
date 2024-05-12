import styled from '@emotion/styled'
import { ReactNode } from 'react'

const Container = styled.div`
  padding: 0.75em;
  border: 1px solid black;
  text-align: center;
  --horizontal-gap: 0.25em;
  --vertical-gap: 0.5em;
`

interface Props {
  children: ReactNode
  className?: string
}

const NodeTree = ({ children, ...others }: Props) => (
  <Container {...others}>{children}</Container>
)

export default NodeTree
