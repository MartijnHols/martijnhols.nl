const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { getRepositoryName } = require('@prismicio/client')

const prismicConfig = require('./sm.json')

const prismicRepositoryName = getRepositoryName(prismicConfig.apiEndpoint)
/**
 * All supported locales.
 * Prismic locale => user-facing locale
 */
const prismicLocaleMap = {
  'nl-nl': 'nl',
  'en-us': 'en',
}

if (!process.env.NEXT_PUBLIC_PRIMARY_HOST) {
  throw new Error('Missing required env var: NEXT_PUBLIC_PRIMARY_HOST')
}
if (!process.env.DEFAULT_LOCALE) {
  throw new Error('Missing required env var: DEFAULT_LOCALE')
}
if (!process.env.PAGE_REVALIDATE_INTERVAL) {
  throw new Error('Missing required env var: PAGE_REVALIDATE_INTERVAL')
}

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  i18n: {
    locales: Object.keys(prismicLocaleMap).map(
      (locale) => prismicLocaleMap[locale] || locale,
    ),
    defaultLocale: process.env.DEFAULT_LOCALE,
  },
  // Values that can not be different between builds. Most values apply, as most
  // values affect the generated pages in one way or another. e.g. the default
  // locale affects the generated URLs.
  env: {
    PRISMIC_REPOSITORY_NAME: prismicRepositoryName,
  },
  // Values that can be different per instance of the server
  serverRuntimeConfig: {
    pageRevalidateInterval:
      process.env.PAGE_REVALIDATE_INTERVAL === 'false'
        ? undefined
        : Number(process.env.PAGE_REVALIDATE_INTERVAL),
  },
  publicRuntimeConfig: {
    prismicLocaleMap,
  },
  images: {
    domains: [
      'images.prismic.io',
      `${prismicRepositoryName}.cdn.prismic.io`,
      'prismic-io.s3.amazonaws.com',
      // Used by Prismic Slice Machine mock data
      process.env.NODE_ENV === 'development'
        ? 'images.unsplash.com'
        : undefined,
    ].filter(Boolean),
    deviceSizes: [640, 750, 828, 1080, 1280, 1440, 1920, 2048, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  redirects: async () => [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.martijnhols.nl' }],
      destination: 'https://martijnhols.nl/:path*',
      permanent: true,
    },
  ],
  webpack: (config) => {
    config.module.rules = [
      ...config.module.rules,
      // Import SVG components as react components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              dimensions: false,
            },
          },
        ],
      },
    ]

    return config
  },
})

module.exports = nextConfig
