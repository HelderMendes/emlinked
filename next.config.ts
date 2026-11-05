import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'emlinked.nl' }],
        destination: 'https://emlinked.com/:path*',
        statusCode: 301,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.emlinked.nl' }],
        destination: 'https://emlinked.com/:path*',
        statusCode: 301,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.emlinked.com' }],
        destination: 'https://emlinked.com/:path*',
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
