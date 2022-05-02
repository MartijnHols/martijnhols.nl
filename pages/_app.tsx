import { AppProps } from "next/app";
import { DehydratedState } from "react-query";

import PrismicProvider from "../components/PrismicProvider";
import ReactQueryProvider from "../components/ReactQueryProvider";
import GlobalStyles from "../theme/GlobalStyles";

type MyAppProps = AppProps<{
  isPreview?: boolean;
  dehydratedState: DehydratedState;
}>;

const App = ({ Component, pageProps }: MyAppProps) => (
  <ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
    <PrismicProvider isPreview={pageProps?.isPreview}>
      <GlobalStyles />
      <Component {...pageProps} />
    </PrismicProvider>
  </ReactQueryProvider>
);

export default App;
