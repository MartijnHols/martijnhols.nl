import getRelativeTimeStringDays from '../utils/getRelativeTimeStringDays'
import { PublicationDate as PublicationDateType } from './Gist'

interface Props {
  date: PublicationDateType
}

const PublicationDate = ({ date }: Props) => {
  const publishedAt = new Date(date)
  const relativeTime = getRelativeTimeStringDays(publishedAt)

  return (
    <time dateTime={date} title={date}>
      {relativeTime}
    </time>
  )
}

export default PublicationDate
