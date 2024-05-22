import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'

const Container = styled('div', {
  shouldForwardProp: (prop) => prop !== 'label',
})<{
  label: string
}>(
  ({ theme, label }) => css`
    border: 4px solid ${theme.colors.black};
    background: ${theme.colors.yellow50};
    padding: 1em;
    position: relative;

    ::before {
      content: '${label}';
      position: absolute;
      top: 0;
      left: 1em;
      transform: translateY(-0.65em);
      line-height: 1;
      text-shadow:
        -3px -3px 0em #fff,
        -3px 3px 0em #fff,
        3px -3px 0em #fff,
        3px 3px 0em #fff,
        -2px -2px 0em #fff,
        -2px 2px 0em #fff,
        2px -2px 0em #fff,
        2px 2px 0em #fff,
        -1px -1px 0em #fff,
        1px 1px 0em #fff;
    }
  `,
)

interface Props {
  children: ReactNode
  label?: string
}

const Reproduction = ({ children, label = 'Reproduction' }: Props) => (
  <Container label={label}>{children}</Container>
)

export default Reproduction
