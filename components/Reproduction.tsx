import styled from '@emotion/styled'
import { ReactNode } from 'react'
import Code from './Code'
import ErrorBoundary from './ErrorBoundary'

const Container = styled.div`
  border: 4px solid var(--black);
  background: var(--yellow50);
  padding: 1em;
  position: relative;
  margin: 1em 0;
  box-shadow: calc(var(--box-shadow-distance) * -1) var(--box-shadow-distance) 0
    0 var(--yellow);
`
const Label = styled.div`
  position: absolute;
  top: 0;
  left: 1em;
  transform: translateY(-0.65em);
  line-height: 1;
  text-shadow:
    -3px -3px 0em #fff,
    -3px 3px 0em #fff,
    3px -3px 0em #fff,
    3px 3px 0em #fff,
    -2px -2px 0em #fff,
    -2px 2px 0em #fff,
    2px -2px 0em #fff,
    2px 2px 0em #fff,
    -1px -1px 0em #fff,
    1px 1px 0em #fff;
`
const CodeError = styled(Code)`
  display: block;
  margin-bottom: 1em;
  color: red;
`

interface Props {
  children: ReactNode
  label?: string
}

const Reproduction = ({ children, label = 'Reproduction' }: Props) => (
  <Container>
    <Label>{label}</Label>
    <ErrorBoundary
      fallback={(error, reset) => (
        <div>
          <div>Error caught by error boundary:</div>
          <CodeError>
            {error.name}: {error.message}
          </CodeError>
          <button type="button" onClick={reset}>
            Reset
          </button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  </Container>
)

export default Reproduction
