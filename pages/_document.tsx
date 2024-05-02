import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'

export default function Document(props: DocumentProps) {
  return (
    <Html lang={props.dangerousAsPath.startsWith('/gists') ? 'en' : 'nl'}>
      <Head>
        <script
          defer
          data-domain="martijnhols.nl"
          src="/hoi/js/script.js"
          data-api="/hoi/api/event"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
