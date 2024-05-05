import { css, Global } from '@emotion/react'
import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'

const GlobalStyles = () => (
  <Global
    styles={(theme) => [
      css`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: ${theme.colors.black};
          color: ${theme.colors.black};
          line-height: 1.6;

          --angle-height: calc(10px + 100vw / 2000 * 30);
        }
        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
        }

        svg {
          width: auto;
          height: auto;
        }

        * {
          outline-color: ${theme.colors.black};
        }

        ::selection {
          background: ${theme.colors.yellow};
        }

        strong,
        mark {
          background: ${theme.colors.yellow};
          color: ${theme.colors.black};
          padding: 0.167em 0.111em;

          &::selection,
          *::selection {
            background-color: #bea500;
          }
        }
      `,
      theme.links.globalStyles,
      theme.headings.globalStyles,
    ]}
  />
)

export default GlobalStyles
