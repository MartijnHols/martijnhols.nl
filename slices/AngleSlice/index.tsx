import { Content } from '@prismicio/client'

import AngleWithContactButton from '../../components/AngleWithContactButton'

interface Props {
  slice: Content.AngleSliceSlice
}

const AngleSlice = ({ slice }: Props) => (
  <AngleWithContactButton inverted={slice.variation === 'inverted'} />
)

export default AngleSlice
