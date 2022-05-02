import { Client as PrismicClient } from "@prismicio/client";
import { Slice } from "@prismicio/types";
import { FunctionComponent } from "react";
import { QueryClient } from "react-query";

export interface PrefetchContext {
  prismicClient: PrismicClient;
  queryClient: QueryClient;
  locale: string;
}

type PrefetchableSliceComponent = FunctionComponent<any> & {
  prefetch?: (context: PrefetchContext) => Promise<void>;
};

/**
 * We need to prefetch data needed by slices. We need to do this in
 * `getStaticProps` in order for this data to be present during SSG. We use
 * react-query to achieve this relatively cleanly.
 * Each slice component can have an optional `prefetch` prop that preloads
 * the data as required by that component. The component itself can use a
 * normal (react-query) hook to load data. This way it works both when
 * prehydrated as well as lazily.
 */
const prefetchSliceSubQueries = async ({
  prismicClient,
  locale,
  queryClient,
  slices,
  components,
}: {
  prismicClient: PrismicClient;
  locale: string;
  queryClient: QueryClient;
  slices: Slice[];
  components: Record<string, PrefetchableSliceComponent>;
}) => {
  const prefetchContext: PrefetchContext = {
    prismicClient,
    queryClient,
    locale,
  };
  // We don't need to store any return data as it's put in the QueryClient's
  // cache.
  await Promise.all(
    slices
      .map((slice) => components[slice.slice_type])
      .filter((component) => "prefetch" in component)
      .map((component) => component.prefetch!(prefetchContext))
  );
};

export default prefetchSliceSubQueries;
