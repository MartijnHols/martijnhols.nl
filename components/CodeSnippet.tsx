import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Highlight, themes } from 'prism-react-renderer'
// Alternative: https://github.com/react-simple-code-editor/react-simple-code-editor

const PreformattedContainer = styled.pre(
  ({ theme }) => css`
    padding: 1em;
    border-radius: 0.3em;
    scrollbar-color: ${theme.colors.yellow} ${theme.colors.black};
    // Offset the padding so the code text aligns with the rest of the text
    margin: 0 -1em;
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
}

const CodeSnippet = ({ children, language = 'tsx' }: Props) => {
  const theme = useTheme()

  return (
    <code translate="no">
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
    </code>
  )
}

export default CodeSnippet
