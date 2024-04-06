import { Content } from '@prismicio/client'

import AngleWithContaintButton from '../../components/AngleWithContaintButton'

interface Props {
  slice: Content.AngleSliceSlice
}

const AngleSlice = ({ slice }: Props) => (
  <AngleWithContaintButton inverted={slice.variation === 'inverted'} />
)

export default AngleSlice
