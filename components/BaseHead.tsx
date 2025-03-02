import Head from 'next/head'
import * as theme from '../theme'
import absoluteUrl from '../utils/absoluteUrl'
import ImageInfo from '../utils/ImageInfo'

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
}) => (
  <Head>
    <title>{title}</title>
    <link rel="icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" href="/favicon.png" sizes="64x64" />
    {description && <meta name="description" content={description} />}
    <meta name="theme-color" content={theme.colors.black} />
    <meta property="og:type" content={type} />
    <meta property="og:site_name" content="Martijn Hols" />
    <meta property="og:title" content={title} />
    {description && <meta property="og:description" content={description} />}
    <meta property="og:url" content={absoluteUrlProp} />
    {image?.src && (
      <>
        <meta
          property="og:image"
          // itemProp is required for WhatsApp: https://stackoverflow.com/a/45890205/684353
          itemProp="image"
          content={
            image.src.startsWith('http') ? image.src : absoluteUrl(image.src)
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
        <meta property="og:image:alt" content={image.alt ?? title} />
        <meta name="twitter:card" content="summary_large_image" />
      </>
    )}
    <meta name="twitter:site" content="@MartijnHols" />
    <meta name="twitter:creator" content="@MartijnHols" />
    <link rel="canonical" href={absoluteUrlProp} />
  </Head>
)

export default BaseHead
