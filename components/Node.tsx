import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ComponentProps } from 'react'

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
interface Props extends ComponentProps<typeof Container> {
  variant?: Variant
}

const Node = ({ children, variant, ...others }: Props) => (
  <Container
    type="button"
    css={[
      variant === 'root' && rootCss,
      variant === 'new' && newCss,
      variant === 'highlight' && highlightCss,
    ]}
    {...others}
  >
    {children}
  </Container>
)

export default Node
