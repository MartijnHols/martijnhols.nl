import { AppProps } from "next/app";
import { DehydratedState } from "react-query";
import LazyHydrate from "react-lazy-hydration";

import ReactQueryProvider from "../components/ReactQueryProvider";
import GlobalStyles from "../theme/GlobalStyles";

type MyAppProps = AppProps<{
  dehydratedState: DehydratedState;
}>;

const App = ({ Component, pageProps }: MyAppProps) => (
  <LazyHydrate whenIdle>
    <ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ReactQueryProvider>
  </LazyHydrate>
);

export default App;
