/* global process */

import makeBundleAnalyzer from '@next/bundle-analyzer'
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

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

const applyMdx = createMDX({
  options: {
    jsxImportSource: '@emotion/react',
    remarkPlugins: [remarkGfm],
  },
})

// There's a bug in Safari where upgrade-insecure-requests prevents localhost
// from working. See https://github.com/github/secure_headers/issues/348
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://www.startpage.com;
  frame-ancestors 'none';
  ${process.env.NODE_ENV === 'production' ? 'upgrade-insecure-requests;' : ''}
`
  .replace(/\n/g, '')
  .trim()

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: process.env.COMPRESS === 'false' ? false : true,
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
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
        'https://plausible.io/js/script.hash.outbound-links.tagged-events.js',
    },
    {
      source: '/hoi/event',
      destination: 'https://plausible.io/api/event',
    },
  ],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy#directives
            // Send referer as I will happily show people I linked to their site
            value: 'no-referrer-when-downgrade',
          },
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'Permissions-Policy',
            // Disallow everything but video features (fullscreen, PIP)
            value:
              'accelerometer=(), autoplay=(), camera=(), cross-origin-isolated=(), display-capture=(), encrypted-media=(), fullscreen=*, geolocation=(), gyroscope=(), microphone=(), midi=(), payment=(), picture-in-picture=*, publickey-credentials-get=(), screen-wake-lock=(), usb=(), xr-spatial-tracking=()',
          },
        ],
      },
    ]
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
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
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules = [
      ...config.module.rules,
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          // exclude if *.svg?url
          not: [...fileLoaderRule.resourceQuery.not, /url/],
        },
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
}

export default withBundleAnalyzer(applyMdx(nextConfig))
