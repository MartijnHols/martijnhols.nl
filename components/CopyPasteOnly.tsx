import styled from '@emotion/styled'
import { ReactNode } from 'react'

const Container = styled.span`
  font-size: 0;
  line-height: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  pointer-events: none;
  clip: rect(0, 0, 0, 0);
  border-width: 0;

  @media print {
    display: none;
  }
`

interface Props {
  children: ReactNode
}

/**
 * This component can be used to add invisible text that will only appear when
 * the page is copy-pasted.
 *
 * My main reason is to make my own life easier, copy-pasting this into tools
 * like grammarly and ChatGPT when I am reviewing. An added benefit is that it
 * will copy-paste better for people discussion it as well.
 */
const CopyPasteOnly = ({ children }: Props) => (
  <Container aria-hidden>{children}</Container>
)

export default CopyPasteOnly
