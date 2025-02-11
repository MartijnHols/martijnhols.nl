interface Window {
  plausible:
    | ((
        eventName: string,
        options?: {
          // Source: https://github.com/4lejandrito/next-plausible/blob/45e21a132b6078c2719f6b1d25de8e5ac932d460/lib/usePlausible.ts
          props?: Record<string, unknown>
          // https://plausible.io/docs/ecommerce-revenue-tracking
          revenue?: {
            currency: string
            amount: number
          }
          // https://plausible.io/docs/custom-locations,
          u?: string
          callback?: VoidFunction
        },
      ) => void)
    | undefined
}
