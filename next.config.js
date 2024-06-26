module.exports = {
  i18n: {
    locales: ["default", "en", "id"],
    defaultLocale: "default",
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.freepnglogos.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
  ],
  reactStrictMode: true,
};
