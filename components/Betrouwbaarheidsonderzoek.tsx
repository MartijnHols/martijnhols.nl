import styled from '@emotion/styled'
import { breakpoints } from '../theme'
import Panel from './Panel'

const Container = styled(Panel)`
  display: flex;
  --background: var(--yellow);
  color: var(--black);
  margin-top: 1.25em;
  margin-bottom: 0;
  padding: 0.5em 0.25em;
  max-width: 50em;
  align-items: center;
  font-size: 0.75em;

  @media (min-width: ${breakpoints.TABLET}px) {
    padding: 0.25em;
    margin-left: -0.25em;
    margin-right: -0.25em;
  }
`
const IconContainer = styled.div`
  flex: 0 0 auto;
  font-size: 3em;
  /* color: #0b1f74; */
  padding: 0 0.25em;
  line-height: 1;
`
const Text = styled.div`
  flex: 1 1 auto;
  padding: 0 0.25em;

  p {
    line-height: 1.4;
  }
  p:last-of-type {
    margin-bottom: 0;
  }
`

const Betrouwbaarheidsonderzoek = () => (
  <Container boxShadow={false} variant="sm" className="inverted">
    <IconContainer>✓⃝</IconContainer>
    <Text>
      <h4>Betrouwbaarheidsonderzoek positief afgerond</h4>
      <p>
        Een betrouwbaarheidsonderzoek is vereist om voor de Politie te kunnen
        werken. De positieve uitkomst van dit onderzoek onderschrijft mijn{' '}
        <b>betrouwbaarheid</b> en <b>integriteit</b>.
      </p>
    </Text>
  </Container>
)

export default Betrouwbaarheidsonderzoek
