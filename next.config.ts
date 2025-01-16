import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['placehold.co'], // Allow 'placehold.co'
        dangerouslyAllowSVG: true, // Enable SVG support
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Add additional security
    },
};

export default nextConfig;
