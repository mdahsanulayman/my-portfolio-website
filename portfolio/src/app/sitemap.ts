import type { MetadataRoute } from "next";
import { personal } from "@/data/personal";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: personal.siteUrl, lastModified: new Date() }];
}
