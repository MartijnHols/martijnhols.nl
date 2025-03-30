import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { breakpoints } from '../theme'
import blueSkyLogoImage from './assets/Bluesky_Logo.svg?url'
import hackerNewsLogoImage from './assets/hacker-news.svg?url'
import linkedInLogoImage from './assets/linkedin.svg?url'
import mastodonLogoImage from './assets/mastodon-logo.svg?url'
import redditLogoImage from './assets/Reddit_Icon_2Color.svg?url'
import rssFeedImage from './assets/rss.svg?url'
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
const RssFeedContainer = styled.div``
const rssFeedContainerSeparatorCss = css`
  padding-left: var(--spacing1);
  position: relative;

  ::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    height: 1em;
    background-color: var(--black);
  }
`

interface Props {
  socials: string[]
}

const BlogArticleSocials = ({ socials }: Props) => (
  <Socials>
    {socials.length > 0 && <SocialsLabel>Feedback:</SocialsLabel>}
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
        if (social.includes('mastodon.social/')) {
          return (
            <SocialLink
              key={social}
              href={social}
              label="Mastodon"
              logo={mastodonLogoImage}
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

      <RssFeedContainer
        css={socials.length > 0 && rssFeedContainerSeparatorCss}
      >
        <SocialLink href="/rss.xml" label="RSS Feed" logo={rssFeedImage} />
      </RssFeedContainer>
    </SocialsLinks>
  </Socials>
)

export default BlogArticleSocials
