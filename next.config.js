const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { getRepositoryName } = require('@prismicio/client')

const prismicConfig = require('./sm.json')

const getEnvironmentVariable = (name) => {
  if (!process.env[name]) {
    throw new Error(`Missing environment variable: ${name}`)
  }
  return process.env[name]
}

const prismicRepositoryName = getRepositoryName(prismicConfig.apiEndpoint)
/**
 * All supported locales.
 * Prismic locale => user-facing locale
 */
const prismicLocaleMap = {
  'nl-nl': 'nl',
  'en-us': 'en',
}
/** The default locale is special, as it's omited from the URL. */
const defaultUserLocale = 'nl'

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  i18n: {
    locales: Object.keys(prismicLocaleMap).map(
      (locale) => prismicLocaleMap[locale] || locale,
    ),
    defaultLocale: defaultUserLocale,
  },
  serverRuntimeConfig: {
    pageRevalidateInterval:
      getEnvironmentVariable('PAGE_REVALIDATE_INTERVAL') === 'false'
        ? undefined
        : Number(getEnvironmentVariable('PAGE_REVALIDATE_INTERVAL')),
  },
  publicRuntimeConfig: {
    primaryHost: process.env.PRIMARY_HOST,
    prismicRepositoryName,
    prismicLocaleMap,
    defaultUserLocale,
  },
  images: {
    domains: [
      'images.prismic.io',
      `${prismicRepositoryName}.cdn.prismic.io`,
      // Used by Prismic Slice Machine mock data
      process.env.NODE_ENV === 'development'
        ? 'images.unsplash.com'
        : undefined,
    ].filter(Boolean),
    deviceSizes: [640, 750, 828, 1080, 1280, 1440, 1920, 2048, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
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
