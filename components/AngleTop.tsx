import styled from '@emotion/styled'
import AngleBottom from './AngleBottom'

const AngleTop = styled(AngleBottom)`
  // We need some margin to prevent a jagged edge
  background: linear-gradient(
    to bottom right,
    transparent 49.5%,
    var(--black) 50.5%
  );
`

export default AngleTop
