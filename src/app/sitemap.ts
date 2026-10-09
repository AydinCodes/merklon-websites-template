import type { MetadataRoute } from "next";
import { site } from "@/site";

// One idea, one page. Add an entry here for any page a site grows.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
