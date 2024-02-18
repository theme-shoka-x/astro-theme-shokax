import fs from 'node:fs'
import yaml from 'js-yaml'

import { site } from './config'

const language = site.lang?.toLowerCase() || 'en'

let i18n: Record<string, any> = {}

i18n = yaml.load(
  fs.readFileSync(`src/languages/${language}.yml`, 'utf8'),
) as Record<string, any>

export function __(key: string): string {
  const keys = key.split('.')
  let result = i18n
  for (const k of keys)
    result = result[k]

  return result as unknown as string || key
}

export function _p(key: string, params: string | number): string {
  const keys = key.split('.')
  let result = i18n
  for (const k of keys)
    result = result[k]

  if (typeof params === 'number' || !Number.isNaN(Number.parseInt(params))) {
    if (params === 1)
      return result?.one?.replace('%d', params) || key
    else
      return result?.other?.replace('%d', params) || key
  }
  else {
    return result?.replace('%s', params) || key
  }
}
