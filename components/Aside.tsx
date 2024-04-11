import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'

const Container = styled.div(
  ({ theme }) => css`
    border: 7px solid ${theme.colors.black};
    border-left: 0;
    border-right: 0;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.x2}px;
    transform: rotate(-0.85deg);
    margin: ${theme.spacing.x3}px 0;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      transform: rotate(-1deg);
      margin-left: -${theme.spacing.x6}px;
      margin-right: -${theme.spacing.x6}px;
    }
  `,
)
const Label = styled.div<{ variant?: 'small' | 'regular' }>(
  ({ theme, variant }) => [
    css`
      background: ${theme.colors.black};
      color: ${theme.colors.yellow};
      display: flex;
      align-items: center;
      justify-content: center;
      padding: ${theme.spacing.x1}px;
      text-transform: uppercase;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      font-weight: bold;
      align-self: stretch;
    `,
    variant === 'regular' &&
      css`
        letter-spacing: 7px;
        // Letter-spacing places letters to the left of the space they occupy.
        // This makes the letters appear centered.
        padding-bottom: ${theme.spacing.x1 / 2}px;
      `,
  ],
)
const Content = styled.div(
  ({ theme }) => css`
    padding: ${theme.spacing.x2}px;
  `,
)

interface Props {
  children: ReactNode
  label?: ReactNode
  variant?: 'small' | 'regular'
}

const Aside = ({ children, label, variant = 'regular' }: Props) => (
  <Container>
    <Label variant={variant}>{label || 'Aside'}</Label>
    <Content>{children}</Content>
  </Container>
)

export default Aside
