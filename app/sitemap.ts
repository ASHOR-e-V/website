import type { MetadataRoute } from "next";

// Required by `output: export` — these are emitted as static files.
export const dynamic = "force-static";

const BASE_URL = "https://website-7yd.pages.dev";

const routes = [
  { path: "", priority: 1.0, changeFrequency: "monthly" as const },
  { path: "/events", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/projects", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/vorstand", priority: 0.8, changeFrequency: "yearly" as const },
  { path: "/mitmachen", priority: 0.9, changeFrequency: "yearly" as const },
  { path: "/spenden", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/satzung", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/impressum", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/datenschutz", priority: 0.2, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
