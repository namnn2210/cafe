import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['placehold.co','img.vietqr.io','localhost','api-cafe.226pay.com','cafe.226pay.com'], // Allow 'placehold.co'
        dangerouslyAllowSVG: true, // Enable SVG support
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Add additional security
    },
    productionBrowserSourceMaps: true
};

export default nextConfig;
