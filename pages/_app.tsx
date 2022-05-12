import { AppProps } from 'next/app'
import { DehydratedState } from 'react-query'

import ReactQueryProvider from '../components/ReactQueryProvider'
import GlobalStyles from '../theme/GlobalStyles'

type MyAppProps = AppProps<{
  dehydratedState: DehydratedState
}>

const App = ({ Component, pageProps }: MyAppProps) => (
  <ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
    <GlobalStyles />
    <Component {...pageProps} />
  </ReactQueryProvider>
)

export default App
