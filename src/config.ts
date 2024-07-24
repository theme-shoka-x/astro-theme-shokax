import type { AlgoliaSearchConfig, ExperimentsConfig, FireworksConfig, FooterConfig, LoaderConfig, MenuConfig, SiteConfig, TwikooConfig, VisitorConfig, WalineConfig, WidgetsConfig } from '@utils/config'

interface ConfigFile {
  site: SiteConfig
  footer: FooterConfig
  algolia: AlgoliaSearchConfig
  loader: LoaderConfig
  visitor: VisitorConfig
  fireworks: FireworksConfig
  widgets: WidgetsConfig
  twikoo: TwikooConfig
  waline: WalineConfig
  experiments: ExperimentsConfig
  image_server?: string
  menu: MenuConfig
}

/* CONFIG / 配置 */
export const config: ConfigFile = {
  site: {
    title: '',
    subtitle: '',
    description: '',
    author: '',
    timezone: '',
    url: '',
    lang: 'en',
    alternate: 'testName',
  },
  widgets: {
    random_posts: true,
    recent_comments: true,
  },
  menu: {
    home: '/ || home',
    about: {
      default: '/ || user',
      aboutsite: '/about/  || user',
      admiration: '/admiration/ || coffee',
    },
    posts: {
      default: '/ || feather',
      archives: '/archives/ || list-alt',
      categories: '/categories/ || th',
      tags: '/tags/ || tags',
    },
    friends: '/friends/ || heart',
  },
  footer: {
    since: 2022,
    icon: {
      name: 'sakura rotate',
      color: '#ffc0cb',
    },
    count: true,
    powered: true,
    icp: {
      enable: false,
      icon: '',
      icpnumber: 'xxx',
      beian: 'xxx',
      recordCode: 12345678,
    },
  },
  loader: {
    start: true,
    switch: false,
  },
  algolia: {
    enable: false,
    indexName: '',
    appId: '',
    apiKey: '',
  },
  experiments: {
    usingRelative: false,
    mobileWidth: '820px',
  },
  twikoo: {
    enable: false,
    link: 'https://cdn.staticfile.org/twikoo/1.6.30/twikoo.all.min.js',
    mode: 'vercel',
    envId: 'https://example.com',
    region: '',
  },
  waline: {
    enable: false,
    serverURL: '',
    lang: 'zh-CN',
    locale: {},
    emoji: [
      'https://unpkg.com/@waline/emojis@1.0.1/weibo',
      'https://unpkg.com/@waline/emojis@1.0.1/alus',
      'https://unpkg.com/@waline/emojis@1.0.1/bilibili',
      'https://unpkg.com/@waline/emojis@1.0.1/qq',
      'https://unpkg.com/@waline/emojis@1.0.1/tieba',
      'https://unpkg.com/@waline/emojis@1.0.1/tw-emoji',
    ],
    meta: [
      'nick',
      'mail',
      'link',
    ],
    requiredMeta: [
      'nick',
      'mail',
    ],
    wordLimit: 0,
    pageSize: 10,
    pageview: false,
  },
  // iconfont: '4415496_59g1326wajd',
  visitor: {
    clarity: false,
    baiduAnalytics: false,
    googleAnalytics: false,
  },
  fireworks: {
    enable: true,
    options: {
      excludeElements: [
        'a',
      ],
      particles: [
        {
          shape: 'circle',
          move: [
            'emit',
          ],
          easing: 'easeOutExpo',
          colors: [
            'rgba(255,182,185,.9)',
            'rgba(250,227,217,.9)',
            'rgba(187,222,214,.9)',
            'rgba(138,198,209,.9)',
          ],
          number: 30,
          duration: [
            1200,
            1800,
          ],
          shapeOptions: {
            radius: [
              16,
              32,
            ],
          },
        },
        {
          shape: 'circle',
          move: [
            'diffuse',
          ],
          easing: 'easeOutExpo',
          colors: [
            '#fff',
          ],
          number: 1,
          duration: [
            1200,
            1800,
          ],
          shapeOptions: {
            radius: 20,
            alpha: 0.5,
            lineWidth: 6,
          },
        },
      ],
    },
  },
  image_server: '',
}
