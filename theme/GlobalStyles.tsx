import { css, Global } from '@emotion/react'
import * as theme from '.'
import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'

const GlobalStyles = () => (
  <Global
    styles={[
      css`
        :root {
          --yellow: ${theme.colors.yellow};
          --yellow50: ${theme.colors.yellow50};
          --black: ${theme.colors.black};
          --black400: ${theme.colors.black400};
          --black300: ${theme.colors.black300};
          --white: ${theme.colors.white};

          --spacing1: 0.4375rem;
          --spacing2: calc(var(--spacing1) * 2);
          --spacing3: calc(var(--spacing1) * 3);
          --spacing4: calc(var(--spacing1) * 4);
          --spacing5: calc(var(--spacing1) * 5);
          --spacing6: calc(var(--spacing1) * 6);
          --spacing7: calc(var(--spacing1) * 7);
          --spacing8: calc(var(--spacing1) * 8);
          --spacing9: calc(var(--spacing1) * 9);
          --spacing10: calc(var(--spacing1) * 10);

          --box-shadow-distance: var(--spacing1);
        }
        html {
          scroll-padding-top: 2rem;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color: var(--black);
          line-height: 1.6;

          --angle-height: calc(10px + 100vw / 2000 * 30);
        }

        * {
          outline-color: var(--black);
        }
        .inverted,
        .inverted * {
          outline-color: var(--white);
        }

        ::selection {
          background: var(--yellow);
        }

        p,
        ul {
          margin: 1.25em 0;

          > ul {
            margin: 0.75em 0;
          }
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
          background: var(--yellow);
          color: var(--black);
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
          border-left: 0.25em solid var(--black);
          margin-left: 0;
          padding: 0.25em 0 0.25em 2em;
          font-style: italic;

          .inverted & {
            border-left-color: var(--white);
          }
        }

        button {
          border-color: currentColor;
        }
        input {
          border-color: currentColor;
          border-radius: 0;
        }

        .content ul {
          list-style: none;

          @media print {
            list-style: square;
          }

          > li {
            margin: 0.5em 0;
            position: relative;

            ::before {
              content: '';
              display: block;
              position: absolute;
              top: 0.7em;
              height: 4px;
              width: 20px;
              background: var(--black);
              transform: skew(-15deg);
              margin-left: -38px;
            }
          }

          .inverted & {
            > li::before {
              background: var(--white);
            }
          }
        }
      `,
      theme.links.globalStyles,
      theme.headings.globalStyles,
    ]}
  />
)

export default GlobalStyles
