import styled from '@emotion/styled'

const SyntaxError = styled.span`
  text-decoration: underline;
  // The shorthand doesn't seem to work in Safari
  text-decoration-style: wavy;
  text-decoration-color: red;
  text-decoration-skip-ink: none;
`

export default SyntaxError
