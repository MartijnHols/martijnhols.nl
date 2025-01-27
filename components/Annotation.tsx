import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { HTMLAttributes, ReactNode } from 'react'
import Tooltip from './Tooltip'

const StyledTooltip = styled(Tooltip)(
  ({ theme }) => css`
    font-style: italic;
    text-decoration: underline wavy ${theme.colors.black};
    text-decoration-skip-ink: none;
    cursor: help;

    .inverted & {
      text-decoration-color: ${theme.colors.white};
    }
  `,
)

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
