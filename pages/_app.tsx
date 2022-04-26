import { AppProps } from "next/app";

import GlobalStyles from "../theme/GlobalStyles";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyles />
    <Component {...pageProps} />
  </>
);

export default App;
