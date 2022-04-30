const { getRepositoryName } = require("@prismicio/client");

const prismicConfig = require("./sm.json");

const getEnvironmentVariable = (name) => {
  if (!process.env[name]) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return process.env[name];
};

const prismicRepositoryName = getRepositoryName(prismicConfig.apiEndpoint);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/homepage",
        },
      ],
    };
  },
  i18n: {
    locales: process.env.ACTIVE_LOCALES.split(","),
    defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  },
  serverRuntimeConfig: {
    pageRevalidateInterval:
      getEnvironmentVariable("PAGE_REVALIDATE_INTERVAL") === "false"
        ? undefined
        : Number(getEnvironmentVariable("PAGE_REVALIDATE_INTERVAL")),
  },
  publicRuntimeConfig: {
    primaryHost: process.env.PRIMARY_HOST,
    prismicRepositoryName,
  },
  images: {
    domains: [
      "images.prismic.io",
      `${prismicRepositoryName}.cdn.prismic.io`,
      // Used by Prismic Slice Machine mock data
      process.env.NODE_ENV === "development"
        ? "images.unsplash.com"
        : undefined,
    ].filter(Boolean),
    deviceSizes: [640, 750, 828, 1080, 1280, 1440, 1920, 2048, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules = [
      ...config.module.rules,
      // Import SVG components as react components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              typescript: true,
              dimensions: false,
            },
          },
        ],
      },
    ];

    return config;
  },
};

module.exports = nextConfig;
