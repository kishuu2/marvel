/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'i.annihil.us',
        pathname: '/u/prod/marvel/**',
      },
      {
        protocol: 'https',
        hostname: 'i.annihil.us',
        pathname: '/u/prod/marvel/**',
      },
    ],
  },
};

module.exports = nextConfig;