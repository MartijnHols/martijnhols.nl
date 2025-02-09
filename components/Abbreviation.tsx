import styled from '@emotion/styled'
import { HTMLAttributes, ReactNode } from 'react'
import Tooltip from './Tooltip'

const Container = styled.abbr`
  font-style: italic;
  text-decoration: underline wavy var(--black);
  text-decoration-skip-ink: none;
  cursor: help;

  .inverted & {
    text-decoration-color: var(--white);
  }
`

interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'title'> {
  children: ReactNode
  annotation: string
}

const Abbreviation = ({ children, annotation, ...others }: Props) => (
  <Tooltip content={annotation}>
    {({ state, props }) => (
      <Container
        // Remove the title if the tooltip is open so users don't see the same
        // content twice
        title={state.isOpen ? undefined : annotation}
        {...props}
        {...others}
      >
        {children}
      </Container>
    )}
  </Tooltip>
)

export default Abbreviation
