import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'

const Container = styled('span', {
  shouldForwardProp: (prop) => prop !== 'inline',
})<{ inline?: boolean }>(({ inline = false }) => [
  css`
    font-size: 0;
    line-height: 0;
    opacity: 0;
    overflow: hidden;
    // Essential or the element can't be copied (at least in Chrome).
    width: 1px;
    height: 1px;
    padding: 0;
    pointer-events: none;
    clip: rect(0, 0, 0, 0);
    border-width: 0;

    @media print {
      display: none;
    }
  `,
  !inline &&
    css`
      // Inline text needs to not have position: absolute or it will affect text
      // selection when double clicking a paragraph.
      // Default to non-inline to avoid possible issues with copy-paste text
      // affecting the layout (e.g. a <CopyPasteOnly><br/></CopyPasteOnly>).
      position: absolute;
      top: 0;
      left: 0;
      // Inline text can't have a negative margin or it will affect the text
      // spacing.
      margin: -1px;
    `,
])

interface Props {
  children: ReactNode
  inline?: boolean
}

/**
 * This component can be used to add invisible text that will only appear when
 * the page is copy-pasted.
 *
 * My main reason is to make my own life easier, copy-pasting this into tools
 * like grammarly and ChatGPT when I am reviewing. An added benefit is that it
 * will copy-paste better for people discussing it as well.
 */
const CopyPasteOnly = ({ children, inline }: Props) => (
  <Container aria-hidden inline={inline}>
    {children}
  </Container>
)

export default CopyPasteOnly
