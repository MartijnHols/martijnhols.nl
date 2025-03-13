import styled from '@emotion/styled'
import Image from 'next/image'
import { breakpoints } from '../theme'
import blueSkyLogoImage from './assets/Bluesky_Logo.svg?url'
import hackerNewsLogoImage from './assets/hacker-news.svg?url'
import linkedInLogoImage from './assets/linkedin.svg?url'
import redditLogoImage from './assets/Reddit_Icon_2Color.svg?url'
import twitterLogoImage from './assets/twitter.svg?url'
import Link from './Link'
import Tooltip from './Tooltip'

const Socials = styled.div`
  flex: 0 1 auto;
  display: flex;
  gap: var(--spacing1);
  flex-wrap: wrap;
  flex-flow: column;

  @media (min-width: ${breakpoints.MOBILE_LARGE}px) {
    flex-flow: row;
    justify-content: flex-end;
    gap: var(--spacing1);
    align-items: center;
  }
`
const SocialsLabel = styled.div`
  font-weight: 800;
  font-size: 0.9em;
  text-transform: uppercase;
`
const SocialsLinks = styled.div`
  display: flex;
  gap: calc(var(--spacing1) * 1.5);
`
const SocialImage = styled(Image)`
  width: 1.75em;
  height: 1.75em;
`

interface Props {
  socials: string[]
}

const BlogArticleSocials = ({ socials }: Props) => (
  <Socials>
    <SocialsLabel>Feedback:</SocialsLabel>
    <SocialsLinks>
      {socials.map((social) => {
        if (social.includes('reddit.com/')) {
          return (
            <Tooltip key={social} content="Reddit">
              <Link key={social} href={social} className="plain">
                <SocialImage src={redditLogoImage} alt="Reddit" />
              </Link>
            </Tooltip>
          )
        }
        if (social.includes('news.ycombinator.com/')) {
          return (
            <Tooltip key={social} content="Hacker News">
              <Link key={social} href={social} className="plain">
                <SocialImage src={hackerNewsLogoImage} alt="Hacker News" />
              </Link>
            </Tooltip>
          )
        }
        if (social.includes('twitter.com/') || social.includes('x.com/')) {
          return (
            <Tooltip key={social} content="Twitter">
              <Link key={social} href={social} className="plain">
                <SocialImage src={twitterLogoImage} alt="Twitter" />
              </Link>
            </Tooltip>
          )
        }
        if (social.includes('bsky.app/')) {
          return (
            <Tooltip key={social} content="Bluesky">
              <Link key={social} href={social} className="plain">
                <SocialImage src={blueSkyLogoImage} alt="Bluesky" />
              </Link>
            </Tooltip>
          )
        }
        if (social.includes('linkedin.com/')) {
          return (
            <Tooltip key={social} content="LinkedIn">
              <Link key={social} href={social} className="plain">
                <SocialImage src={linkedInLogoImage} alt="LinkedIn" />
              </Link>
            </Tooltip>
          )
        }

        return null
      })}
    </SocialsLinks>
  </Socials>
)

export default BlogArticleSocials
