import styled from '@emotion/styled'
import { HTMLAttributes, ReactElement, ReactNode } from 'react'
import Tooltip from './Tooltip'

const StyledTooltip = styled(Tooltip)`
  font-style: italic;
  text-decoration: underline;
  // The shorthand doesn't seem to work in Safari
  text-decoration-style: wavy;
  text-decoration-color: currentColor;
  text-decoration-skip-ink: none;
  cursor: help;
`

interface Props
  extends Omit<
    HTMLAttributes<HTMLSpanElement>,
    'role' | 'children' | 'content'
  > {
  children: ReactNode
  annotation: ReactElement | string
}

const Annotation = ({ children, annotation, ...others }: Props) => (
  <StyledTooltip content={annotation} {...others}>
    {children}
  </StyledTooltip>
)

export default Annotation
