// @ts-check
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        // search: "?v=",
      },
    ],
  },
};

module.exports = nextConfig;
