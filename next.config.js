/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: false,
    env: {
        ENV: "production",
        // test: "test",
    }
};

module.exports = nextConfig;
