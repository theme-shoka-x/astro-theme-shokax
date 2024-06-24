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

interface WidgetsConfig {
  random_posts: boolean
  recent_comments: boolean
}

interface TwikooConfig {
  enable: boolean
  link: string
  mode: string
  envId: string
  region: string
}

interface WalineConfig {
  enable: boolean
  serverURL: string
  lang: string
  locale: any
  emoji: string[]
  meta: string[]
  requiredMeta: string[]
  wordLimit: number
  pageSize: number
  pageview: boolean
}

interface ExperimentsConfig {
  usingRelative: boolean
  mobileWidth: string
}

const config = yaml.load(fs.readFileSync('src/config.yml', 'utf8')) as {
  site: Partial<SiteConfig>
  footer: Partial<FooterConfig>
  algolia: AlgoliaSearchConfig
  loader: LoaderConfig
  visitor: VisitorConfig
  fireworks: FireworksConfig
  widgets: WidgetsConfig
  twikoo: TwikooConfig
  waline: WalineConfig
  experiments: ExperimentsConfig
  image_server?: string
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
export const widgets = config.widgets
export const twikoo = config.twikoo
export const waline = config.waline
export const experiments = config.experiments
export const image_server = config.image_server
