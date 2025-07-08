import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'secure.notion-static.com', // Notionカバー画像（標準）
      's3.us-west-2.amazonaws.com', // Notion画像アップロード時
      'www.notion.so', // 念のため
      'notion.so',     // 念のため
    ],
  },
};

export default nextConfig;