/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = {
//     async rewrites() {
//         return [
//           {
//             source: '/api/:path*',
//             destination: 'http://localhost:3000/:path',
//           },
//         ]
//       },
//   };

/** @type {import('next').NextConfig} */
// Change this back for deployment
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    compress: false,
  }
  
  module.exports = nextConfig