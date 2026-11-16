import type { MetadataRoute } from "next";

import { site } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/contact", "/privacy"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.5,
  }));
}
