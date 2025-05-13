import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL,
    NEXT_PUBLIC_CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    NEXT_PUBLIC_UPLOAD_PRESET: process.env.UPLOAD_PRESET,
    NEXT_PUBLIC_LOCATIONIQ_API_KEY: process.env.LOCATIONIQ_API_KEY,
  },
  devIndicators: false,
  images: {
    domains: ['res.cloudinary.com'], 
  },
};

export default nextConfig;
