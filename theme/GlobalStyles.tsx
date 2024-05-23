import { css, Global } from '@emotion/react'
import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'

const GlobalStyles = () => (
  <Global
    styles={(theme) => [
      css`
        html {
          scroll-padding-top: 2rem;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color: ${theme.colors.black};
          line-height: 1.6;

          --angle-height: calc(10px + 100vw / 2000 * 30);
        }

        * {
          outline-color: ${theme.colors.black};
        }

        ::selection {
          background: ${theme.colors.yellow};
        }

        p,
        ul {
          margin: 1.25em 0;

          > li {
            margin: 0.5em 0;
          }
        }

        svg {
          width: auto;
          height: auto;
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

        code,
        pre {
          font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
          // Monospace fonts look bigger, so to make code blocks balanced, we need to
          // make the font-size smaller. Goal: 16px on 18px parent
          font-size: 0.8889em;
        }
        code > pre,
        pre > code {
          font-size: 1em;
        }

        blockquote {
          border-left: 0.25em solid ${theme.colors.black};
          margin-left: 0;
          padding: 0.25em 0 0.25em 2em;
          font-style: italic;

          .inverted & {
            border-left-color: ${theme.colors.white};
          }
        }
      `,
      theme.links.globalStyles,
      theme.headings.globalStyles,
    ]}
  />
)

export default GlobalStyles
