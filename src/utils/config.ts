import type firework from 'mouse-firework'
import { config } from '../config'

export interface SiteConfig {
  title: string
  description: string
  url: string
  lang: string
  timezone: string
  author: string
  alternate: string
  subtitle: string
}

export interface FooterConfig {
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

export interface AlgoliaSearchConfig {
  enable: boolean
  indexName: string
  appId: string
  apiKey: string
}

export interface LoaderConfig {
  start: boolean
  switch: boolean
}

export interface VisitorConfig {
  clarity: string | boolean
  baiduAnalytics: string | boolean
  googleAnalytics: string | boolean
}

export interface FireworksConfig {
  enable: boolean
  options: Parameters<typeof firework>[0]
}

export interface WidgetsConfig {
  random_posts: boolean
  recent_comments: boolean
}

export interface TwikooConfig {
  enable: boolean
  link: string
  mode: string
  envId: string
  region: string
}

export interface WalineConfig {
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

export interface ExperimentsConfig {
  usingRelative: boolean
  mobileWidth: string
}

export interface menuItem {
  [key: string]: string
}

export interface MenuConfig {
  [key: string]: string | menuItem
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
export const menu = config.menu
