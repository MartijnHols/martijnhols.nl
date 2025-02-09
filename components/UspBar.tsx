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
const UspPanel = styled(Panel)`
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
      color: var(--yellow50);
    }
  }
`
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
    text-wrap: pretty;

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
          8+ jaar{' '}
          <Annotation
            annotation={
              <>
                <p>
                  Ik zag al vroeg het potentieel van React en heb me er meer dan
                  8 jaar in gespecialiseerd, waardoor ik de vele nuances en
                  complexiteiten volledig beheers.
                </p>
                <p>
                  Mijn passie ligt bij technische webontwikkeling (wat ik
                  beschouw als verwant aan softwarearchitectuur). In plaats van
                  alleen designs te implementeren, werk ik samen met
                  ontwikkelaars, designers en product owners om robuuste
                  architecturen te creëren die UX en DX verbeteren en teams
                  helpen efficiënter te ontwikkelen.
                </p>
              </>
            }
          >
            React-specialist
          </Annotation>{' '}
          &amp;{' '}
          <span
            css={css`
              white-space: nowrap;
            `}
          >
            20+ jaar{' '}
            <Annotation
              annotation={
                <>
                  <p>
                    Ik heb mezelf vanaf 2004 webontwikkeling aangeleerd met PHP
                    4 en klassiek JavaScript in het tijdperk van frames en XHR.
                    Het oprichten van een groot PHP/JS-project (Elite Avengers)
                    en mijn eerste bedrijf wakkerde mijn passie voor
                    webontwikkeling en ondernemerschap aan.
                  </p>
                  <p>
                    Aanvankelijk dacht ik dat backend-ontwikkeling mijn ware
                    roeping was. Ik verdiepte me in design patterns, OOP en
                    andere backend-principes. Tijdens mijn studie aan de
                    Hogeschool van Arnhem en Nijmegen ontdekte ik echter mijn
                    echte passie: technische webontwikkeling (wat ik beschouw
                    als verwant aan softwarearchitectuur).
                  </p>
                  <p>
                    Door de jaren heen heb ik meerdere projecten en bedrijven
                    opgericht, waarbij ik voor alles verantwoordelijk ben
                    geweest: van frontend en backend tot ondernemen en
                    communities bouwen. Mijn liefde voor het web heeft me
                    uiteindelijk naar JS/TS als backendtaal geleid, hoewel ik
                    ook veel ervaring heb met C# en Swift.
                  </p>
                  <p>
                    Tegenwoordig richt ik me uitsluitend op JavaScript en
                    TypeScript voor klanten. Ik streef ernaar om tot de besten
                    te behoren, en dat betekent specialisatie. Mijn full-stack
                    achtergrond stelt me in staat om frontend en backend
                    naadloos met elkaar te laten samenwerken en architecturen te
                    ontwerpen die zowel ontwikkelaars als gebruikers optimaal
                    ondersteunen.
                  </p>
                </>
              }
            >
              full-stack
            </Annotation>{' '}
            ervaring.
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
