import { EmotionCache } from '@emotion/cache'
import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter'
import { AppProps } from 'next/app'
import ForceHtmlLangAttribute from '../components/ForceHtmlLangAttribute'
import GlobalStyles from '../components/GlobalStyles'
import PortalTarget from '../components/PortalTarget'
import TrackPrint from '../components/TrackPrint'

interface Props extends AppProps {
  // Only available server-side
  emotionCache?: EmotionCache
}

const App = ({ Component, pageProps, emotionCache }: Props) => (
  <AppCacheProvider emotionCache={emotionCache}>
    <PortalTarget>
      <GlobalStyles />
      <TrackPrint />
      <ForceHtmlLangAttribute />
      <Component {...pageProps} />
    </PortalTarget>
  </AppCacheProvider>
)

export default App
