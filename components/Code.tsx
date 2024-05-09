import styled from '@emotion/styled'
import { Highlight } from 'prism-react-renderer'
import { PrismLanguages, useHighlightTheme } from './CodeSnippet'
import CopyPasteOnly from './CopyPasteOnly'

const StyledCode = styled.code`
  padding: 0.3em;
  border-radius: 0.3em;
`

interface Props {
  children: string
  language?: PrismLanguages
}

const Code = ({ children, language = 'tsx' }: Props) => {
  const highlightTheme = useHighlightTheme()

  return (
    <>
      <CopyPasteOnly>`</CopyPasteOnly>
      <Highlight theme={highlightTheme} code={children} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <StyledCode className={className} style={style} translate="no">
            {tokens.map((line, i) => (
              <span key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            ))}
          </StyledCode>
        )}
      </Highlight>
      <CopyPasteOnly>`</CopyPasteOnly>
    </>
  )
}

export default Code
