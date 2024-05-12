import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode, forwardRef } from 'react'

type Variant = 'root' | 'new' | 'highlight'

const Container = styled('button', {
  shouldForwardProp: (prop) => prop !== 'variant',
})<{ variant?: Variant }>(({ theme, variant }) => [
  css`
    display: inline-block;
    padding: 0.25em 0.5em;
    border: 1px solid black;
    position: relative;
  `,
  variant === 'root' &&
    css`
      background: #ccc;
    `,
  variant === 'new' &&
    css`
      background: #79e576;
    `,
  variant === 'highlight' &&
    css`
      background: ${theme.colors.yellow};
    `,
])

interface Props {
  children: ReactNode
  variant?: Variant
  className?: string
}

// eslint-disable-next-line react/display-name
const Node = forwardRef<HTMLButtonElement, Props>(
  ({ children, variant, ...others }, ref) => (
    <Container type="button" variant={variant} ref={ref} {...others}>
      {children}
    </Container>
  ),
)

export default Node
