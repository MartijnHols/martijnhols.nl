import styled from '@emotion/styled'
import { breakpoints } from '../theme'

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 81.25em;
  padding-left: var(--spacing2);
  padding-right: var(--spacing2);

  @media (min-width: ${breakpoints.TABLET}px) {
    padding-left: var(--spacing6);
    padding-right: var(--spacing6);
  }
  @media (min-width: ${breakpoints.DESKTOP}px) {
    padding-left: var(--spacing10);
    padding-right: var(--spacing10);
  }
`

export default Container
