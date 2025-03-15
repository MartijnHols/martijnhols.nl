import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  documentGetInitialProps,
} from '@mui/material-nextjs/v15-pagesRouter'
import {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext,
} from 'next/document'

interface Props extends DocumentProps, DocumentHeadTagsProps {}

export default function Document(props: Props) {
  return (
    <Html lang={props.dangerousAsPath.startsWith('/blog') ? 'en' : 'nl'}>
      <Head>
        <DocumentHeadTags {...props} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed"
          href="/rss.xml"
        />
        <script
          defer
          data-domain="martijnhols.nl"
          src="/hoi/script.js"
          data-api="/hoi/event"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

Document.getInitialProps = (ctx: DocumentContext) =>
  documentGetInitialProps(ctx)
