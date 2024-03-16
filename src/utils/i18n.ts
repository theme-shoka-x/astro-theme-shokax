import fs from 'node:fs'
import Ctor from 'hexo-i18n'
import yaml from 'js-yaml'

import { site } from './config'

const language = site.lang?.toLowerCase() || 'en'

const i18n = new Ctor({
  languages: [language]
})

i18n.set(language, yaml.load(
  fs.readFileSync(`src/languages/${language}.yml`, 'utf8'),
) as Record<string, any>);

export const __ = i18n.__([language]);
export const _p = i18n._p([language]);
