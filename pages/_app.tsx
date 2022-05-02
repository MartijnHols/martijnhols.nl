import { AppProps } from "next/app";
import { DehydratedState } from "react-query";

import PrismicProvider from "../components/PrismicProvider";
import ReactQueryProvider from "../components/ReactQueryProvider";
import GlobalStyles from "../theme/GlobalStyles";

type MyAppProps = AppProps<{
  dehydratedState: DehydratedState;
}>;

const App = ({ Component, pageProps }: MyAppProps) => (
  <ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
    <PrismicProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </PrismicProvider>
  </ReactQueryProvider>
);

export default App;
