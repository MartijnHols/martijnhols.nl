import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'

export default function Document(props: DocumentProps) {
  return (
    <Html lang={props.dangerousAsPath.startsWith('/gists') ? 'en' : 'nl'}>
      <Head>
        <script
          defer
          data-domain="martijnhols.nl"
          src="https://plausible.io/js/script.js"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
