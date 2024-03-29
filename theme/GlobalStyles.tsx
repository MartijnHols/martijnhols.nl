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
          background: ${theme.colors.yellow};
          color: ${theme.colors.black};
          font-size: ${theme.fontSizes.mainText}px;
        }
        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
        }

        svg {
          width: auto;
          height: auto;
        }

        p {
          margin: ${theme.spacing.x2}px 0;
        }

        * {
          outline-color: ${theme.colors.black};
        }
      `,
      theme.links.globalStyles,
      theme.headings.globalStyles,
    ]}
  />
)

export default GlobalStyles
