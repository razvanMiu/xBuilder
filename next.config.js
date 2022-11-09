/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  experimental: {
    appDir: false,
    optimizeCss: process.env.NODE_ENV === 'production',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_EXTERNAL_API_PATH}/:path*`,
      },
      {
        source: '/:document*/edit',
        destination: '/edit',
      },
      {
        source: '/:document*',
        destination: '/',
      },
    ];
  },
  env: {
    _DEVELOPMENT_: process.env.NODE_ENV === 'development',
  },
};

module.exports = nextConfig;
