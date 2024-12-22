/* eslint-env node */
import makeBundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = makeBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

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
  // Values that can be different per instance of the server
  serverRuntimeConfig: {
    pageRevalidateInterval:
      process.env.PAGE_REVALIDATE_INTERVAL === 'false'
        ? undefined
        : Number(process.env.PAGE_REVALIDATE_INTERVAL),
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
      destination: '/blog/the-security-risks-of-front-end-dependencies',
      permanent: true,
    },
    {
      source: '/gists/:slug*',
      destination: '/blog/:slug*',
      permanent: true,
    },
    {
      source: '/card',
      destination: '/Martijn Hols.vcf',
      permanent: false,
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
  webpack: (config, { isServer }) => {
    // Top-level await
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    if (!isServer) {
      config.output.environment = {
        ...config.output.environment,
        asyncFunction: true,
      }
    }

    // SVGR - Import SVG components as react components
    config.module.rules = [
      ...config.module.rules,
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

    // Downloadable files
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(ics|otf|ttf)/,
        type: 'asset/resource',
      },
    ]

    return config
  },
})

export default nextConfig
