import { Content } from '@prismicio/client'

import PrismicRichText from '../../components/PrismicRichText'

interface Props {
  slice: Content.ArticleContentSliceSlice
}

const ArticleContentSlice = ({ slice }: Props) => (
  <PrismicRichText field={slice.primary.content} multiline />
)

export default ArticleContentSlice
