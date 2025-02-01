import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ComponentProps } from 'react'
import Link from './Link'
import Panel from './Panel'
import Tooltip from './Tooltip'

const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.x4}px;
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

const UspBar = (others: ComponentProps<typeof Container>) => (
  <Container {...others}>
    <div>
      <UspLink href="#footer" className="plain">
        <UspPanel variant="sm">
          <UspPanelTitle>Ervaring</UspPanelTitle>
          <UspPanelText>
            Meer dan 8 jaar React en{' '}
            <span
              css={css`
                white-space: nowrap;
              `}
            >
              20 jaar
            </span>{' '}
            full stack ervaring.
          </UspPanelText>
        </UspPanel>
      </UspLink>
    </div>
    <div>
      <Tooltip
        content={
          <>
            Gebaseerd in <strong>Barneveld, Gelderland</strong>. Ik sta open
            voor opdrachten binnen 60 minuten rijden, zoals Amsterdam,
            Amersfoort, Veenendaal, Ede, Wageningen, Apeldoorn, Utrecht, Zeist,
            Hilversum, Rhenen, Nijkerk, Leusden, Arnhem, Nijmegen, Deventer,
            Zwolle, Almere en omstreken.
          </>
        }
      >
        <UspPanel variant="sm">
          <UspPanelTitle>Locatie</UspPanelTitle>
          <UspPanelText>
            Omgeving Midden-Nederland (inclusief Amsterdam)
          </UspPanelText>
        </UspPanel>
      </Tooltip>
    </div>
    <div>
      <UspLink href="/blog" className="plain">
        <UspPanel variant="sm">
          <UspPanelTitle>Blog</UspPanelTitle>
          <UspPanelText>
            Lees mijn blog over React, TypeScript en front-end →
          </UspPanelText>
        </UspPanel>
      </UspLink>
    </div>
  </Container>
)

export default UspBar
