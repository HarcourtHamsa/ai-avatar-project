/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["files2.heygen.ai", "resource2.heygen.ai"],
  },
  experimental: {
    esmExternals: true,
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
