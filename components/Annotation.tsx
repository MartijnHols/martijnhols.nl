import styled from '@emotion/styled'
import { HTMLAttributes, ReactNode } from 'react'
import Tooltip from './Tooltip'

const StyledTooltip = styled(Tooltip)`
  font-style: italic;
  text-decoration: underline wavy var(--black);
  text-decoration-skip-ink: none;
  cursor: help;

  .inverted & {
    text-decoration-color: var(--white);
  }
`

interface Props
  extends Omit<
    HTMLAttributes<HTMLSpanElement>,
    'role' | 'children' | 'content'
  > {
  children: ReactNode
  annotation: ReactNode
}

const Annotation = ({ children, annotation, ...others }: Props) => (
  <StyledTooltip content={annotation} {...others}>
    {children}
  </StyledTooltip>
)

export default Annotation
