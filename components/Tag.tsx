import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Container = styled.div(
  ({ theme }) => css`
    display: inline-block;
    background: ${theme.colors.black};
    color: ${theme.colors.white};
    padding: 4px 6px;
    box-shadow: -4px 4px 0 0px ${theme.colors.yellow};
    margin-left: -2px;
    margin-bottom: 2px;

    &[data-value='open source'] {
      background: #fff;
      color: ${theme.colors.black};
      box-shadow:
        // Inner-border so the div doesn't get larger
        inset 0 0 0 2px ${theme.colors.black},
        -4px 4px 0 0px ${theme.colors.yellow};
    }
    &[data-value='how-to'] {
      background: ${theme.colors.white};
      color: ${theme.colors.black};
      border-color: ${theme.colors.black};
      box-shadow:
        // Inner-border so the div doesn't get larger
        inset 0 0 0 2px ${theme.colors.black},
        -4px 4px 0 0px ${theme.colors.yellow};
    }

    transition: transform 120ms ease-out;
    :hover {
      transform: scale(1.2) rotate(-1deg);
    }
  `,
)

interface Props {
  children: string
}

const Tag = ({ children }: Props) => (
  <Container data-value={children.toLowerCase()}>{children}</Container>
)

export default Tag
