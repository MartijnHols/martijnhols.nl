import { AppProps } from 'next/app'
import ForceHtmlLangAttribute from '../components/ForceHtmlLangAttribute'
import GlobalStyles from '../components/GlobalStyles'
import PortalTarget from '../components/PortalTarget'
import TrackPrint from '../components/TrackPrint'

const App = ({ Component, pageProps }: AppProps) => (
  <PortalTarget>
    <GlobalStyles />
    <TrackPrint />
    <ForceHtmlLangAttribute />
    <Component {...pageProps} />
  </PortalTarget>
)

export default App
