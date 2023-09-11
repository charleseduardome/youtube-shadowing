/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
    env: {
      SPEECHLY_APP_ID: process.env.SPEECHLY_APP_ID
    }
  }
  
  module.exports = nextConfig
  