import styled from '@emotion/styled'
import Annotation from './Annotation'
import { PublicationDate } from './BlogArticleMeta'

const StyledAnnotation = styled(Annotation)`
  font-style: normal;
  text-decoration: none;
`

interface Props {
  date: PublicationDate
}

const BlogArticlePublicationDate = ({ date }: Props) => {
  const dateObject = new Date(date)
  // I love the simplicity and usability of a simple date like this; I reckon
  // March 2025 is easier to use than "a month ago" or "a year ago"
  const dateString = new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(dateObject)

  return (
    <StyledAnnotation
      // Making a human readable date would be fairly trivial, but I actually
      // prefer an ISO date since this is a technical blog and I think it's a
      // fun quirk
      annotation={date}
    >
      <time dateTime={date}>{dateString}</time>
    </StyledAnnotation>
  )
}

export default BlogArticlePublicationDate
