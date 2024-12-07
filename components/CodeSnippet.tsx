import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Highlight, themes } from 'prism-react-renderer'
import AngledContainer from './AngledContainer'
import CopyPasteOnly from './CopyPasteOnly'
// Alternative: https://github.com/react-simple-code-editor/react-simple-code-editor

const Code = styled.code`
  display: block;
`
const PreformattedContainer = styled.pre(
  ({ theme }) => css`
    margin: 0;
    scrollbar-color: ${theme.colors.white} ${theme.colors.black};
    font-size: 1em;
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
      <Code translate="no" {...others}>
        <AngledContainer variant={variant}>
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
        </AngledContainer>
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
