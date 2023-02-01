import { ThemeProvider } from '@emotion/react'
import { AppProps } from 'next/app'
import { DehydratedState } from 'react-query'

import ReactQueryProvider from '../components/ReactQueryProvider'
import * as theme from '../theme'
import GlobalStyles from '../theme/GlobalStyles'

type MyAppProps = AppProps<{
  dehydratedState: DehydratedState
}>

const App = ({ Component, pageProps }: MyAppProps) => (
  <ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  </ReactQueryProvider>
)

export default App
