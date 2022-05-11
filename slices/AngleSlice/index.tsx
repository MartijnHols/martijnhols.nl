import { SharedSlice, SharedSliceVariation } from '@prismicio/types'

import Angle from '../../components/Angle'

export type PrismicAngleSlice = SharedSlice<
  'angle_slice',
  SharedSliceVariation<'default'> | SharedSliceVariation<'inverted'>
>

interface Props {
  slice: PrismicAngleSlice
}

const AngleSlice = ({ slice }: Props) => (
  <Angle inverted={slice.variation === 'inverted'} />
)

export default AngleSlice
