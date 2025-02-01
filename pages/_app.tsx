import { ThemeProvider } from '@emotion/react'
import { AppProps } from 'next/app'
import PortalTarget from '../components/PortalTarget'
import * as theme from '../theme'
import GlobalStyles from '../theme/GlobalStyles'
import useForceHtmlLangAttribute from '../utils/useForceHtmlLangAttribute'
import useTrackPrint from '../utils/useTrackPrint'

const App = ({ Component, pageProps, router }: AppProps) => {
  useForceHtmlLangAttribute(router.asPath.startsWith('/blog') ? 'en' : 'nl')
  useTrackPrint()

  return (
    <ThemeProvider theme={theme}>
      <PortalTarget>
        <GlobalStyles />
        <Component {...pageProps} />
      </PortalTarget>
    </ThemeProvider>
  )
}

export default App
