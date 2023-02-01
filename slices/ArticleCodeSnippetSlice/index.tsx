import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { asText } from '@prismicio/helpers'
import {
  KeyTextField,
  RichTextField,
  SharedSlice,
  SharedSliceVariation,
} from '@prismicio/types'

export type PrismicArticleCodeSnippetSlice = SharedSlice<
  'article_code_snippet_slice',
  SharedSliceVariation<
    'default',
    {
      language: KeyTextField
      content: RichTextField
    }
  >
>

const Pre = styled.pre(
  ({ theme }) => css`
    font-size: 14px;
    background: ${theme.colors.black};
    padding: ${theme.spacing.x1}px;
  `,
)

interface Props {
  slice: PrismicArticleCodeSnippetSlice
}

const ArticleCodeSnippetSlice = ({ slice }: Props) => (
  // TODO: Coloring / language
  <Pre data-language={slice.primary.language || undefined}>
    {asText(slice.primary.content)}
  </Pre>
)

export default ArticleCodeSnippetSlice
