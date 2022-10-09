import styled from '@emotion/styled'
import {
  LinkToMediaField,
  SharedSlice,
  SharedSliceVariation,
} from '@prismicio/types'

import Link from '../../components/Link'
import { spacing } from '../../theme'

const Container = styled.div`
  margin: ${spacing.x10}px ${spacing.x2}px;
  text-align: center;
`

export type PrismicFileDownloadSlice = SharedSlice<
  'file_download',
  SharedSliceVariation<
    'default',
    {
      file: LinkToMediaField
    }
  >
>

interface Props {
  slice: PrismicFileDownloadSlice
}

const FileDownloadSlice = ({ slice }: Props) => {
  if (!('url' in slice.primary.file)) {
    return null
  }

  return (
    <Container>
      <Link href={slice.primary.file.url}>Download</Link>
    </Container>
  )
}

export default FileDownloadSlice
