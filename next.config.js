/* eslint-env node */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { getRepositoryName } = require('@prismicio/client')
const prismicConfig = require('./slicemachine.config.json')

const prismicRepositoryName = getRepositoryName(prismicConfig.apiEndpoint)
/**
 * All supported locales.
 * Prismic locale => user-facing locale
 */
const prismicLocaleMap = {
  'nl-nl': 'nl',
}

if (!process.env.NEXT_PUBLIC_PRIMARY_HOST) {
  throw new Error('Missing required env var: NEXT_PUBLIC_PRIMARY_HOST')
}
if (!process.env.NEXT_PUBLIC_DEFAULT_LOCALE) {
  throw new Error('Missing required env var: NEXT_PUBLIC_DEFAULT_LOCALE')
}
if (!process.env.PAGE_REVALIDATE_INTERVAL) {
  throw new Error('Missing required env var: PAGE_REVALIDATE_INTERVAL')
}

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
      },
      {
        protocol: 'https',
        hostname: `${prismicRepositoryName}.cdn.prismic.io`,
      },
      {
        protocol: 'https',
        hostname: 'prismic-io.s3.amazonaws.com',
      },
      // Used by Prismic Slice Machine mock data
      process.env.NODE_ENV === 'development'
        ? {
            protocol: 'https',
            hostname: 'images.unsplash.com',
          }
        : undefined,
    ].filter(Boolean),
  },
  redirects: async () => [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.martijnhols.nl' }],
      destination: 'https://martijnhols.nl/:path*',
      permanent: true,
    },
    {
      source: '/feed',
      destination: '/rss.xml',
      permanent: true,
    },
    {
      source: '/rss',
      destination: '/rss.xml',
      permanent: true,
    },
    {
      source: '/gists/the-security-implications-of-packages-in-frontend-apps',
      destination: '/gists/the-security-risks-of-front-end-dependencies',
      permanent: true,
    },
  ],
  rewrites: async () => [
    {
      source: '/hoi/script.js',
      destination:
        'https://plausible.io/js/script.tagged-events.outbound-links.js',
    },
    {
      source: '/hoi/event',
      destination: 'https://plausible.io/api/event',
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
      // Downloadable assets
      {
        test: /\.(ics|otf|ttf)/,
        type: 'asset/resource',
      },
    ]

    return config
  },
})

module.exports = nextConfig
