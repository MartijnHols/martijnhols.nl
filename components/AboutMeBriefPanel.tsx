import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { ComponentProps } from 'react'
import Annotation from './Annotation'
import GithubLogoImage from './assets/github-mark-white.svg'
import meSquaredImage from './assets/martijn-hols-sq.png'
import TwitterLogoImage from './assets/twitter.svg'
import Link from './Link'
import Panel from './Panel'

const ImageTextContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: 1em;
    flex-flow: column;
    padding: 0.25em 0;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      flex-flow: row;
    }
  `,
)
const PhotoImage = styled(Image)`
  border-radius: 50%;
`
const SocialContainer = styled.div`
  float: right;
  display: flex;
  gap: 0.5em;
`
const socialImageCss = css`
  height: 1.6em;
`

type Props = Omit<ComponentProps<typeof Panel>, 'children'>

const AboutMeBriefPanel = ({ className, ...others }: Props) => (
  <Panel {...others} className={`inverted ${className}`} variant="sm">
    <ImageTextContainer>
      <PhotoImage
        src={meSquaredImage}
        alt="Martijn Hols"
        width={100}
        height={100}
      />
      <div>
        Hi, I'm Martijn Hols, a{' '}
        <Link href="/freelance-react-architect">
          <strong>Freelance React Architect</strong>
        </Link>{' '}
        with over{' '}
        <Annotation
          annotation={
            <>
              <p>
                I recognized React's potential early on and have specialized in
                it for over 8 years, allowing me to master its many intricacies.
              </p>
              <p>
                My true strength lies in technical web development (which I
                reckon is close to software architecture). Rather than merely
                implementing designs, I collaborate closely with front-end and
                back-end developers, designers, and product owners to craft
                holistic architectures that serve both users and developers
                effectively, while strengthening the teams behind them.
              </p>
            </>
          }
        >
          8 years of experience in React
        </Annotation>{' '}
        and{' '}
        <Annotation
          annotation={
            <>
              <p>
                Initially self-taught, I started in 2004 with PHP 4 and wrestled
                with classic JavaScript during the XHR era. Founding a large
                PHP/JS project (Elite Avengers) back then kickstarted my passion
                for web development and entrepreneurship.
              </p>
              <p>
                For a long time, I thought backend development was my calling. I
                dived deep into design patterns, OOP and other backend
                principles. However, during my time at the HAN University of
                Applied Sciences, I discovered what true passion was: technical
                web development (which I reckon is close to software
                architecture).
              </p>
              <p>
                Over the years, I've founded several projects, handling
                everything from frontend and backend to business and community
                building. My passion for the web has made me opt for JS/TS for
                those backends, though in other projects I've also worked
                extensively with languages like C# and Swift.
              </p>
              <p>
                Nowadays, for clients, I focus exclusively on JS/TS. I want to
                be among the best at what I do, and that means specialization.
                My background in backend and full-stack development helps me
                bridge the gap between frontend and backend, enabling me to
                design hollistic architectures that serve both users and
                developers effectively.
              </p>
            </>
          }
        >
          20 years in full-stack development
        </Annotation>
        . I specialize in building scalable and maintainable architectures using{' '}
        React and TypeScript, empowering teams to build efficiently.
        <SocialContainer>
          <Link
            href="https://twitter.com/MartijnHols"
            aria-label="Twitter"
            className="plain"
          >
            <TwitterLogoImage aria-hidden css={socialImageCss} />
          </Link>
          <Link
            href="https://github.com/MartijnHols"
            aria-label="GitHub"
            className="plain"
          >
            <GithubLogoImage aria-hidden css={socialImageCss} />
          </Link>
        </SocialContainer>
      </div>
    </ImageTextContainer>
  </Panel>
)

export default AboutMeBriefPanel
