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
};

export default nextConfig;
