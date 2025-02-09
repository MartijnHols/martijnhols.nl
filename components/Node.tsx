import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode, forwardRef } from 'react'

type Variant = 'root' | 'new' | 'highlight'

const Container = styled.button`
  display: inline-block;
  padding: 0.25em 0.5em;
  border: 1px solid black;
  position: relative;
`
const rootCss = css`
  background: #ccc;
`
const newCss = css`
  background: #79e576;
`
const highlightCss = css`
  background: var(--yellow);
`
interface Props {
  children: ReactNode
  variant?: Variant
  className?: string
}

// eslint-disable-next-line react/display-name
const Node = forwardRef<HTMLButtonElement, Props>(
  ({ children, variant, ...others }, ref) => (
    <Container
      type="button"
      css={[
        variant === 'root' && rootCss,
        variant === 'new' && newCss,
        variant === 'highlight' && highlightCss,
      ]}
      ref={ref}
      {...others}
    >
      {children}
    </Container>
  ),
)

export default Node
