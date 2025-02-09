import styled from '@emotion/styled'
import { BlogArticleTag } from './BlogArticleMeta'
import Tooltip from './Tooltip'

const Container = styled.div`
  display: inline-block;
  background: var(--black);
  color: var(--white);
  padding: 4px 6px;
  box-shadow: -4px 4px 0 0px var(--yellow);
  margin-left: -2px;
  margin-bottom: 2px;

  &[data-value='open source'] {
    background: #fff;
    color: var(--black);
    box-shadow:
        // Inner-border so the div doesn't get larger
      inset 0 0 0 2px var(--black),
      -4px 4px 0 0px var(--yellow);
  }
  &[data-value='how-to'] {
    background: var(--white);
    color: var(--black);
    border-color: var(--black);
    box-shadow:
        // Inner-border so the div doesn't get larger
      inset 0 0 0 2px var(--black),
      -4px 4px 0 0px var(--yellow);
  }

  transition: transform 120ms ease-out;
  :hover {
    transform: scale(1.2) rotate(-1deg);
  }
`

interface Props {
  children: string | BlogArticleTag
  className?: string
}

const Tag = ({ children, className }: Props) => {
  if (children === BlogArticleTag.HowTo) {
    return (
      <Tooltip content="How-tos are technical articles, often centered around code samples. These are likely only relevant for people who run into the challenges they cover.">
        {({ props }) => (
          <Container
            {...props}
            data-value={children.toLowerCase()}
            className={className}
          >
            {children}
          </Container>
        )}
      </Tooltip>
    )
  }

  return (
    <Container data-value={children.toLowerCase()} className={className}>
      {children}
    </Container>
  )
}

export default Tag
