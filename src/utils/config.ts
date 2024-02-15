import fs from "node:fs";
import yaml from "js-yaml";

interface SiteConfig {
  title: string;
  description: string;
  url: string;
  lang: string;
  timezone: string;
  author: string;
  alternate: string;
  subtitle: string;
}

const config = yaml.load(fs.readFileSync("src/config.yml", "utf8")) as {
  site: Partial<SiteConfig>
}

export const BASE_URL = import.meta.env.BASE_URL.endsWith("/")
  ? ""
  : import.meta.env.BASE_URL;

export const site = config.site