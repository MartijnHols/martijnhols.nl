import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ComponentProps } from 'react'
import Annotation from './Annotation'
import Link from './Link'
import Panel from './Panel'

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
  `,
)

const UspBar = (others: ComponentProps<typeof Container>) => (
  <Container {...others}>
    <div>
      <UspPanel variant="sm">
        <UspPanelTitle>🧑‍💻 Architect-level ervaring</UspPanelTitle>
        <UspPanelText className="inverted">
          8+ jaar React-specialist &amp;{' '}
          <span
            css={css`
              white-space: nowrap;
            `}
          >
            20+ jaar full-stack ervaring.
          </span>
        </UspPanelText>
      </UspPanel>
    </div>
    <div>
      <UspPanel variant="sm">
        <UspPanelTitle>🏛️ Duurzame React-architectuur</UspPanelTitle>
        <UspPanelText className="inverted">
          Pragmatische architectuur met focus op{' '}
          <Annotation annotation="User Experience; een intuïtieve, snelle, toegankelijke en gebruiksvriendelijke app zorgt voor een betere ervaring voor eindgebruikers.">
            UX
          </Annotation>{' '}
          én{' '}
          <Annotation annotation="Standaard patronen en een goed gestructureerde architectuur versnellen ontwikkeling, vereenvoudigen onderhoud en zorgen ervoor dat het team soepel kan doorontwikkelen - ook na mijn vertrek.">
            DX
          </Annotation>
          .
        </UspPanelText>
      </UspPanel>
    </div>
    <div>
      <UspLink href="/blog" className="plain">
        <UspPanel variant="sm">
          <UspPanelTitle>📚 Ik deel mijn kennis</UspPanelTitle>
          <UspPanelText className="inverted">
            Lees mijn artikelen over React & front-end →
          </UspPanelText>
        </UspPanel>
      </UspLink>
    </div>
  </Container>
)

export default UspBar
