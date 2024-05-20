import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'
import CopyPasteOnly from './CopyPasteOnly'

const Container = styled.div(
  ({ theme }) => css`
    border: 7px solid ${theme.colors.black};
    background: ${theme.colors.yellow50};
    border-left: 0;
    border-right: 0;
    display: flex;
    align-items: center;
    transform: rotate(-0.35deg);
    margin: 1em 0 2em;
    --box-shadow-distance: 0.5em;
    box-shadow: calc(var(--box-shadow-distance) * -1) var(--box-shadow-distance)
      0 0 ${theme.colors.yellow};

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      font-size: 94.5%; // 1px smaller to very slightly de-emphasize
      // These values should be based on the font-size of the parent
      margin: 1.06em 0 2.12em;
      --box-shadow-distance: 0.53em;
      transform: rotate(-0.5deg);
      margin-left: -${theme.spacing.x6}px;
      margin-right: -${theme.spacing.x6}px;
    }
  `,
)
const Label = styled.div<{ variant?: 'xs' | 'sm' | 'md' }>(
  ({ theme, variant }) => [
    css`
      background: ${theme.colors.black};
      color: ${theme.colors.yellow50};
      display: flex;
      align-items: center;
      justify-content: center;
      padding: ${theme.spacing.x1}px;
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
        // Letter-spacing places letters to the left of the space they occupy.
        // This makes the letters appear centered.
        padding-bottom: ${theme.spacing.x1 / 2}px;
      `,
    variant === 'md' &&
      css`
        letter-spacing: 7px;
        // Letter-spacing places letters to the left of the space they occupy.
        // This makes the letters appear centered.
        padding-bottom: ${theme.spacing.x1 / 2}px;
      `,
  ],
)
const Content = styled.div`
  padding: 0 1.6em 0;
`

interface Props {
  children: ReactNode
  label?: ReactNode
  variant?: 'xs' | 'sm' | 'md'
}

const Aside = ({ children, label, variant = 'md' }: Props) => (
  <Container>
    <Label variant={variant}>{label || 'Aside'}</Label>
    <Content>
      <p>
        <CopyPasteOnly>&gt; {label || 'Aside'}:&nbsp;</CopyPasteOnly>
        {children}
      </p>
    </Content>
  </Container>
)

export default Aside
