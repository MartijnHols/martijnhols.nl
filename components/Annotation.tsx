import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { HTMLAttributes, ReactNode } from 'react'

import Tooltip from './Tooltip'

const Container = styled.span(
  ({ theme }) => css`
    font-style: italic;
    border-bottom: 1px dashed ${theme.colors.black};
    cursor: help;
    // cancel out attr default styling
    text-decoration: none;
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
