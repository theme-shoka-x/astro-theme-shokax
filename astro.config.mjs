import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'

// https://github.com/hexojs/hexo-renderer-stylus/blob/master/lib/renderer.js
import cloudflare from '@astrojs/cloudflare'
import { config } from './src/config'

function getProperty(obj, name) {
  name = name.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '')
  const split = name.split('.')
  let key = split.shift()
  if (!Object.prototype.hasOwnProperty.call(obj, key))
    return ''
  let result = obj[key]
  const len = split.length
  if (!len) {
    if (result === 0)
      return result
    return result || ''
  }
  if (typeof result !== 'object')
    return ''
  for (let i = 0; i < len; i++) {
    key = split[i]
    if (!Object.prototype.hasOwnProperty.call(result, key))
      return ''
    result = result[split[i]]
    if (typeof result !== 'object')
      return result
  }
  return result
}
const define = {
  'astro-config': (data) => {
    return getProperty(config, data.val)
  },
}

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  output: 'static',
  integrations: [vue()],
  vite: {
    ssr: {
      external: ['node:fs'],
    },
    css: {
      preprocessorOptions: {
        stylus: {
          define,
        },
      },
    },
  }
})
