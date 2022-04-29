import { LinkProps, PrismicProvider } from "@prismicio/react";
import { AppProps } from "next/app";

import Link from "../components/Link";
import GlobalStyles from "../theme/GlobalStyles";
import prismicLinkResolver from "../utils/prismicLinkResolver";

const PrismicLink = ({ children, ...others }: LinkProps) => (
  <Link {...others}>{children}</Link>
);

const App = ({ Component, pageProps }: AppProps) => (
  <PrismicProvider
    linkResolver={prismicLinkResolver}
    internalLinkComponent={PrismicLink}
    externalLinkComponent={PrismicLink}
  >
    <GlobalStyles />
    <Component {...pageProps} />
  </PrismicProvider>
);

export default App;
