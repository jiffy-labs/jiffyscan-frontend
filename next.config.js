/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: false,
    env: {
        ENV: "development",
    }
};

module.exports = nextConfig;
