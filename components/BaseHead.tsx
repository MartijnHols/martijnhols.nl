import { useTheme } from '@emotion/react'
import Head from 'next/head'
import absoluteUrl from '../utils/absoluteUrl'
import { ImageInfo } from '../utils/convertPrismicImage'

/**
 * Head config that should be on every page.
 */
const BaseHead = ({
  title,
  description,
  absoluteUrl: absoluteUrlProp,
  image,
  type = 'website',
}: {
  title: string
  description?: string
  absoluteUrl: string
  image?: ImageInfo
  type?: 'website' | 'article'
}) => {
  const theme = useTheme()

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      {description && <meta name="description" content={description} />}
      <meta name="theme-color" content={theme.colors.black} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Martijn Hols" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={absoluteUrlProp} />
      {image?.src && (
        <meta
          property="og:image"
          // itemProp is required for WhatsApp: https://stackoverflow.com/a/45890205/684353
          itemProp="image"
          content={
            image.src.startsWith('http') ? image.src : absoluteUrl(image.src)
          }
        />
      )}
      {image?.alt && <meta property="og:image:alt" content={image.alt} />}
      <link rel="canonical" href={absoluteUrlProp} />
    </Head>
  )
}

export default BaseHead
