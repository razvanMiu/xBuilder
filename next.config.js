/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_EXTERNAL_API_PATH}/:path*`,
      },
      {
        source: '/:path*/edit',
        destination: '/edit',
      },
    ];
  },
  env: {
    _DEVELOPMENT_: process.env.NODE_ENV === 'development',
  },
};

module.exports = nextConfig;
