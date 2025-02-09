import styled from '@emotion/styled'

const AngleBottom = styled.div`
  position: relative;
  height: var(--angle-height);
  // We need some margin to prevent a jagged edge
  background: linear-gradient(
    to bottom right,
    var(--black) 49.5%,
    transparent 50.5%
  );
`

export default AngleBottom
