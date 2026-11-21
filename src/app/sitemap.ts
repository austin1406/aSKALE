import type { MetadataRoute } from "next";

import { site } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/services", "/pricing", "/process", "/about", "/faq", "/contact", "/privacy"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/contact" || path === "/pricing" ? 0.8 : 0.6,
  }));
}
