import { useTheme } from '@emotion/react'
import Head from 'next/head'

import { ImageInfo } from '../utils/convertPrismicImage'

/**
 * Head config that should be on every page.
 */
const BaseHead = ({
  title,
  description,
  absoluteUrl,
  image,
}: {
  title: string
  description?: string
  absoluteUrl: string
  image?: ImageInfo
}) => {
  const theme = useTheme()

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      {description && <meta name="description" content={description} />}
      <meta name="theme-color" content={theme.colors.black} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={absoluteUrl} />
      {image?.src && (
        <meta
          property="og:image"
          // itemProp is required for WhatsApp: https://stackoverflow.com/a/45890205/684353
          itemProp="image"
          content={image.src}
        />
      )}
      {image?.alt && <meta property="og:image:alt" content={image.alt} />}
    </Head>
  )
}

export default BaseHead
