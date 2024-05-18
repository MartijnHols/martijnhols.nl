import styled from '@emotion/styled'

const StyledCode = styled.code`
  padding: 0.3em;
  border-radius: 0.3em;
  background: #e7e7e5;
  // Use an opacity for the background so it also works inside <mark>ed code
  // On white background, we aim for the above background color
  background: hsl(60deg 6% 85% / 60%);
`

interface Props {
  children: string
  className?: string
}

const Code = ({ children, ...others }: Props) => (
  <StyledCode translate="no" {...others}>
    {children}
  </StyledCode>
)

export default Code
