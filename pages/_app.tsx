import { AppProps } from "next/app";
import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  DehydratedState,
} from "react-query";

import PrismicProvider from "../components/PrismicProvider";
import GlobalStyles from "../theme/GlobalStyles";

type MyAppProps = AppProps<{
  isPreview?: boolean;
  dehydratedState: DehydratedState;
}>;

const App = ({ Component, pageProps }: MyAppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // We're using a CMS, so we want data to be atomic so updating
            // subqueries shouldn't fetch newer data than its parent
            staleTime: Infinity,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <PrismicProvider isPreview={pageProps?.isPreview}>
          <GlobalStyles />
          <Component {...pageProps} />
        </PrismicProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
