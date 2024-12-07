import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Highlight, themes } from 'prism-react-renderer'
import CopyPasteOnly from './CopyPasteOnly'
// Alternative: https://github.com/react-simple-code-editor/react-simple-code-editor

const Code = styled.code<{ variant?: 'sm' | 'md' }>(
  ({ theme, variant = 'md' }) => [
    css`
      display: block;
      // Top and bottom margins are not equal since the angle changes the visual
      // margin. I believe the left-most column is most important to appear
      // visually aligned.
      margin-top: ${theme.spacing.x3}px;
      margin-bottom: ${theme.spacing.x5}px;
      // Offset the padding so the code text aligns with the rest of the text
      margin-left: -1em;
      margin-right: -1em;
      padding: 0.8em 1em;
      background: ${theme.colors.black};
      position: relative;
      box-shadow: calc(var(--box-shadow-distance) * -1)
        var(--box-shadow-distance) 0 0 ${theme.colors.yellow};
      --size: 0.8em;

      ::before {
        content: '';
        position: absolute;
        display: block;
        height: var(--size);
        inset: calc(var(--size) * -1) 0;
        bottom: auto;
        background: linear-gradient(
          to bottom right,
          /* We need some margin to prevent a jagged edge */ transparent 49.5%,
          ${theme.colors.black} 50.5%
        );
      }
    `,
    variant === 'sm' &&
      css`
        padding-top: 9px;
        padding-bottom: 9px;
        --size: 0.4em;
      `,
  ],
)
const BottomAngle = styled.div<{ variant?: 'sm' | 'md' }>(
  ({ theme, variant = 'md' }) => [
    css`
      position: absolute;
      display: block;
      --size: 0.8em;
      height: var(--box-shadow-distance);
      inset: calc(var(--box-shadow-distance) * -1) 0;
      left: calc(var(--box-shadow-distance) * -1);
      width: 100%;
      bottom: calc(var(--box-shadow-distance) * -1);
      top: auto;
      background: ${theme.colors.yellow};

      ::before {
        content: '';
        position: absolute;
        z-index: 1;
        display: block;
        height: var(--size);
        left: var(--box-shadow-distance);
        width: 100%;
        background: linear-gradient(
          to bottom right,
          /* We need some margin to prevent a jagged edge */
            ${theme.colors.black} 49.5%,
          transparent 50.5%
        );
      }
      ::after {
        content: '';
        position: absolute;
        display: block;
        height: var(--size);
        width: 100%;
        left: 0;
        bottom: calc(var(--size) * -1);
        background: linear-gradient(
          to bottom right,
          /* We need some margin to prevent a jagged edge */
            ${theme.colors.yellow} 49.5%,
          transparent 50.5%
        );
      }
    `,
    variant === 'sm' &&
      css`
        --size: 0.4em;
      `,
  ],
)
const PreformattedContainer = styled.pre(
  ({ theme }) => css`
    margin: 0;
    scrollbar-color: ${theme.colors.white} ${theme.colors.black};
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
  | ''

export const useHighlightTheme = () => {
  const theme = useTheme()

  return {
    ...themes.oneDark,
    plain: {
      ...themes.oneDark.plain,
      backgroundColor: theme.colors.black,
      color: '#dfe1e7', // a lighter variant of the default, since the grey didn't look as good on the darker background color
    },
  }
}

interface Props {
  children: string
  language?: PrismLanguages
  variant?: 'sm' | 'md'
  className?: string
}

const CodeSnippet = ({
  children,
  language = 'tsx',
  variant = 'md',
  ...others
}: Props) => {
  const highlightTheme = useHighlightTheme()

  return (
    <>
      <CopyPasteOnly>
        ```
        <br />
      </CopyPasteOnly>
      <Code translate="no" variant={variant} {...others}>
        <Highlight
          theme={highlightTheme}
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
        <BottomAngle variant={variant} />
      </Code>
      <CopyPasteOnly>
        ```
        <br />
        <br />
      </CopyPasteOnly>
    </>
  )
}

export default CodeSnippet
