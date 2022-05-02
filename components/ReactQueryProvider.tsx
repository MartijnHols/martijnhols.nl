import { ReactNode, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  DehydratedState,
} from "react-query";

interface Props {
  dehydratedState: DehydratedState;
  children: ReactNode;
}

const ReactQueryProvider = ({ dehydratedState, children }: Props) => {
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
      <Hydrate state={dehydratedState}>{children}</Hydrate>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
