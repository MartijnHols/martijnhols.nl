import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ComponentProps } from 'react'
import Link from '../../components/Link'
import Panel from '../../components/Panel'
import Tooltip from '../../components/Tooltip'

const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.x4}px;
    color: ${theme.colors.white};
    flex-flow: column;

    > div {
      flex: 1 1 33%;
    }

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      gap: ${theme.spacing.x8}px;
      flex-flow: row;
    }
    @media (min-width: ${theme.breakpoints.DESKTOP_LARGE}px) {
      gap: ${theme.spacing.x10}px;
    }
  `,
)
const UspLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`
const UspPanel = styled(Panel)(
  ({ theme }) => css`
    @property --box-shadow-distance {
      syntax: '<length>';
      initial-value: 0;
      inherits: true;
    }

    margin-top: 0;
    margin-bottom: 0;

    ${UspLink} & {
      transition:
        --box-shadow-distance 0.2s ease-in-out,
        all 0.2s ease-in-out;

      :hover {
        --box-shadow-distance: 12px;
        transform: translate(4px, -4px);
        color: ${theme.colors.yellow50};
      }
    }
  `,
)
const UspPanelTitle = styled.div(
  ({ theme }) => css`
    font-size: 0.75em;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      font-size: 0.875em;
    }
    @media (min-width: ${theme.breakpoints.DESKTOP}px) {
      font-size: 1em;
    }
  `,
)
const UspPanelText = styled.div(
  ({ theme }) => css`
    font-weight: 600;
    font-size: 0.875em;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      font-size: 1em;
    }
    @media (min-width: ${theme.breakpoints.DESKTOP}px) {
      font-size: 1.25em;
    }
    @media (min-width: ${theme.breakpoints.DESKTOP_LARGE}px) {
      font-size: 1.5em;
    }
  `,
)
const DesktopOnlyText = styled.span(
  ({ theme }) => css`
    display: none;

    @media (min-width: ${theme.breakpoints.DESKTOP}px) {
      display: inline;
    }
  `,
)

const UspBar = (others: ComponentProps<typeof Container>) => (
  <Container {...others}>
    <div>
      <UspLink href="#footer" className="plain">
        <UspPanel variant="sm">
          <UspPanelTitle>Beschikbaarheid</UspPanelTitle>
          <UspPanelText>Snel beschikbaar. Neem contact op →</UspPanelText>
        </UspPanel>
      </UspLink>
    </div>
    <div>
      <Tooltip content="Gebaseerd in Barneveld, Gelderland. Ik sta open voor opdrachten binnen 60 minuten rijden, zoals Amsterdam, Amersfoort, Veenendaal, Ede, Wageningen, Apeldoorn, Utrecht, Zeist, Hilversum, Rhenen, Nijkerk, Leusden, Arnhem, Nijmegen, Deventer, Zwolle, Almere en omstreken.">
        <UspPanel variant="sm">
          <UspPanelTitle>Bereik</UspPanelTitle>
          <UspPanelText>
            Midden-Nederland en omgeving{' '}
            <DesktopOnlyText>(hybride werkplek)</DesktopOnlyText>
          </UspPanelText>
        </UspPanel>
      </Tooltip>
    </div>
    <div>
      <UspLink href="/blog" className="plain">
        <UspPanel variant="sm">
          <UspPanelTitle>Blog</UspPanelTitle>
          <UspPanelText>
            Lees mijn blog over React, TypeScript en JavaScript →
          </UspPanelText>
        </UspPanel>
      </UspLink>
    </div>
  </Container>
)

export default UspBar
