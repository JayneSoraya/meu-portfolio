/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: [
            'framer-motion',
            'lucide-react',
            'date-fns',
            '@radix-ui/react-icons',
        ],
    },
};

export default nextConfig;
