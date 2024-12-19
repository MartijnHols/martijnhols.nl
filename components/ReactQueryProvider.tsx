import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

interface Props {
  children: ReactNode
}

const ReactQueryProvider = ({ children }: Props) => {
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
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ReactQueryProvider
