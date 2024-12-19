import { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/helpers'
import { asText } from '@prismicio/richtext'
import LanguageBar from '../../components/LanguageBar'
import PrismicRichText from '../../components/PrismicRichText'
import TopBar from '../../components/TopBar'
import Hero, { reactifyTitle } from './Hero'

interface Props {
  slice: Content.HeroSliceSlice
}

const HeroSlice = ({ slice }: Props) => (
  <>
    <LanguageBar />
    <TopBar />

    <Hero
      preTitle={asText(slice.primary.intro)}
      title={
        slice.primary.reactifyTitle
          ? reactifyTitle(asText(slice.primary.title))
          : asText(slice.primary.title)
      }
      subText={
        isFilled.richText(slice.primary.subText) && (
          <PrismicRichText field={slice.primary.subText} />
        )
      }
    />
  </>
)

export default HeroSlice
