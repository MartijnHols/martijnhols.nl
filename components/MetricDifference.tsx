import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Container = styled.span`
  border-radius: 0.3em;
  padding: 0.2em 0.4em;
  font-weight: 500;
`
const positiveCss = css`
  background: #077c1f;
  color: #f3fcf4;
`
const negativeCss = css`
  background: #ca081b;
  color: #fde9e8;
`

interface Props {
  value: number
  previous: number
}

const MetricDifference = ({ value, previous }: Props) => {
  const difference = value - previous
  const percentage = Math.abs(difference / previous) * 100
  const roundedPercentage = (Math.round(percentage * 100) / 100).toFixed(2)
  const isPositive = difference > 0

  return (
    <Container css={isPositive ? positiveCss : negativeCss}>
      {isPositive ? '↑' : '↓'}
      {roundedPercentage}%
    </Container>
  )
}

export default MetricDifference
