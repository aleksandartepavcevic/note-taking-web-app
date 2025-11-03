import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    async redirects() {
        return [
            {
                source: '/settings',
                destination: '/settings/color-theme',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
