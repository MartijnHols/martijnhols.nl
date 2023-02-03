import Head from 'next/head'

import absoluteUrl from '../utils/absoluteUrl'
import { PrismicPage } from '../utils/prismic'
import prismicLinkResolver from '../utils/prismicLinkResolver'

const defaultHrefLang = 'en'
const prismicLocaleToHrefLang = (prismicLocale: string) => {
  switch (prismicLocale) {
    case 'en-us':
      return 'en'
    case 'nl-nl':
      return 'nl'
  }
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  page: PrismicPage<any>
}

// TODO: Move to sitemap
const HrefLangHead = ({ page }: Props) => (
  <Head>
    {[page, ...page.alternate_languages].map((alternate) => {
      let hrefLang = prismicLocaleToHrefLang(alternate.lang)
      if (hrefLang === defaultHrefLang) {
        hrefLang = 'x-default'
      }

      return (
        <link
          // Key is also used by Head to remove duplicates, so this needs to be globally unique
          key={`alternate-${alternate.lang}`}
          rel="alternate"
          hrefLang={hrefLang}
          href={absoluteUrl(prismicLinkResolver(alternate))}
        />
      )
    })}
  </Head>
)

export default HrefLangHead
