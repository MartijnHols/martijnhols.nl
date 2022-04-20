import { AppProps } from 'next/app'

import GlobalStyles from '../theme/GlobalStyles'
import PrismicProvider from '../components/PrismicProvider'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <PrismicProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </PrismicProvider>
  )
}

export default App
