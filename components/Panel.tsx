import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ComponentProps, ReactNode } from 'react'

const Container = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== 'variant' && prop !== 'boxShadow' && prop !== 'as',
})<{
  variant: 'sm' | 'md'
  boxShadow: boolean
}>(({ theme, variant, boxShadow }) => [
  css`
    // Top and bottom margins are not equal since the angle changes the visual
    // margin. I believe the left-most column is most important to appear
    // visually aligned.
    margin-top: ${theme.spacing.x3}px;
    margin-bottom: ${theme.spacing.x5}px;
    // Offset the padding so the code text aligns with the rest of the text
    margin-left: -1em;
    margin-right: -1em;
    padding: 0.8em 1em;
    --background: ${theme.colors.black};
    background: var(--background);
    position: relative;
    --size: 0.8em;

    ::before {
      content: '';
      position: absolute;
      display: block;
      height: var(--size);
      inset: calc(var(--size) * -1) 0;
      bottom: auto;
      background: linear-gradient(
        to bottom right,
        /* We need some margin to prevent a jagged edge */ transparent 49.5%,
        var(--background) 50.5%
      );
    }
  `,
  variant === 'sm' &&
    css`
      padding-top: 9px;
      padding-bottom: 9px;
      --size: 0.4em;
    `,
  boxShadow &&
    css`
      box-shadow: calc(var(--box-shadow-distance) * -1)
        var(--box-shadow-distance) 0 0 ${theme.colors.yellow};
    `,
])
const BottomAngle = styled('div', {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'boxShadow',
})<{
  variant: 'sm' | 'md'
  boxShadow: boolean
}>(({ theme, variant, boxShadow }) => [
  css`
    position: absolute;
    display: block;
    --size: 0.8em;
    height: var(--box-shadow-distance);
    inset: calc(var(--box-shadow-distance) * -1) 0;
    left: calc(var(--box-shadow-distance) * -1);
    width: 100%;
    bottom: calc(var(--box-shadow-distance) * -1);
    top: auto;

    ::before {
      content: '';
      position: absolute;
      z-index: 1;
      display: block;
      height: var(--size);
      left: var(--box-shadow-distance);
      width: 100%;
      background: linear-gradient(
        to bottom right,
        /* We need some margin to prevent a jagged edge */ var(--background)
          49.5%,
        transparent 50.5%
      );
    }
  `,
  variant === 'sm' &&
    css`
      --size: 0.4em;
    `,
  boxShadow &&
    css`
      background: ${theme.colors.yellow};

      ::after {
        content: '';
        position: absolute;
        display: block;
        height: var(--size);
        width: 100%;
        left: 0;
        bottom: calc(var(--size) * -1);
        background: linear-gradient(
          to bottom right,
          /* We need some margin to prevent a jagged edge */
            ${theme.colors.yellow} 49.5%,
          transparent 50.5%
        );
      }
    `,
])

interface Props {
  children: ReactNode
  variant?: 'sm' | 'md'
  boxShadow?: boolean
  as?: ComponentProps<typeof Container>['as']
  className?: string
}

const Panel = ({
  children,
  variant = 'md',
  boxShadow = true,
  as,
  className,
}: Props) => (
  <Container
    as={as}
    variant={variant}
    boxShadow={boxShadow}
    className={className}
  >
    {children}
    <BottomAngle variant={variant} boxShadow={boxShadow} />
  </Container>
)

export default Panel
