import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { breakpoints } from '../theme'
import CopyPasteOnly from './CopyPasteOnly'

const Container = styled.div`
  border: 7px solid var(--black);
  background: var(--yellow50);
  border-left: 0;
  border-right: 0;
  display: flex;
  align-items: center;
  transform: rotate(-0.35deg);
  margin: 1em 0 2em;
  box-shadow: calc(var(--box-shadow-distance) * -1) var(--box-shadow-distance) 0
    0 var(--yellow);

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 94.5%; // 1px smaller to very slightly de-emphasize
    // These values should be based on the font-size of the parent
    margin: 1.06em 0 2.12em;
    transform: rotate(-0.5deg);
    margin-left: calc(var(--spacing6) * -1);
    margin-right: calc(var(--spacing6) * -1);
  }
  @media print {
    box-shadow: none;
  }
`
const Label = styled.div<{ variant?: 'xs' | 'sm' | 'md' }>(({ variant }) => [
  css`
    background: var(--black);
    color: var(--yellow50);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 5px;
    letter-spacing: 2.5px;
    // Letter-spacing places letters to the left of the space they occupy.
    // This makes the letters appear centered.
    padding-bottom: 1px;
    text-transform: uppercase;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    font-weight: bold;
    align-self: stretch;
    // This is typically bad form, but this improves the layout of text when
    // it is copy-pasted, since I add this text back underneath
    user-select: none;
  `,
  variant === 'sm' &&
    css`
      letter-spacing: 4px;
      padding: var(--spacing1);
      // Letter-spacing places letters to the left of the space they occupy.
      // This makes the letters appear centered.
      padding-bottom: calc(var(--spacing1) / 2);
    `,
  variant === 'md' &&
    css`
      letter-spacing: 7px;
      // Letter-spacing places letters to the left of the space they occupy.
      // This makes the letters appear centered.
      padding-bottom: 0;
    `,
])
const Content = styled.div`
  padding: 0 1.6em 0;
`

interface Props {
  children: ReactNode
  label?: ReactNode
  variant?: 'xs' | 'sm' | 'md'
}

const AsideWithParagraph = ({ children, label, variant = 'md' }: Props) => (
  <Container>
    <Label variant={variant}>{label ?? 'Aside'}</Label>
    <Content>
      <p>
        <CopyPasteOnly>&gt; {label ?? 'Aside'}:&nbsp;</CopyPasteOnly>
        {children}
      </p>
    </Content>
  </Container>
)

export default AsideWithParagraph
