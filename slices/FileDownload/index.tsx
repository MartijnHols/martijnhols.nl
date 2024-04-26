import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Content } from '@prismicio/client'
import Link from '../../components/Link'

const Container = styled.div(
  ({ theme }) => css`
    margin: ${theme.spacing.x10}px ${theme.spacing.x2}px;
    text-align: center;
  `,
)

interface Props {
  slice: Content.FileDownloadSlice
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
