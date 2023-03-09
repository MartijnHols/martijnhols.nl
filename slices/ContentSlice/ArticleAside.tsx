import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'

import mePhoto from '../../static/metemp.png'
import { PrismicArticle } from '../../utils/prismic'
import prismicLinkResolver from '../../utils/prismicLinkResolver'

const Container = styled.aside(
  ({ theme }) => css`
    position: sticky;
    top: ${theme.spacing.x5}px;
  `,
)
const AuthorContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.x2}px;

    @media screen and (min-width: ${theme.breakpoints.DESKTOP}px) {
      display: block;
    }
  `,
)
const PhotoContainer = styled.div(
  ({ theme }) => css`
    width: 120px;
    margin-bottom: ${theme.spacing.x2}px;
    flex: 0 0 auto;
  `,
)
const Photo = styled(Image)`
  clip-path: polygon(100% 0%, 100% calc(100% - 12px), 0% 100%, 0% 12px);
`
const AboutContainer = styled.div``
const Name = styled.div`
  font-weight: bold;
`
const About = styled.div(
  ({ theme }) => css`
    opacity: 0.8;
    margin-bottom: ${theme.spacing.x2}px;

    @media screen and (min-width: ${theme.breakpoints.DESKTOP}px) {
      margin-top: ${theme.spacing.x2}px;
    }
  `,
)
const Links = styled.div(
  ({ theme }) => css`
    margin-bottom: ${theme.spacing.x2}px;
  `,
)
const MoreArticles = styled.div(
  ({ theme }) => css`
    font-weight: bold;
    margin-top: ${theme.spacing.x2}px;
  `,
)

// TODO: Store photo in Prismic
// TODO: Store data in Prismic

interface Props extends ComponentProps<typeof Container> {
  recentArticles: PrismicArticle[]
}

const ArticleAside = ({ recentArticles, ...others }: Props) => (
  <Container {...others}>
    <AuthorContainer>
      <PhotoContainer>
        <Photo
          src={mePhoto}
          alt="Martijn Hols"
          width={120}
          height={(120 / mePhoto.width) * mePhoto.height}
          layout="intrinsic"
        />
      </PhotoContainer>

      <AboutContainer>
        <Name>Martijn Hols</Name>

        <About>
          I'm a freelance React Tech Lead juggling React components for over 7
          years
        </About>

        <Links>
          <Link href="/">About me</Link> / <Link href="#footer">Contact</Link>
        </Links>
      </AboutContainer>
    </AuthorContainer>

    {recentArticles.length > 0 && (
      <>
        <MoreArticles>More articles</MoreArticles>
        {recentArticles.map((article) => (
          <div key={article.id}>
            <Link href={prismicLinkResolver(article)}>
              {article.data.title}
            </Link>
          </div>
        ))}
      </>
    )}
  </Container>
)

export default ArticleAside
