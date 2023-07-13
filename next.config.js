/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: false,
    env: {
        ENV: "development",
        // test: "test",
    }
};

module.exports = nextConfig;
