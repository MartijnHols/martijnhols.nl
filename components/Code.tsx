import styled from '@emotion/styled'
import { Highlight, themes } from 'prism-react-renderer'

import { PrismLanguages } from './CodeSnippet'

const StyledCode = styled.code`
  padding: 0.3em;
  border-radius: 0.3em;
`

interface Props {
  children: string
  language?: PrismLanguages
}

const Code = ({ children, language = 'tsx' }: Props) => (
  <Highlight theme={themes.oneDark} code={children} language={language}>
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
)

export default Code
