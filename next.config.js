const { getRepositoryName } = require("@prismicio/client");

const prismicConfig = require("./sm.json");

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
    locales: ["nl-nl"],
    defaultLocale: "nl-nl",
  },
  images: {
    domains: [
      "images.prismic.io",
      `${getRepositoryName(prismicConfig.apiEndpoint)}.cdn.prismic.io`,
    ],
    deviceSizes: [640, 750, 828, 1080, 1280, 1440, 1920, 2048, 2560, 3840],
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
