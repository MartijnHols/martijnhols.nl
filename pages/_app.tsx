import { ThemeProvider } from '@emotion/react'
import { AppProps } from 'next/app'
import PortalTarget from '../components/PortalTarget'
import ReactQueryProvider from '../components/ReactQueryProvider'
import * as theme from '../theme'
import GlobalStyles from '../theme/GlobalStyles'
import useForceHtmlLangAttribute from '../utils/useForceHtmlLangAttribute'

const App = ({ Component, pageProps, router }: AppProps) => {
  useForceHtmlLangAttribute(router.asPath.startsWith('/blog') ? 'en' : 'nl')

  return (
    <ReactQueryProvider>
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
