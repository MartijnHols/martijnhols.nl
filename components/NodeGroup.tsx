import styled from '@emotion/styled'
import { ReactNode } from 'react'

const Container = styled.div`
  display: inline-flex;
  margin: 0 auto;
  gap: var(--horizontal-gap);
  padding-top: var(--vertical-gap);
  position: relative;

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

  > * {
    ::after {
      content: '';
      display: block;
      position: absolute;
      top: calc(var(--vertical-gap) * -1);
      left: calc(
        var(--horizontal-gap) * -1 - 2px
      ); // the 2px is to compensate for border-box
      right: 0;
      width: calc(100% + var(--horizontal-gap) * 2 + 4px);
      height: 1px;
      background: black;
    }
    :first-of-type::after {
      left: 50%;
      width: 50%;
    }
    :last-of-type::after {
      left: 0;
      right: 50%;
      width: 50%;
    }
  }
`

interface Props {
  children: ReactNode
  className?: string
}

const NodeGroup = ({ children, ...others }: Props) => (
  <Container {...others}>{children}</Container>
)

export default NodeGroup
