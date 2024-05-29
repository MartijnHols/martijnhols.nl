import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'

export default function Document(props: DocumentProps) {
  return (
    <Html lang={props.dangerousAsPath.startsWith('/gists') ? 'en' : 'nl'}>
      <Head>
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
