import { Content } from '@prismicio/client'

import Angle from '../../components/Angle'

interface Props {
  slice: Content.AngleSliceSlice
}

const AngleSlice = ({ slice }: Props) => (
  <Angle inverted={slice.variation === 'inverted'} />
)

export default AngleSlice
