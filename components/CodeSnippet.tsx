import styled from '@emotion/styled'
import { Highlight, themes } from 'prism-react-renderer'
import CopyPasteOnly from './CopyPasteOnly'
import Panel from './Panel'
// Alternative: https://github.com/react-simple-code-editor/react-simple-code-editor
// Alternative2: https://github.com/code-hike/bright

const Code = styled.code`
  display: block;
`
const PreformattedContainer = styled.pre`
  margin: 0;
  scrollbar-color: var(--white) var(--black);
  font-size: 1em;
`

export type PrismLanguages =
  | 'tsx'
  | 'css'
  | 'markup'
  | 'jsx'
  | 'graphql'
  | 'yaml'
  | 'markdown'
  | ''

export const useHighlightTheme = () => ({
  ...themes.oneDark,
  plain: {
    ...themes.oneDark.plain,
    backgroundColor: 'var(--black)',
    color: '#dfe1e7', // a lighter variant of the default, since the grey didn't look as good on the darker background color
  },
})

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
        <Panel variant={variant}>
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
        </Panel>
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
