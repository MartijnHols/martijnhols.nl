import styled from '@emotion/styled'
import AngleWithContactButton from '../components/AngleWithContactButton'
import BaseHead from '../components/BaseHead'
import ContentSection from '../components/ContentSection'
import FooterSlice from '../components/FooterSection'
import HeroKicker from '../components/HeroKicker'
import HeroSection, { reactifyTitle } from '../components/HeroSection'
import LanguageBar from '../components/LanguageBar'
import Link from '../components/Link'
import PageWrapper from '../components/PageWrapper'
import ProjectsSection from '../components/ProjectsSection'
import TopBar from '../components/TopBar'
import absoluteUrl from '../utils/absoluteUrl'
import photo from './assets/martijn-hols.jpg'
import openGraphImage from './assets/ogimage-freelance-react-developer.png'

const AboutMeHeading = styled.h2`
  margin: 0;
`

const Page = () => (
  <PageWrapper>
    <BaseHead
      title="Martijn Hols: React Developer"
      description="Ik ben dé Freelance React Developer die je zoekt. Al 8 jaar gespecialiseerd in React, met veel full stack ervaring. Ik kan veel voor je projecten betekenen."
      absoluteUrl={absoluteUrl('/')}
      image={openGraphImage}
    />

    <LanguageBar />
    <TopBar />

    <main role="main">
      <HeroSection
        kicker={<HeroKicker />}
        title={reactifyTitle('Freelance React Developer')}
        subText="Ik bouw schaalbare en onderhoudbare applicaties met React en TypeScript, altijd met oog voor een solide architectuur."
      />
      <ContentSection
        content={
          <>
            <AboutMeHeading>Over mij</AboutMeHeading>
            <p>
              Ik ben een ervaren <strong>Freelance React Developer</strong> met
              meet dan 20 jaar full-stack ervaring. Als Freelance React
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
                <Link href="/blog?tag=security">Security</Link> (
                <Link href="/blog?tag=dependencies">dependencies</Link> e.d.) en
                performance
              </li>
              <li>
                <Link href="/blog?tag=ux">UX</Link>,{' '}
                <Link href="/blog?tag=accessibility">accessibility</Link> en{' '}
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
              Meer weten? Bekijk hieronder de{' '}
              <Link href="#projecten">projecten</Link> waar ik aan heb gewerkt,
              ga naar mijn <Link href="/blog">blog</Link>, of neem{' '}
              <Link href="#footer">contact</Link> op.
            </p>
          </>
        }
        image={{
          ...photo,
          alt: 'Martijn Hols',
        }}
        variant="imageLeftInverted"
      />
      <ProjectsSection />
    </main>
    <AngleWithContactButton inverted />
    <FooterSlice />
  </PageWrapper>
)

export default Page
