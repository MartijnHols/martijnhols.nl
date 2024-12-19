import styled from '@emotion/styled'
import { Content } from '@prismicio/client'
import PrismicRichText from '../../components/PrismicRichText'
import convertPrismicImage from '../../utils/convertPrismicImage'
import ContentSection from './ContentSection'

const Title = styled.h2`
  margin: 0;
`

interface Props {
  slice: Content.ContentSliceSlice
}

const ContentSlice = ({ slice }: Props) => {
  const image =
    (slice.variation === 'imageLeft' ||
      slice.variation === 'imageLeftInverted') &&
    convertPrismicImage(slice.primary.image)

  return (
    <ContentSection
      variant={slice.variation}
      image={image || undefined}
      content={
        <PrismicRichText
          field={slice.primary.content}
          multiline
          components={{
            heading1: ({ key, children }) => (
              <Title key={key}>{children}</Title>
            ),
          }}
        />
      }
    />
  )
}

export default ContentSlice
