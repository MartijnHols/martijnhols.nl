import { AppProps } from "next/app";

import PrismicProvider from "../components/PrismicProvider";
import GlobalStyles from "../theme/GlobalStyles";

type MyAppProps = AppProps<{
  isPreview?: boolean;
}>;

const App = ({ Component, pageProps }: MyAppProps) => (
  <PrismicProvider isPreview={pageProps?.isPreview}>
    <GlobalStyles />
    <Component {...pageProps} />
  </PrismicProvider>
);

export default App;
