import { ThemeProvider } from '@emotion/react'
import { AppProps } from 'next/app'
import { DehydratedState } from 'react-query'
import PortalTarget from '../components/PortalTarget'
import ReactQueryProvider from '../components/ReactQueryProvider'
import * as theme from '../theme'
import GlobalStyles from '../theme/GlobalStyles'
import useForceHtmlLangAttribute from '../utils/useForceHtmlLangAttribute'

type MyAppProps = AppProps<{
  dehydratedState: DehydratedState
}>

const App = ({ Component, pageProps, router }: MyAppProps) => {
  useForceHtmlLangAttribute(router.asPath.startsWith('/gists') ? 'en' : 'nl')

  return (
    <ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
      <ThemeProvider theme={theme}>
        <PortalTarget>
          <GlobalStyles />
          <Component {...pageProps} />
        </PortalTarget>
      </ThemeProvider>
    </ReactQueryProvider>
  )
}

export default App
