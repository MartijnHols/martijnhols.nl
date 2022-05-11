import styled from '@emotion/styled'
import { SliceZone, usePrismicClient } from '@prismicio/react'
import {
  FilledLinkToDocumentField,
  RelationField,
  SharedSlice,
  SharedSliceVariation,
} from '@prismicio/types'
import { useQuery } from 'react-query'

import { components } from '..'
import Container from '../../components/Container'
import { PrefetchContext } from '../../utils/prefetchSliceSubQueries'
import { getArticle, PrismicArticle } from '../../utils/prismic'

const Article = styled.article``
const StyledContainer = styled(Container)`
  padding-top: 100px;
  padding-bottom: 100px;
  // TODO: Make h1 smaller
  /* max-width: 800px; */
`
const Title = styled.h1`
  line-height: 1.1;
  font-size: 110px;
`

export type PrismicArticleSlice = SharedSlice<
  'article_slice',
  SharedSliceVariation<
    'default',
    {
      article: RelationField<'article'>
    }
  >
>

const useArticle = (articleId: string) => {
  const prismicClient = usePrismicClient()
  const { data } = useQuery<PrismicArticle>(['article', articleId], () =>
    getArticle(prismicClient, articleId),
  )
  return data?.data
}

interface Props {
  slice: PrismicArticleSlice
}

const ArticleSlice = ({ slice }: Props) => {
  const articleId = (slice.primary.article as FilledLinkToDocumentField).id
  const article = useArticle(articleId)

  if (!article) {
    return null
  }

  return (
    <Article>
      <StyledContainer className="inverted">
        <header>
          <Title>{article.name}</Title>
        </header>

        <SliceZone slices={article.slices} components={components} />
      </StyledContainer>
    </Article>
  )
}
ArticleSlice.prefetch = async ({
  prismicClient,
  queryClient,
  slice,
}: PrefetchContext<PrismicArticleSlice>) => {
  if (slice.primary.article.link_type !== 'Document') {
    return
  }
  const articleId = (slice.primary.article as FilledLinkToDocumentField).id

  await queryClient.prefetchQuery(['article', articleId], () =>
    getArticle(prismicClient, articleId),
  )
}

export default ArticleSlice
