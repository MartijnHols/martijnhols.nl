declare namespace NodeJS {
  interface ProcessEnv {
    // If you add non-optional props, make sure they're present with a check in
    // next.config.js! This file is always executed.
    NODE_ENV: 'development' | 'production'
    DEFAULT_LOCALE: 'nl' | 'en'
    PAGE_REVALIDATE_INTERVAL: 'false' | `${number}`
    PRISMIC_REPOSITORY_NAME: string
    NEXT_PUBLIC_PRIMARY_HOST: string
    NEXT_PUBLIC_SITE_NAME_FALLBACK: string
  }
}
