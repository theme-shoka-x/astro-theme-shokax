import Ctor from 'hexo-i18n'

import { site } from './config'

const language = site.lang?.toLowerCase() || 'en'

const i18n = new Ctor({
  languages: [language],
})

i18n.set(language, await import(`../languages/${language}.json`) as Record<string, any>)

// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
export const languageData = i18n.data[language]

export const __ = i18n.__([language])
export const _p = i18n._p([language])
