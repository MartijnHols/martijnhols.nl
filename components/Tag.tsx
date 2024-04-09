import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Tag = styled.div(
  ({ theme }) => css`
    display: inline-block;
    background: ${theme.colors.black};
    color: ${theme.colors.yellow};
    padding: 4px 6px;
    border: 2px solid ${theme.colors.yellow};
    margin-left: -2px;
    margin-bottom: 2px;

    // I purposefully used both variations for SEO and since iirc it was more commonly called "React.js" long back
    &[data-value='React'],
    &[data-value='React.js'] {
      color: #61dafb;
    }
    &[data-value='Open Source'] {
      color: #fff;
    }

    transition: transform 120ms ease-out;
    :hover {
      transform: scale(1.4) rotate(-1deg);
    }
  `,
)

export default Tag
