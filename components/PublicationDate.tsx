import styled from '@emotion/styled'

import getRelativeTimeStringDays from '../utils/getRelativeTimeStringDays'
import { PublicationDate as PublicationDateType } from './Gist'
import Tooltip from './Tooltip'

const Time = styled.time`
  cursor: help;
`

interface Props {
  date: PublicationDateType
}

const PublicationDate = ({ date }: Props) => {
  const publishedAt = new Date(date)
  const relativeTime = getRelativeTimeStringDays(publishedAt)

  return (
    <Tooltip
      // Making a human readable date would be fairly trivial, but I actually
      // prefer an ISO date since this is a technical blog and it's a fun quirk
      content={date}
    >
      {(props) => (
        <Time {...props} dateTime={date}>
          {relativeTime}
        </Time>
      )}
    </Tooltip>
  )
}

export default PublicationDate
