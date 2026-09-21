import createNextIntlPlugin from "next-intl/plugin";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  env: {
    ERXES_APP_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6InpULXNjYlhEbGhfbmV0d1ZRdjMwWCIsImlhdCI6MTc4Mjk2NDg2OH0.NHW9faZ_S3ZNZobMA9NSLN9yKUfs9m7cvC8cxI7F74c",
    GRAPHQL_URL: "https://artifynew.next.erxes.io/gateway/graphql",
    NEXT_PUBLIC_ERXES_APP_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6InpULXNjYlhEbGhfbmV0d1ZRdjMwWCIsImlhdCI6MTc4Mjk2NDg2OH0.NHW9faZ_S3ZNZobMA9NSLN9yKUfs9m7cvC8cxI7F74c",
    NEXT_PUBLIC_ERXES_ENDPOINT:
      "https://artifynew.next.erxes.io/gateway/graphql",
    NEXT_PUBLIC_GRAPHQL_URL: "https://artifynew.next.erxes.io/gateway/graphql",
    NEXT_PUBLIC_ERXES_ASSET_ORIGIN: "https://artifynew.next.erxes.io",
    ERXES_CLIENT_PORTAL_ID: "zT-scbXDlh_netwVQv30X",
  },
  images: {
    // Approved media hosts only (see docs/erxes-integration/contract.json):
    // - images.unsplash.com: referenced presentation/project imagery
    // - tenant origin: erxes-hosted CMS uploads (/read-file?key=...)
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      {
        protocol: "https",
        hostname: "artifynew.next.erxes.io",
        pathname: "**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
