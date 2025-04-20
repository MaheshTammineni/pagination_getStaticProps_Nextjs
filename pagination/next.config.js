/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL('https://dummyjson.com/icon/**')],
    }
}

module.exports = nextConfig
