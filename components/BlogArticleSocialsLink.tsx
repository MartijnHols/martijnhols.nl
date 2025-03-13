import styled from '@emotion/styled'
import Image, { StaticImageData } from 'next/image'
import Link from './Link'
import Tooltip from './Tooltip'

const SocialImage = styled(Image)`
  width: 1.75em;
  height: 1.75em;
`

interface Props2 {
  label: string
  logo: StaticImageData
  href: string
}

const BlogArticleSocialsLink = ({ label, href, logo }: Props2) => (
  <Tooltip content={label}>
    {({
      props: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        role,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tabIndex,
        ...props
      },
    }) => (
      <Link href={href} className="plain" {...props}>
        <SocialImage src={logo} alt={label} />
      </Link>
    )}
  </Tooltip>
)

export default BlogArticleSocialsLink
