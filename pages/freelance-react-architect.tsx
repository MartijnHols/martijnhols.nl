import styled from '@emotion/styled'
import AngleWithContactButton from '../components/AngleWithContactButton'
import BaseHead from '../components/BaseHead'
import LanguageBar from '../components/LanguageBar'
import Link from '../components/Link'
import PageWrapper from '../components/PageWrapper'
import TopBar from '../components/TopBar'
import ContentSection from '../slices/ContentSlice/ContentSection'
import FooterSlice from '../slices/FooterSlice'
import Hero, { reactifyTitle } from '../slices/HeroSlice/Hero'
import ProjectsSlice from '../slices/ProjectsSlice'
import absoluteUrl from '../utils/absoluteUrl'
import photo from './assets/martijn-hols.jpg'

const AboutMeHeading = styled.h2`
  margin: 0;
`

const Page = () => (
  <PageWrapper>
    <BaseHead
      title="Martijn Hols: React Architect"
      description="Ik ben dé Freelance React Architect die je zoekt. Al 8 jaar gespecialiseerd in React, met veel full stack ervaring. Ik kan veel voor je projecten betekenen."
      absoluteUrl={absoluteUrl('/react-architect')}
      // TODO: ogimage
    />

    <LanguageBar />
    <TopBar />

    <main role="main">
      <Hero
        preTitle="👋 Hoi, ik ben Martijn. Ik ben dé"
        title={reactifyTitle('Freelance React Architect')}
        subText="Met een passie voor React en TypeScript. Ik werk al ruim 8 jaar primair met React en heb meer dan 20 jaar full stack ervaring."
      />
      <ContentSection
        content={
          <>
            <AboutMeHeading>Over mij</AboutMeHeading>
            <p>
              Ik ben een ervaren <strong>Freelance React Developer</strong> met
              meet dan 15 jaar full-stack ervaring. Als Freelance React
              Developer en Architect heb ik aan uiteenlopende projecten gewerkt,
              van opzet tot doorontwikkeling. Ik ben{' '}
              <strong>al ruim 8 jaar gespecialiseerd in React</strong> - zoveel
              diepgaande React-ervaring is zeldzaam! Ik kan veel betekenen voor
              jouw projecten en team.
            </p>
            <p>
              Bij de meeste opdrachten vervul ik de rol van{' '}
              <strong>React Architect</strong>. Ik richt me graag op technische
              uitdagingen, zoals:
            </p>
            <ul>
              <li>
                <Link href="/blog?tag=maintainability">Onderhoudbaarheid</Link>,
                standaardisering en versimpeling
              </li>
              <li>
                <Link href="/blog?tag=security">Security</Link> (dependencies
                e.d.) en performance
              </li>
              <li>
                UX, accessibility en{' '}
                <Link href="/blog?tag=machine-translation">i18n</Link>
              </li>
              <li>
                Backend-integraties (hier komt mijn full-stack ervaring goed van
                pas)
              </li>
              <li>CI/CD pipelines en DX</li>
              <li>Stabiliteit en (E2E) testing</li>
            </ul>
            <p>
              Met een focus op User Experience (UX) als Developer Experience
              (DX) help ik zowel eindgebruikers als ontwikkelaars optimaal te
              werken. Ik streef ernaar teams sterker te maken en zorg ervoor dat
              projecten schaalbaar en toekomstbestendig zijn.
            </p>
            <p>
              Meer weten? Bekijk hieronder mijn projecten, ga naar mijn blog, of
              neem contact op voor mijn CV.
            </p>
            <p>
              <Link href="#footer">Contact</Link>
              {' | '}
              <Link href="/blog">Blog (Engels)</Link>
            </p>
          </>
        }
        image={{
          ...photo,
          alt: 'Martijn Hols',
        }}
        variant="imageLeftInverted"
      />
      <ProjectsSlice />
    </main>
    <AngleWithContactButton inverted />
    <FooterSlice />
  </PageWrapper>
)

export default Page
