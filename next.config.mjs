/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/', //home page of app.co-ventech.com
        destination: '/talent-login',
        permanent: true, // or false for temporary
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001', // Your backend port - change if different
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.co-ventech.com', // Your production API domain
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
