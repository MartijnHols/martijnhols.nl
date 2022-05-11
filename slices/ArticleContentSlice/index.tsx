import {
  RichTextField,
  SharedSlice,
  SharedSliceVariation,
} from '@prismicio/types'

import PrismicRichText from '../../components/PrismicRichText'

export type PrismicArticleContentSlice = SharedSlice<
  'article_content_slice',
  SharedSliceVariation<
    'default',
    {
      content: RichTextField
    }
  >
>

interface Props {
  slice: PrismicArticleContentSlice
}

const ArticleContentSlice = ({ slice }: Props) => (
  <PrismicRichText field={slice.primary.content} multiline />
)

export default ArticleContentSlice
