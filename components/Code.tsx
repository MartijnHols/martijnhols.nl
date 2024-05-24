import styled from '@emotion/styled'
import { ReactNode } from 'react'

const StyledCode = styled.code`
  padding: 0.3em;
  border-radius: 0.3em;
  // This fixes height in headings which have a lower line-height
  line-height: 1.6;
  background: #e7e7e5;
  // Use an opacity for the background so it also works inside <mark>ed code
  // On white background, we aim for the above background color
  background: hsl(60deg 6% 85% / 60%);
`

interface Props {
  children: ReactNode
  className?: string
}

const Code = ({ children, ...others }: Props) => (
  <StyledCode translate="no" {...others}>
    {children}
  </StyledCode>
)

export default Code
