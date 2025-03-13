import styled from '@emotion/styled'
import { breakpoints } from '../theme'
import blueSkyLogoImage from './assets/Bluesky_Logo.svg?url'
import hackerNewsLogoImage from './assets/hacker-news.svg?url'
import linkedInLogoImage from './assets/linkedin.svg?url'
import redditLogoImage from './assets/Reddit_Icon_2Color.svg?url'
import twitterLogoImage from './assets/twitter.svg?url'
import SocialLink from './BlogArticleSocialsLink'

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
            <SocialLink
              key={social}
              href={social}
              label="Reddit"
              logo={redditLogoImage}
            />
          )
        }
        if (social.includes('news.ycombinator.com/')) {
          return (
            <SocialLink
              key={social}
              href={social}
              label="Hacker News"
              logo={hackerNewsLogoImage}
            />
          )
        }
        if (social.includes('twitter.com/') || social.includes('x.com/')) {
          return (
            <SocialLink
              key={social}
              href={social}
              label="Twitter"
              logo={twitterLogoImage}
            />
          )
        }
        if (social.includes('bsky.app/')) {
          return (
            <SocialLink
              key={social}
              href={social}
              label="Bluesky"
              logo={blueSkyLogoImage}
            />
          )
        }
        if (social.includes('linkedin.com/')) {
          return (
            <SocialLink
              key={social}
              href={social}
              label="LinkedIn"
              logo={linkedInLogoImage}
            />
          )
        }

        return null
      })}
    </SocialsLinks>
  </Socials>
)

export default BlogArticleSocials
