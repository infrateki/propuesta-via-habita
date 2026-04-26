import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "@visx/hierarchy", "@react-three/drei"],
  },
};

export default nextConfig;
