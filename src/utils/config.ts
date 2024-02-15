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

interface FooterConfig {
  since: number;
  icon: {
    name: string;
  }
  count: boolean
  powered: boolean
  icp: {
    enable: boolean
    beian: string
    recordCode: number
    icpnumber: string
    icon: string
  }
}

interface BasicConfig {
  statics: string;
  assets: string;
  js: string;
  css: string;
}


const config = yaml.load(fs.readFileSync("src/config.yml", "utf8")) as {
  site: Partial<SiteConfig>
  footer: Partial<FooterConfig>
  basic: BasicConfig
}

export const BASE_URL = import.meta.env.BASE_URL.endsWith("/")
  ? ""
  : import.meta.env.BASE_URL;

export const site = config.site
export const footer = config.footer
export const basic = config.basic
