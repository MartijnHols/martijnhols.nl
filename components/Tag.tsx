import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Container = styled.div(
  ({ theme }) => css`
    display: inline-block;
    background: ${theme.colors.black};
    color: ${theme.colors.yellow};
    padding: 4px 6px;
    border: 2px solid ${theme.colors.yellow};
    margin-left: -2px;
    margin-bottom: 2px;

    // TODO: Remove usages of React.js
    &[data-value='react'],
    &[data-value='react.js'] {
      color: #61dafb;
    }
    &[data-value='open source'] {
      color: #fff;
    }
    &[data-value='how-to'] {
      background: darkorange;
      color: ${theme.colors.black};
    }

    transition: transform 120ms ease-out;
    :hover {
      transform: scale(1.4) rotate(-1deg);
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
