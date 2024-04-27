import { PrismicRichText as OriginalPrismicRichText } from '@prismicio/react'
import { RichTextMapSerializerFunction } from '@prismicio/richtext'
// @prismicio/types seems outdated and no longer maintained, but Prismic is
// still using it in @prismicio/richtext and so we need it here.
// eslint-disable-next-line import/no-extraneous-dependencies
import { RTImageNode } from '@prismicio/types'
import Image from 'next/image'
import { ComponentProps, Fragment, ReactElement } from 'react'

export const fragmentSerializer: RichTextMapSerializerFunction<
  ReactElement
> = ({ children, key }) => <Fragment key={key}>{children}</Fragment>

const imageSerializer: RichTextMapSerializerFunction<
  ReactElement,
  RTImageNode
> = ({ key, node }) => (
  <Image
    key={key}
    src={node.url}
    width={node.dimensions.width}
    height={node.dimensions.height}
    alt={node.alt || ''}
  />
)

interface Props extends ComponentProps<typeof OriginalPrismicRichText> {
  multiline?: boolean
}

/**
 * Renders PrismicRichText. Removes the wrapper from a non-multiline
 * PrismicRichText so we can control rendering ourselves.
 */
const PrismicRichText = ({
  multiline = false,
  components,
  ...others
}: Props) => (
  <OriginalPrismicRichText
    components={{
      paragraph: !multiline ? fragmentSerializer : undefined,
      image: imageSerializer,
      ...components,
    }}
    {...others}
  />
)

export default PrismicRichText
