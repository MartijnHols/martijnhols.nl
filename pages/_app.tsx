import { AppProps } from 'next/app'
import PortalTarget from '../components/PortalTarget'
import GlobalStyles from '../theme/GlobalStyles'
import useForceHtmlLangAttribute from '../utils/useForceHtmlLangAttribute'
import useTrackPrint from '../utils/useTrackPrint'

const App = ({ Component, pageProps, router }: AppProps) => {
  useForceHtmlLangAttribute(router.asPath.startsWith('/blog') ? 'en' : 'nl')
  useTrackPrint()

  return (
    <PortalTarget>
      <GlobalStyles />
      <Component {...pageProps} />
    </PortalTarget>
  )
}

export default App
