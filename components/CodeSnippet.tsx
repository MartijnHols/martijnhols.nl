import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Highlight, themes } from 'prism-react-renderer'
// Alternative: https://github.com/react-simple-code-editor/react-simple-code-editor

const Code = styled.code<{ variant?: 'small' | 'regular' }>(
  ({ theme, variant = 'regular' }) => [
    css`
      display: block;
      // Top and bottom margins are not equal since the angle changes the visual
      // margin. I believe the left-most column is most important to appear
      // visually aligned.
      margin-top: ${theme.spacing.x3}px;
      margin-bottom: ${theme.spacing.x4}px;
      // Offset the padding so the code text aligns with the rest of the text
      margin-left: -1em;
      margin-right: -1em;
      padding: ${theme.spacing.x2}px 1em;
      background: ${theme.colors.black};
      position: relative;

      ::before,
      ::after {
        content: '';
        position: absolute;
        display: block;
        --size: ${theme.spacing.x2}px;
        height: var(--size);
        inset: calc(var(--size) * -1) 0;
      }

      ::before {
        bottom: auto;
        background: linear-gradient(
          to bottom right,
          /* We need some margin to prevent a jagged edge */ transparent 49.5%,
          ${theme.colors.black} 50.5%
        );
      }
      ::after {
        top: auto;
        background: linear-gradient(
          to bottom right,
          /* We need some margin to prevent a jagged edge */
            ${theme.colors.black} 49.5%,
          transparent 50.5%
        );
      }
    `,
    variant === 'small' &&
      css`
        padding-top: 9px;
        padding-bottom: 9px;

        ::before,
        ::after {
          --size: ${theme.spacing.x1}px;
        }
      `,
  ],
)
const PreformattedContainer = styled.pre(
  ({ theme }) => css`
    margin: 0;
    scrollbar-color: ${theme.colors.yellow} ${theme.colors.black};
  `,
)

export type PrismLanguages =
  | 'tsx'
  | 'css'
  | 'markup'
  | 'jsx'
  | 'graphql'
  | 'yaml'
  | 'markdown'

interface Props {
  children: string
  language?: PrismLanguages
  variant?: 'small' | 'regular'
}

const CodeSnippet = ({
  children,
  language = 'tsx',
  variant = 'regular',
}: Props) => {
  const theme = useTheme()

  return (
    <Code translate="no" variant={variant}>
      <Highlight
        theme={{
          ...themes.oneDark,
          plain: {
            ...themes.oneDark.plain,
            backgroundColor: theme.colors.black,
            color: '#dfe1e7', // a lighter variant of the default, since the grey didn't look as good on the darker background color
          },
        }}
        code={children.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <PreformattedContainer className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </PreformattedContainer>
        )}
      </Highlight>
    </Code>
  )
}

export default CodeSnippet
