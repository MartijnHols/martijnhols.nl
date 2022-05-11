import { css, Global } from '@emotion/react'
import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'

import { colors, fontSizes, links, headings, spacing } from '.'

const GlobalStyles = () => (
  <Global
    styles={[
      css`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: ${colors.complementary};
          color: ${colors.dominant};
          font-size: ${fontSizes.mainText}px;
        }
        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
        }

        figure,
        ul {
          margin: 0;
          padding: 0;
        }

        svg {
          width: auto;
          height: auto;
        }

        p {
          margin: ${spacing.x2}px 0;
        }

        * {
          outline-color: ${colors.complementary};
        }
      `,
      links.globalStyles,
      headings.globalStyles,
    ]}
  />
)

export default GlobalStyles
