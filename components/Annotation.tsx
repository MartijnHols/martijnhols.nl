import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { HTMLAttributes, ReactNode } from 'react'

import Tooltip from './Tooltip'

const Container = styled.span(
  ({ theme }) => css`
    font-style: italic;
    text-decoration: underline wavy ${theme.colors.black};
    text-decoration-skip-ink: none;
    cursor: help;
  `,
)

interface Props extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  annotation: string
}

const Annotation = ({ children, annotation, ...others }: Props) => (
  <Tooltip content={annotation}>
    <Container {...others}>{children}</Container>
  </Tooltip>
)

export default Annotation
