import { SharedSlice, SharedSliceVariation } from '@prismicio/types'

export type PrismicPageContentSlice = SharedSlice<
  'page_content',
  SharedSliceVariation<'default', Record<string, never>>
>

interface Props {
  slice: PrismicPageContentSlice
}

const PageContentSlice = ({ slice }: Props) => null

export default PageContentSlice
