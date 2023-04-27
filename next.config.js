/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  webpack(config) {
    config.infrastructureLogging = { debug: /PackFileCache/ }
    return config
  },
}

module.exports = nextConfig

// module.exports = {
//   webpack(config) {
//     config.infrastructureLogging = { debug: /PackFileCache/ }
//     return config
//   },
// }
