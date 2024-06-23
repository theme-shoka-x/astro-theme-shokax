import fs from 'node:fs'
import yaml from 'js-yaml'
import type firework from 'mouse-firework'

interface SiteConfig {
  title: string
  description: string
  url: string
  lang: string
  timezone: string
  author: string
  alternate: string
  subtitle: string
}

interface FooterConfig {
  since: number
  icon: {
    color: string
    name: string
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

interface AlgoliaSearchConfig {
  enable: boolean
  indexName: string
  appId: string
  apiKey: string
}

interface LoaderConfig {
  start: boolean
  switch: boolean
}

interface VisitorConfig {
  clarity: string | boolean
  baiduAnalytics: string | boolean
  googleAnalytics: string | boolean
}

interface FireworksConfig {
  enable: boolean
  options: Parameters<typeof firework>[0]
}

const config = yaml.load(fs.readFileSync('src/config.yml', 'utf8')) as {
  site: Partial<SiteConfig>
  footer: Partial<FooterConfig>
  algolia: AlgoliaSearchConfig
  loader: LoaderConfig
  visitor: VisitorConfig
  fireworks: FireworksConfig
}

export const BASE_URL = import.meta.env.BASE_URL.endsWith('/')
  ? ''
  : import.meta.env.BASE_URL

export const site = config.site
export const footer = config.footer
export const algolia = config.algolia
export const loader = config.loader
export const visitor = config.visitor
export const fireworks = config.fireworks
