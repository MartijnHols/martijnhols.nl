import { AppProps } from "next/app";

import PrismicProvider from "../components/PrismicProvider";
import GlobalStyles from "../theme/GlobalStyles";

const App = ({ Component, pageProps }: AppProps) => (
  <PrismicProvider>
    <GlobalStyles />
    <Component {...pageProps} />
  </PrismicProvider>
);

export default App;
