import styled from '@emotion/styled'
import { GetStaticProps } from 'next'
import AngleTop from '../components/AngleTop'
import AngleWithContactButton from '../components/AngleWithContactButton'
import BaseHead from '../components/BaseHead'
import ContentSection from '../components/ContentSection'
import FooterSlice from '../components/FooterSection'
import HeroKicker from '../components/HeroKicker'
import HeroSection from '../components/HeroSection'
import LanguageBar from '../components/LanguageBar'
import Link from '../components/Link'
import PageWrapper from '../components/PageWrapper'
import ProjectsSection from '../components/ProjectsSection'
import TopBar from '../components/TopBar'
import absoluteUrl from '../utils/absoluteUrl'
import generateAll from '../utils/generateAll'
import photo from './assets/martijn-hols2.jpg'
import openGraphImage from './assets/ogimage-freelance-react-developer.png'

export const getStaticProps: GetStaticProps = async () => {
  await generateAll()

  return {
    props: {},
  }
}

const AboutMeHeading = styled.h2`
  margin: 0;
`

const Page = () => (
  <PageWrapper>
    <BaseHead
      title="Martijn Hols: Freelance React Developer"
      description="Met 20+ jaar full-stack ervaring, waarvan 10+ jaar gespecialiseerd in React, help ik teams met complexe front-end vraagstukken en architectuur. Laten we kennismaken!"
      absoluteUrl={absoluteUrl('/')}
      image={openGraphImage}
    />

    <LanguageBar />
    <TopBar />

    <main role="main">
      <HeroSection
        kicker={<HeroKicker />}
        title="Freelance React Developer"
        titleNote="en Architect"
        subText="✅ Gespecialiseerd in React-architectuur en het vereenvoudigen van complexe applicaties."
      />
      <ContentSection
        content={
          <>
            <AboutMeHeading>Over mij</AboutMeHeading>
            <p>
              Hoi! Ik ben een ervaren{' '}
              <strong>Freelance Senior React Developer en Architect</strong>. Ik
              ontwikkel sinds 2004 full-stack websites en applicaties en ben{' '}
              <strong>al ruim 10 jaar gespecialiseerd in React</strong>. Sinds
              2018 werk ik uitsluitend als zelfstandige aan React-opdrachten,
              waarbij ik meerdere grote projecten heb opgezet en doorontwikkeld.
            </p>
            <p>
              Mijn specialisme is{' '}
              <Link href="/freelance-react-architect">
                <strong>React-architectuur</strong>
              </Link>
              . Ik werk graag aan technische keuzes, een heldere
              projectstructuur en het vereenvoudigen van complexe applicaties.
              Ik richt me graag op technische uitdagingen, zoals:
            </p>
            <ul>
              <li>TypeScript en service workers</li>
              <li>
                <Link href="/blog?tag=maintainability">Onderhoudbaarheid</Link>,
                standaardisering en versimpeling
              </li>
              <li>
                <Link href="/blog?tag=security">Security</Link> (
                <Link href="/blog?tag=dependencies">dependencies</Link> e.d.) en{' '}
                <Link href="/blog?tag=performance">performance</Link>
              </li>
              <li>
                <Link href="/blog?tag=ux">UX</Link>,{' '}
                <Link href="/blog?tag=accessibility">accessibility</Link> en{' '}
                <Link href="/blog?tag=machine-translation">i18n</Link>
              </li>
              <li>
                <Link href="/blog?tag=cloud">Backend</Link>-integraties (hier
                komt mijn full-stack ervaring goed van pas)
              </li>
              <li>
                <Link href="/blog?tag=ci-cd">CI/CD pipelines</Link> en{' '}
                <Link href="/blog?tag=dx">DX</Link>
              </li>
              <li>Stabiliteit en (E2E) testing</li>
            </ul>
            <p>
              Daarnaast denk ik graag mee over het ontwerp van schermen en hoe
              gebruikers ermee werken. Daarbij heb ik een focus op zowel User
              Experience (UX) als Developer Experience (DX), zodat gebruikers en
              ontwikkelaars optimaal kunnen werken met en aan het project.
            </p>
            <p>
              Ik vind het belangrijk om kennis te delen, het team sterker te
              maken en het project beter achter te laten dan ik het aantrof.
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
    <AngleWithContactButton angle={AngleTop} />
    <FooterSlice />
  </PageWrapper>
)

export default Page
