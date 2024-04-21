import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { HTMLAttributes, ReactNode } from 'react'

import Tooltip from './Tooltip'

const Container = styled.abbr(
  ({ theme }) => css`
    font-style: italic;
    text-decoration: underline wavy ${theme.colors.black};
    text-decoration-skip-ink: none;
    cursor: help;
  `,
)

interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'title'> {
  children: ReactNode
  annotation: string
}

const Abbreviation = ({ children, annotation, ...others }: Props) => (
  <Tooltip content={annotation}>
    {(props) => (
      <Container
        // Remove the title if the tooltip is open so users don't see the same
        // content twice
        title={props['aria-expanded'] ? undefined : annotation}
        {...props}
        {...others}
      >
        {children}
      </Container>
    )}
  </Tooltip>
)

export default Abbreviation
