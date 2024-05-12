import styled from '@emotion/styled'
import { ReactNode } from 'react'

const Container = styled.div`
  margin: var(--vertical-gap) 0;

  :last-of-type {
    margin-bottom: 0;
  }

  > * {
    ::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -100%);
      width: 1px;
      height: var(--vertical-gap);
      background: black;
    }
  }
`

interface Props {
  children: ReactNode
  className?: string
}

const NodeChildren = ({ children, ...others }: Props) => (
  <Container {...others}>{children}</Container>
)

export default NodeChildren
