import { AppProps } from "next/app";
import { DehydratedState } from "react-query";
import LazyHydrate from "react-lazy-hydration";

import PrismicProvider from "../components/PrismicProvider";
import ReactQueryProvider from "../components/ReactQueryProvider";
import GlobalStyles from "../theme/GlobalStyles";

type MyAppProps = AppProps<{
  dehydratedState: DehydratedState;
}>;

const App = ({ Component, pageProps }: MyAppProps) => (
  <LazyHydrate whenIdle>
    <ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
      <PrismicProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </PrismicProvider>
    </ReactQueryProvider>
  </LazyHydrate>
);

export default App;
