import type { MetadataRoute } from "next";

// Required by `output: export` — these are emitted as static files.
export const dynamic = "force-static";

const BASE_URL = "https://website-7yd.pages.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The members area is behind a login and has nothing to index.
        disallow: "/members",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
