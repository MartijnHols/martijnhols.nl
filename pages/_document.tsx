import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'

export default function Document(props: DocumentProps) {
  return (
    <Html lang={props.dangerousAsPath.startsWith('/gists') ? 'en' : 'nl'}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
